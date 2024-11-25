import type { SelectItem } from "$lib/types/selectItem";
import type { IconComponent } from "$lib/types/icon";
import type { FileType } from "$lib/fileTypes";

import IconDefaultFile from "~icons/tabler/file";

/** Allowed values for file expiration time */
const expireList: SelectItem[] = [
    { label: "No expirar", value: "0" },
    { label: "5 minutos", value: "5m" },
    { label: "30 minutos", value: "30m" },
    { label: "1 hora", value: "1h" },
    { label: "6 horas", value: "6h" },
    { label: "12 horas", value: "12h" },
    { label: "24 horas", value: "24h" },
];

interface FileState {
    /** The file itself */
    object?: File;

    /** A string describing file metadata as `"fileType, size (ext)"` */
    info?: string;

    /** An object representing the file type, containing properties used to
     * display it accordingly */
    type?: FileType;

    /** The icon component for the current file, from the file type object,
     * otherwise a fallback icon if the file has no associated file type */
    icon: IconComponent;

    /** An object describing the current upload state */
    upload: UploadState;

    /** An object containing file preview related variables to preserve state
     * across routes and avoid constantly rendering the preview */
    preview: PreviewState;
}

interface PreviewState {
    valid: boolean;
    src?: string;
}

interface UploadState {
    /** Is there an upload in progress? */
    uploading: boolean;

    /** Has the file been uploaded? */
    uploaded: boolean;

    /** Upload progress as a percentage */
    progress: number;

    /** The expire object for the uploaded file */
    expire?: ExpireState;

    /** Upload speed in megabytes */
    mbps?: number;

    /** Estimated time for the upload to finish (in seconds) */
    eta?: number;

    /** The URL for the file, if uploaded */
    url?: string;
}

interface ExpireState {
    list: SelectItem[];
    state: SelectItem["value"];
}

const file: FileState = $state({
    icon: IconDefaultFile,
    upload: {
        uploaded: false,
        uploading: false,
        progress: 0,
    },
    preview: {
        valid: false,
    },
});

/** An object containing the list for the allowed expire values and the
 * currently selected value */
const expire: ExpireState = $state({
    list: expireList,
    state: "0",
});

export { file, expire };
