import { WEB_BASE_URL_API } from "$env/static/public";

import { alert, close } from "$lib/dialog.svelte";
import { expire, file } from "$lib/fileState.svelte";

let request: XMLHttpRequest | undefined;
let response: string;

const toMB = (bytes: number) => bytes / (1024 * 1024);

async function uploadFile() {
    if (!file.object) return;

    if (!URL.canParse(WEB_BASE_URL_API))
        return alert("InvalidAPI", {
            title: "La URL de la API no es valida",
            description: `La URL de la API especificada en las variables
            de entorno no es valida, comunícate con los administradores
            de esta instancia`,
        });

    /** Max file size per upload (in MB) */
    const maxSize = expire.state === "0" ? 200 : 1000;

    request = new XMLHttpRequest();

    const formData = new FormData();
    formData.append("file", file.object);
    if (expire.state !== "0") formData.append("time", expire.state);

    request.open("POST", `${WEB_BASE_URL_API}/`);

    const startTime = Date.now();

    request.upload.addEventListener("progress", e => {
        file.upload.progress = Math.round((e.loaded / e.total) * 100);

        // calculate upload speed in MB/s
        const elapsedTime = (Date.now() - startTime) / 1000;
        const bytesPerSecond = e.loaded / elapsedTime;
        file.upload.mbps = toMB(bytesPerSecond);

        // calculate eta in seconds
        const remainingBytes = e.total - e.loaded;
        file.upload.eta = Math.round(remainingBytes / bytesPerSecond);
    });

    request.addEventListener("load", () => {
        if (!request) return;
        if (request.status === 200) {
            file.upload.url = request.response;
            file.upload.expire = $state.snapshot(expire);
            file.upload.uploaded = true;
        } else {
            alert("UploadError", {
                title: "Ocurrió un error durante la subida",
                description: `El servidor ha respondido con el código
                ${request.status}`,
                buttons: [
                    {
                        label: "Aceptar",
                        callback: () => close("UploadError"),
                    },
                    {
                        label: "Ver detalles",
                        callback: () =>
                            alert("UploadErrorDetails", {
                                title: "Respuesta del servidor",
                                description: response,
                            }),
                    },
                ],
            });
        }
    });

    request.addEventListener("loadend", () => {
        if (!request) return;
        response = request.responseText;
        request = undefined;

        file.upload.eta = undefined;
        file.upload.mbps = undefined;
        file.upload.uploading = false;
        file.upload.progress = 0;
    });

    request.addEventListener("error", () => {
        alert("UploadError", {
            title: "Ocurrió un error durante la subida",
            description: `Ha ocurrido un error desconocido, ¡Revisa la consola
                de desarrolladores para ver un registro detallado!`,
        });
    });

    if (toMB(file.object.size) > maxSize) {
        alert("MaxSizeWarning", {
            title: "Tamaño máximo superado",
            description: `El archivo seleccionado excede el limite de tamaño por
            subida para los ${
                maxSize === 200
                    ? "archivos no temporales"
                    : "archivos temporales"
            }`,
        });
    } else {
        request.send(formData);
        file.upload.uploading = true;
        file.upload.url = undefined;
    }
}

export { request, uploadFile };
