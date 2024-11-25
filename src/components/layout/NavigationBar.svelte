<script lang="ts">
    import type { Snippet } from "svelte";
    import { page } from "$app/stores";

    import Icon from "$components/branding/Icon.svelte";

    let { children }: { children: Snippet } = $props();
</script>

{#key $page.url.pathname}
    <div
        id="app-navbar"
        class="
          fixed z-50 flex h-20 w-full flex-row items-center justify-between
          bg-white-400 py-2 transition-all
          dark:bg-black-400
          max-md:bottom-0
          md:top-0 md:h-16 md:bg-white/80 md:px-6 md:py-3 md:backdrop-blur-xl
          md:dark:bg-black/80
        ">
        <Icon
            class="
              ml-2 hidden h-full w-5
              md:block
            " />
        <nav
            class="
              flex h-full w-full flex-row justify-evenly
              md:w-auto md:gap-2
            ">
            {@render children()}
        </nav>
    </div>
{/key}

<style>
    #app-navbar {
        view-transition-name: navbar;
    }
</style>
