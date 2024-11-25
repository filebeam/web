import type { IconComponent } from "$lib/types/icon";

interface AlertDialog {
    open?: boolean;
    title: string;
    description: string;
    icon?: IconComponent;
    buttons?: {
        label: string;
        callback: () => void;
    }[];
}

const dialogs: { [key: string]: AlertDialog } = $state({});

function alert(id: string, options: AlertDialog) {
    dialogs[id] = { ...options, open: false };
    setTimeout(() => (dialogs[id].open = true));
}

function close(id: string) {
    dialogs[id].open = false;
}

export { dialogs, alert, close };
