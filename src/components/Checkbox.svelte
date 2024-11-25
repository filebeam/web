<script lang="ts">
    import type { Snippet } from "svelte";
    import { Checkbox, Label, useId } from "bits-ui";

    import IconCheck from "~icons/tabler/check";

    type Props = Checkbox.RootProps & {
        checked?: boolean;
        children: Snippet;
    };

    let { checked = $bindable(), children }: Props = $props();

    const id = useId();
</script>

<div class="flex flex-row justify-center gap-2">
    <Checkbox.Root
        {id}
        {checked}
        class="
          aspect-square size-6 self-start rounded-lg border-2 border-white-800
          bg-white-400 text-black transition-all
          active:scale-90
          dark:border-black-200 dark:bg-black-400
          dark:data-[state=checked]:border-blue
          dark:data-[state=checked]:bg-blue
          data-[state=checked]:bg-white-600
        ">
        {#snippet children({ checked })}
            {#if checked}
                <IconCheck class="size-full p-0.5" />
            {/if}
        {/snippet}
    </Checkbox.Root>
    <Label.Root for={id} class="opacity-80">
        {@render children()}
    </Label.Root>
</div>
