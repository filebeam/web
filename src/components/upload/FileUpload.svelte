<script lang="ts">
    import { getExtension } from "$lib/getExtension";
    import { getFileType } from "$lib/fileTypes";
    import { file } from "$lib/fileState.svelte";
    import { filesize } from "filesize";

    import FilePreview from "$components/upload/FilePreview.svelte";

    import IconDefaultFile from "~icons/tabler/file";
    import IconDrop from "~icons/tabler/drag-drop";
    import { alert } from "$lib/dialog.svelte";

    let fileInput: HTMLInputElement | undefined = $state();
    let dropZone: HTMLButtonElement | undefined = $state();
    let dragover: boolean = $state(false);

    let { disabled = false }: { disabled?: boolean } = $props();

    const multipleFilesWarning = () => {
        alert("WarningMultipleFiles", {
            title: "No se permiten multiples archivos",
            description: `La subida de multiples archivos a la vez no esta
            permitida, se seleccionara solo el primer archivo`,
        });
    };

    function handleFile(userFile: File) {
        if (!fileInput) return;
        fileInput.value = "";

        if (
            file.object &&
            file.object.name === userFile.name &&
            file.object.size === userFile.size &&
            file.object.lastModified === userFile.lastModified
        ) {
            return;
        }

        file.object = userFile;

        if (file.preview.src && file.preview.valid)
            URL.revokeObjectURL(file.preview.src);

        file.preview.src = undefined;
        file.preview.valid = false;
        file.upload.uploaded = false;

        const ext = getExtension(file.object.name);
        file.type = ext ? getFileType(ext) : undefined;

        file.info =
            `${file.type ? file.type.name : "Archivo"}, ` +
            filesize(file.object.size) +
            (ext ? ` (${ext})` : "");

        if (file.type) file.icon = file.type.icon;
        else file.icon = IconDefaultFile;
    }

    function handleDrop(e: DragEvent) {
        e.preventDefault();
        dragover = false;
        if (e.dataTransfer) {
            if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
                if (e.dataTransfer.items.length > 1) {
                    multipleFilesWarning();
                }

                const item = e.dataTransfer.items[0];
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    if (file) {
                        handleFile(file);
                        return;
                    }
                }
            }
        }
    }

    function handleDrag(e: DragEvent) {
        e.preventDefault();
        if (e.type === "dragover") dragover = true;
        else dragover = false;
    }

    function handlePaste(e: ClipboardEvent) {
        if (!file.upload.uploading) {
            const data = e.clipboardData;
            if (!data) return;

            if (data.files.length > 1) {
                multipleFilesWarning();
            }

            const file = data.files[0];
            if (file) {
                handleFile(file);
            }
        }
    }

    function updateFile() {
        if (fileInput && fileInput.files) {
            const selectedFile = fileInput.files[0];
            if (!selectedFile) return;
            handleFile(selectedFile);
        }
    }
</script>

<svelte:window onpaste={e => handlePaste(e)} />

<input
    {disabled}
    type="file"
    class="hidden"
    onchange={() => updateFile()}
    bind:this={fileInput} />

<button
    {disabled}
    class:dragover
    class="
      relative flex h-72 max-h-[50vh] w-[48rem] max-w-[90%] flex-col
      items-center justify-center gap-4 overflow-hidden rounded-2xl border-2
      border-white-800 bg-white-300 px-8 py-28 text-center transition-all
      duration-200
      active:scale-95
      dark:border-black-200 dark:bg-black-400
      disabled:pointer-events-none disabled:brightness-90
      hover:bg-white-500 hover:dark:bg-black-300
    "
    ondrop={e => handleDrop(e)}
    ondragover={e => handleDrag(e)}
    ondragleave={e => handleDrag(e)}
    onclick={() => fileInput?.click()}
    bind:this={dropZone}>
    <FilePreview />
    <div class="flex flex-col items-center text-center">
        <p class="line-clamp-1 break-all text-xl">
            {file.object && file.object.name
                ? file.object.name
                : "Selecciona o arrastra un archivo"}
        </p>
        <p class="opacity-60">
            {#if file.preview.valid}
                <file.icon class="inline" />
            {/if}
            {file.object ? file.info : "Ningún archivo seleccionado"}
        </p>
    </div>
    <div
        class:opacity-0={!dragover}
        class="
          pointer-events-none absolute flex size-full flex-col items-center
          justify-center gap-4 bg-white-700/60 px-8 text-center text-black/80
          backdrop-blur-md transition-all duration-200
          dark:bg-black/80 dark:text-white/80
        ">
        <IconDrop class="size-14" />
        <span class="text-lg"> Suelta un archivo aquí para seleccionarlo</span>
    </div>
</button>
