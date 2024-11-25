<script lang="ts">
    import type { Announcement } from "$lib/types/announcement";

    import { WEB_BASE_URL_API, WEB_PUBLIC_INSTANCE } from "$env/static/public";
    import { onMount } from "svelte";

    import { expire, file } from "$lib/fileState.svelte";
    import { uploadFile } from "$lib/uploadFile.svelte";

    import UploadStatus from "$components/upload/UploadStatus.svelte";
    import Upload from "$components/upload/FileUpload.svelte";
    import Spinner from "$components/Spinner.svelte";
    import Select from "$components/Select.svelte";
    import Button from "$components/Button.svelte";

    import IconArrowUp from "~icons/tabler/arrow-up";

    let loadingAnnouncements = $state(true);
    let latestAnnouncement: Announcement | undefined = $state();

    onMount(() => {
        if (WEB_PUBLIC_INSTANCE === "true") {
            fetch(`${WEB_BASE_URL_API}/anuncios`)
                .then(async res => {
                    if (res.ok) {
                        const data: Announcement[] = await res.json();
                        latestAnnouncement = data[0];
                    } else loadingAnnouncements = false;
                })
                .finally(() => (loadingAnnouncements = false));
        }
    });
</script>

<svelte:head>
    {#if file.upload.progress > 0}
        <title>Filebeam ~ {file.upload.progress}%</title>
    {:else}
        <title>Filebeam</title>
    {/if}
</svelte:head>

<div class="flex flex-grow flex-col gap-6">
    <main class="flex flex-grow flex-col items-center justify-center gap-4">
        <Upload />

        <p
            class="
              line-clamp-1 w-full max-w-2xl truncate px-8 text-center
              text-black/60
              dark:text-white/60
            ">
            {#if loadingAnnouncements}
                Ultima actualización:
                <span class="animate-pulse"> Cargando... </span>
            {:else if latestAnnouncement}
                Ultima actualización:
                <a href="/announcements">
                    {latestAnnouncement.title}
                </a>
            {:else}
                No se pudo cargar el ultimo anuncio
            {/if}
        </p>

        <div class="flex flex-row items-center gap-4">
            <Button
                icon={IconArrowUp}
                disabled={file.upload.uploading ||
                    file.upload.uploaded ||
                    !file.object}
                onclick={() => uploadFile()}>
                Subir
            </Button>
            <Select
                bind:value={expire.state}
                disabled={file.upload.uploading}
                items={expire.list} />
            {#if file.upload.uploading}
                <Spinner class="size-5" />
            {/if}
        </div>

        <div class="w-full max-w-md px-8">
            <UploadStatus />
        </div>
    </main>

    {#if WEB_PUBLIC_INSTANCE === "true"}
        <p
            class="
              m-auto w-full max-w-2xl px-8 text-center text-black/60
              dark:text-white/60
            ">
            Al hacer uso de Filebeam, aceptas los
            <wbr />
            <a href="/terms">Terminos de uso</a> y la
            <a href="/privacy">Politica de privacidad</a>.
        </p>
    {/if}
</div>
