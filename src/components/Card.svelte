<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import type { Snippet } from "svelte";

    type Props = HTMLAttributes<HTMLDivElement> & {
        children: Snippet;
    };

    let { children, class: classList }: Props = $props();
</script>

<div
    class={`
      overflow-hidden rounded-2xl border-2 border-white-700 bg-white-300 p-6
      transition-all
      dark:border-black-200 dark:bg-black-400
      ${classList}
    `}>
    {@render children()}
</div>
