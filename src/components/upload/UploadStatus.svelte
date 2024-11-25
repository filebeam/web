<script lang="ts">
    import { WEB_BASE_URL_API } from "$env/static/public";

    import { expire, file } from "$lib/fileState.svelte";
    import { request } from "$lib/uploadFile.svelte";
    import { onMount } from "svelte";

    import { expoOut } from "svelte/easing";
    import { tweened } from "svelte/motion";

    import ProgressBar from "$components/ProgressBar.svelte";

    import IconClock from "~icons/tabler/clock";
    import IconLink from "~icons/tabler/link";

    let countingFiles = $state(true);
    let totalFiles = tweened(0, {
        duration: 1500,
        easing: expoOut,
    });

    onMount(() => {
        fetch(`${WEB_BASE_URL_API}/totalFiles`)
            .then(async res => {
                if (res.ok) {
                    const files = Number(await res.text());
                    if (Number.isNaN(files)) return;
                    totalFiles.set(files);
                }
            })
            .finally(() => (countingFiles = false));
    });

    /** Parse seconds into MM:SS */
    function formatTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

        return `${formattedMinutes}:${formattedSeconds}`;
    }
</script>

<div class="flex flex-col items-center gap-2 text-center">
    {#if file.upload.uploading}
        <p class="opacity-60">
            Subiendo archivo
            {#if file.upload.progress > 0}
                <strong>
                    {file.upload.progress}%
                </strong>
            {/if}
        </p>
    {:else if file.upload.url}
        <p class="flex flex-col items-center">
            <span class="opacity-60"> Archivo subido correctamente </span>
            <a
                target="_blank"
                href={file.upload.url}
                class="
                  space-x-1.5 font-bold
                  hover:no-underline
                ">
                <IconLink class="inline" />
                {file.upload.url}
            </a>
            {#if file.upload.expire && file.upload.expire.state !== "0"}
                <span class="text-sm opacity-60">
                    <IconClock class="inline" />
                    expira en {file.upload.expire.list.find(
                        item => item.value === file.upload.expire!.state,
                    )?.label}
                </span>
            {/if}
        </p>
    {:else}
        <p class="opacity-60">
            Puedes subir archivos de hasta
            <strong>
                {expire.state === "0" ? "200 MB" : "1 GB"}
            </strong>
            <br />
            {#if countingFiles}
                <span class="animate-pulse"> Contando archivos... </span>
            {:else if $totalFiles > 0}
                <span>
                    ¡<strong> {$totalFiles.toFixed(0)} archivos </strong>
                    subidos hasta ahora!
                </span>
            {:else}
                <span>¡Algo ha salido mal...!</span>
            {/if}
        </p>
    {/if}
    {#if file.upload.uploading}
        <ProgressBar value={file.upload.progress} />
        <div class="flex flex-row flex-wrap justify-center gap-x-2 text-sm">
            <p class="opacity-60">
                {#if file.upload.mbps && file.upload.eta}
                    {file.upload.mbps.toFixed(2)} MB/s, tiempo restante:
                    {formatTime(file.upload.eta)}
                {/if}
            </p>
            <button
                class="
                  text-red-500
                  dark:text-red dark:hover:text-red-300
                  hover:text-red-600
                "
                onclick={() => request?.abort()}>
                cancelar subida
            </button>
        </div>
    {/if}
</div>
