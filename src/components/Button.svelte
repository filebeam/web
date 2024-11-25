<script lang="ts">
    import type { IconComponent } from "$lib/types/icon";
    import type { Snippet } from "svelte";

    import { Button, type WithoutChildrenOrChild } from "bits-ui";

    type Props = WithoutChildrenOrChild<Button.RootProps> & {
        icon?: IconComponent;
        children?: Snippet;
    };

    let { icon, children, class: classList, ...restProps }: Props = $props();
</script>

<Button.Root
    class={`
      h-fit gap-2 rounded-lg border-2 border-white-800 bg-white-300 px-4 py-1
      text-black transition-all
      active:scale-95
      dark:border-black-200 dark:bg-black-400 dark:text-white
      dark:hover:border-white dark:hover:bg-white dark:hover:text-black
      disabled:pointer-events-none disabled:opacity-60
      hover:bg-white-700 hover:text-black hover:no-underline
      ${classList}
    `}
    {...restProps}>
    {#if icon}
        {@const ButtonIcon = icon}
        <ButtonIcon class="inline size-[1.2em]" />
    {/if}
    {@render children?.()}
</Button.Root>
