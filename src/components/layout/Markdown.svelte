<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
        title: string;
        date: string;
    }

    let { children, title, date }: Props = $props();
</script>

<svelte:head>
    <title>{title} ~ Filebeam</title>
</svelte:head>

<div
    class="
      m-auto flex w-5/6 max-w-screen-lg flex-grow select-text flex-col gap-4
    ">
    <div class="select-none">
        <h1
            class="
              mt-14 text-4xl
              md:text-6xl
            ">
            {title}
        </h1>
        <p
            class="
              text-sm opacity-60
              md:text-lg
            ">
            <strong>Ultima actualización:</strong>
            {date}
        </p>
    </div>
    {@render children()}
</div>
