<script lang="ts">
    import { page } from "$app/stores";

    import Button from "$components/Button.svelte";

    import IconHome from "~icons/tabler/home";
    import IconReload from "~icons/tabler/reload";

    let msg: string = "";
    let err: string = "";

    switch ($page.status) {
        case 404:
            msg = "Algo hace falta aqui...";
            err = "Pagina no encontrada";
            break;

        default:
            msg = "No te preocupes, no es tu culpa!";
            err = "Error inesperado";
            break;
    }
</script>

<svelte:head>
    <title>{err}</title>
</svelte:head>

<main
    class="
      flex flex-grow flex-col items-center justify-center gap-6 px-8 text-center
    ">
    <div>
        <h1
            class="
              text-2xl
              md:text-6xl
            ">
            {err}
        </h1>
        <p
            class="
              opacity-60
              md:text-xl
            ">
            {msg}
            <strong class="opacity-60">
                ({$page.status})
            </strong>
        </p>
    </div>
    <div class="flex flex-row flex-wrap gap-4">
        <Button icon={IconHome} href="/">Volver al inicio</Button>
        {#if $page.status !== 404}
            <Button icon={IconReload} href={$page.url.pathname}>
                Intentar nuevamente
            </Button>
        {/if}
    </div>
</main>
