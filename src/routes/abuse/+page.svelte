<script lang="ts">
    import { WEB_PUBLIC_INSTANCE } from "$env/static/public";

    import Textarea from "$components/forms/Textarea.svelte";
    import Logo from "$components/branding/Logo.svelte";
    import Checkbox from "$components/Checkbox.svelte";
    import Input from "$components/forms/Input.svelte";
    import Button from "$components/Button.svelte";
    import Select from "$components/Select.svelte";
    import { Label } from "bits-ui";

    import IconWarning from "~icons/tabler/alert-triangle";

    let reportType: string = $state("copyright");
    let form: HTMLFormElement | undefined = $state();
    let urlInput: HTMLInputElement | undefined = $state();
</script>

<div class="flex h-full flex-col items-center justify-center gap-4 px-8">
    <main class="w-96 max-w-full">
        <div class="flex flex-col items-center gap-2">
            <Logo class="w-64" />
            <span class="opacity-60">Reportar abuso</span>
        </div>
        <form bind:this={form} class="flex w-full flex-col gap-6">
            <div class="flex flex-col gap-2">
                <Label.Root for="typeSelector" class="text-sm opacity-80">
                    Razón del reporte
                </Label.Root>
                <Select
                    id="typeSelector"
                    bind:value={reportType}
                    items={[
                        {
                            label: "Infracción por derechos de autor",
                            value: "copyright",
                        },
                        {
                            label: "Contenido inapropiado",
                            value: " inappropriate",
                        },
                        { label: "Otro...", value: "other" },
                    ]} />
            </div>
            <div class="flex flex-col gap-2">
                <Label.Root for="reportUrl" class="text-sm opacity-80">
                    Enlace a reportar
                </Label.Root>
                <Input
                    required
                    type="url"
                    id="reportUrl"
                    autocomplete="off"
                    spellcheck={false}
                    bind:ref={urlInput}
                    placeholder="https://filebeam.xyz/file/..." />
                <span
                    class="
                      hidden text-sm text-red-500 transition-all
                      dark:text-red
                      peer-invalid:block
                    ">
                    <IconWarning class="inline" />
                    Enlace no valido
                </span>
            </div>
            {#if reportType === "other"}
                <div class="flex flex-col gap-2">
                    <Label.Root for="description" class="text-sm opacity-80">
                        Detalles adicionales
                    </Label.Root>
                    <Textarea
                        required
                        placeholder="Introduce la razon de tu reporte..." />
                    <span
                        class="
                          hidden text-sm text-red-500 transition-all
                          dark:text-red
                          peer-invalid:block
                        ">
                        <IconWarning class="inline" />
                        Debes proporcionar una razón para la opción elegida
                    </span>
                </div>
            {/if}
            <Checkbox>
                Acepto haber leído los
                <a href="/terms">Términos y condiciones de uso</a>
                y los <a href="/about">lineamientos</a> para las subidas de archivos
            </Checkbox>
            <Button disabled>Reportar</Button>
            {#if WEB_PUBLIC_INSTANCE !== "true"}
                <p
                    class="
                      text-sm text-red-500 transition-all
                      dark:text-red
                    ">
                    <IconWarning class="inline" />
                    El formulario para reportar enlaces ha sido deshabilitado para
                    esta instancia
                </p>
            {/if}
            <p
                class="
                  text-sm text-red-500 transition-all
                  dark:text-red
                ">
                <!--
                    El correo presente es solo en caso de ser realmente
                    necesario reportar un enlace, este mensaje sera eliminado en
                    futuros commits una vez el formulario sea implementado
                -->
                <IconWarning class="inline" />
                El formulario para reportar enlaces aun no esta disponible, sera
                implementado próximamente. Si deseas reportar un enlace, hazlo a
                traves del correo electrónico
                <a
                    href="mailto:jorgean9999@gmail.com"
                    class="
                      font-bold text-red-500
                      dark:text-red dark:hover:text-red-300
                      hover:text-red-600
                    ">
                    jorgean9999@gmail.com
                </a>
            </p>
        </form>
    </main>
</div>
