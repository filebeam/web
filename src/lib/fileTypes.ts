import type { IconComponent } from "$lib/types/icon";

import IconImage from "~icons/tabler/photo";
import IconAudio from "~icons/tabler/music";
import IconVideo from "~icons/tabler/video";
import IconArchive from "~icons/tabler/archive";
import IconCode from "~icons/tabler/code";
import IconText from "~icons/tabler/file-text";
import IconFont from "~icons/tabler/text-size";
import IconExecutable from "~icons/tabler/app-window";
import IconSettings from "~icons/tabler/settings";

export interface FileType {
    key: string;
    name: string;
    icon: IconComponent;
    extensions: string[];
}

export function getFileType(ext: string): FileType | undefined {
    const fileType = types.find(type =>
        type.extensions.includes(ext.toLowerCase()),
    );

    return fileType;
}

const types: FileType[] = [
    {
        key: "img",
        name: "Imagen",
        icon: IconImage,
        extensions: [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "bmp",
            "svg",
            "ico",
            "webp",
            "tiff",
        ],
    },
    {
        key: "audio",
        name: "Audio",
        icon: IconAudio,
        extensions: ["mp3", "wav", "m4a", "flac", "aac", "ogg", "opus"],
    },
    {
        key: "video",
        name: "Video",
        icon: IconVideo,
        extensions: ["mp4", "mov", "avi", "mkv", "wmv", "flv"],
    },
    {
        key: "archive",
        name: "Archivo Comprimido",
        icon: IconArchive,
        extensions: ["zip", "rar", "7z", "tar.gz", "iso", "torrent"],
    },
    {
        key: "code",
        name: "Código Fuente",
        icon: IconCode,
        extensions: [
            "html",
            "htm",
            "css",
            "js",
            "json",
            "py",
            "cpp",
            "c",
            "php",
            "ts",
            "java",
            "lua",
            "cs",
            "kt",
            "rs",
            "tsx",
            "jsx",
        ],
    },
    {
        key: "executable",
        name: "Ejecutable",
        icon: IconExecutable,
        extensions: [
            "exe",
            "apk",
            "dmg",
            "app",
            "deb",
            "sh",
            "msi",
            "bat",
            "cmd",
        ],
    },
    {
        key: "font",
        name: "Fuente",
        icon: IconFont,
        extensions: ["ttf", "otf", "woff", "woff2"],
    },
    {
        key: "document",
        name: "Documento",
        icon: IconText,
        extensions: ["doc", "docx", "odt", "pdf", "rtf"],
    },
    { key: "", name: "Texto", icon: IconText, extensions: ["txt", "md"] },
    {
        key: "cfg",
        name: "Configuraciones",
        icon: IconSettings,
        extensions: ["ini", "cfg", "conf", "env"],
    },
];
