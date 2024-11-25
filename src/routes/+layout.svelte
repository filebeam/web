<script lang="ts">
    import "../app.css";

    import { WEB_PUBLIC_INSTANCE } from "$env/static/public";
    import { onNavigate } from "$app/navigation";
    import { page } from "$app/stores";

    import { dialogs } from "$lib/dialog.svelte";
    import { file } from "$lib/fileState.svelte";

    import NavigationBar from "$components/layout/NavigationBar.svelte";
    import NavigationTab from "$components/layout/NavigationTab.svelte";
    import AlertDialog from "$components/AlertDialog.svelte";

    import IconUpload from "~icons/tabler/cloud-upload";
    import IconInfo from "~icons/tabler/info-circle";
    import IconNews from "~icons/tabler/news";

    let { children } = $props();

    onNavigate(navigation => {
        if (!document.startViewTransition) return;

        return new Promise(resolve => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
</script>

<svelte:head>
    <!-- TODO: dynamically set title for opengraph meta tags -->

    <title>Filebeam</title>
    <meta
        name="description"
        content="Comparte tus archivos, en cualquier lugar." />

    <meta name="theme-color" content="#C5DCE7" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="Filebeam" />
    <meta
        property="og:description"
        content="Comparte tus archivos, en cualquier lugar." />
    <meta property="og:url" content="https://{$page.url.host}" />
    <meta
        property="og:image"
        content="https://{$page.url.host}/img/opengraph.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Filebeam" />
    <meta
        name="twitter:description"
        content="Comparte tus archivos, en cualquier lugar." />
    <meta
        name="twitter:image"
        content="https://{$page.url.host}/img/opengraph.png" />
    <meta name="twitter:url" content="https://{$page.url.host}" />
</svelte:head>

<svelte:window
    onbeforeunload={e => {
        if (file.upload.uploading) {
            e.preventDefault();
        }
    }} />

{#each Object.keys(dialogs) as id}
    <AlertDialog {id} />
{/each}

<NavigationBar>
    <NavigationTab icon={IconUpload} name="Subir" path="/" />
    {#if WEB_PUBLIC_INSTANCE === "true"}
        <NavigationTab icon={IconNews} name="Anuncios" path="/announcements" />
    {/if}
    <NavigationTab icon={IconInfo} name="Acerca de" path="/about" />
</NavigationBar>

<div
    class="
      flex min-h-dvh flex-col justify-center py-8
      max-md:pb-28
      md:pt-16
    ">
    {@render children()}
</div>

<style>
    @keyframes slide-right {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
    }

    @keyframes slide-left {
        to {
            transform: translateX(-30px);
            opacity: 0;
        }
    }

    :root::view-transition-old(root) {
        animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-left;
    }

    :root::view-transition-new(root) {
        animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-right;
    }
</style>
