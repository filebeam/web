<script lang="ts">
    import type { Announcement } from "$lib/types/announcement";

    import { WEB_BASE_URL_API, WEB_PUBLIC_INSTANCE } from "$env/static/public";

    import Spinner from "$components/Spinner.svelte";
    import Card from "$components/Card.svelte";

    import { onMount } from "svelte";
    import { Marked } from "marked";

    import IconWarning from "~icons/tabler/alert-triangle";

    const md = new Marked();
    const announcements: Announcement[] = [];

    let loading = $state(true);

    onMount(() => {
        if (WEB_PUBLIC_INSTANCE !== "true") {
            loading = false;
            return;
        }

        fetch(`${WEB_BASE_URL_API}/anuncios`)
            .then(async res => {
                if (res.ok) {
                    const data: Announcement[] = await res.json();
                    for (const announcement of data) {
                        announcements.push({ ...announcement });
                    }
                }
            })
            .finally(() => {
                loading = false;
            });
    });
</script>

<svelte:head>
    <title>Anuncios ~ Filebeam</title>
</svelte:head>

{#if loading}
    <main class="m-auto flex w-full max-w-96 flex-col items-center gap-4">
        <Spinner class="size-6" />
        <p class="opacity-60">Cargando anuncios...</p>
    </main>
{:else if !announcements.length}
    <main
        class="
          m-auto flex w-5/6 max-w-lg flex-col items-center gap-1 text-center
        ">
        <img
            class="
              h-56 w-full max-w-96 rounded-xl object-cover
              md:h-56
            "
            src="/img/broken.webp"
            alt="" />

        <h1 class="mt-4 text-2xl font-bold">
            {WEB_PUBLIC_INSTANCE === "true"
                ? "Algo ha salido mal..."
                : "No disponible"}
        </h1>

        <p class="opacity-60">
            {WEB_PUBLIC_INSTANCE === "true"
                ? "No se han podido cargar los anuncios"
                : "Los anuncios no están disponibles para esta instancia"}
        </p>
    </main>
{:else}
    <main class="m-auto flex h-full w-full max-w-4xl flex-col gap-4 px-6">
        {#each announcements as announcement}
            {@const markdown = md.parse(announcement.content)}
            <Card class="flex flex-col gap-2">
                {#if announcement.img_url}
                    <img
                        class="
                          h-40 w-full rounded-xl bg-white-500 object-cover
                          dark:bg-black-200
                          sm:h-64
                          xl:h-80
                        "
                        src={announcement.img_url}
                        alt={announcement.title} />
                {/if}
                <div class="mt-2">
                    <h1
                        class="
                          text-xl font-bold
                          md:text-2xl
                          xl:text-3xl
                        ">
                        {announcement.title}
                    </h1>
                    <span
                        class="
                          text-sm opacity-60
                          xl:text-base
                        ">
                        {announcement.date}
                    </span>
                </div>
                <div class="flex flex-col gap-2">
                    {#await markdown then markdown}
                        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                        {@html markdown}
                    {:catch}
                        <span class="opacity-60">
                            <IconWarning class="inline" />
                            No se pudo cargar el contenido
                        </span>
                    {/await}
                </div>
            </Card>
        {/each}
    </main>
{/if}
