<script lang="ts">
    import { parseBlob, selectCover } from "music-metadata";
    import { file } from "$lib/fileState.svelte";

    import IconPlay from "~icons/tabler/player-play-filled";
    import IconUpload from "~icons/tabler/cloud-upload";

    let img: HTMLImageElement | undefined = $state();

    $effect(() => {
        if (file.object && file.type) {
            switch (file.type.key) {
                case "img":
                    file.preview.src = URL.createObjectURL(file.object);
                    file.preview.valid = true;
                    break;

                case "audio":
                    parseBlob(file.object).then(metadata => {
                        const cover = selectCover(metadata.common.picture);
                        if (!cover) return;

                        const blob = new Blob([cover.data]);
                        file.preview.src = URL.createObjectURL(blob);
                        file.preview.valid = true;
                    });
                    break;

                case "video":
                    (async () => {
                        if (!file.object) return;

                        const video = document.createElement("video");
                        video.src = URL.createObjectURL(file.object);
                        video.muted = true;

                        video.onloadedmetadata = () => {
                            video.currentTime = video.duration / 2;
                        };

                        video.onseeked = () => {
                            const canvas = document.createElement("canvas");
                            canvas.height = video.videoHeight;
                            canvas.width = video.videoWidth;

                            const ctx = canvas.getContext("2d");
                            if (ctx) {
                                ctx.drawImage(
                                    video,
                                    0,
                                    0,
                                    canvas.width,
                                    canvas.height,
                                );

                                file.preview.src =
                                    canvas.toDataURL("image/png");
                                file.preview.valid = true;
                            }
                        };
                    })();
                    break;
            }
        }
    });

    $effect(() => {
        if (img) {
            img.onerror = () => {
                file.preview.valid = false;
            };
        }
    });
</script>

{#if file.object}
    {#if file.preview.valid}
        <div
            class="
              relative max-w-[70%] shrink-0 overflow-hidden rounded-xl
              sm:max-w-[50%]
            ">
            <img
                class="h-28 w-auto"
                src={file.preview.src}
                alt="Vista previa de {file.object.name}"
                bind:this={img} />
            {#if file.type?.key === "video"}
                <div
                    class="
                      absolute left-1/2 top-1/2 flex size-full -translate-x-1/2
                      -translate-y-1/2 transform items-center justify-center
                      bg-black/60
                    ">
                    <IconPlay class="size-12 text-white/80" />
                </div>
            {/if}
        </div>
    {:else}
        <file.icon class="size-16 shrink-0 opacity-80" />
    {/if}
{:else}
    <IconUpload class="size-16 shrink-0 opacity-80" />
{/if}
