export function getExtension(filename: string): string | undefined {
    if (filename) {
        const dotIndex = filename.lastIndexOf(".");
        if (dotIndex === -1) return undefined;

        let ext = filename.slice(dotIndex + 1);
        ext = ext.split(" ")[0].toLowerCase();

        if (ext) return ext;
    }

    return undefined;
}
