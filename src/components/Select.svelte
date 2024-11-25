<script lang="ts">
    import type { SelectItem } from "$lib/types/selectItem";
    import { fly } from "svelte/transition";

    import { Select } from "bits-ui";

    import IconChevronExpand from "~icons/tabler/selector";
    import IconCheckmark from "~icons/tabler/check";

    type Props = {
        id?: string;
        name?: string;
        items: SelectItem[];
        value: SelectItem["value"];
        disabled?: boolean;
        open?: boolean;
    };

    let {
        id,
        name,
        items,
        value = $bindable(),
        disabled = false,
        open = false,
    }: Props = $props();

    const label = $derived(items.find(item => item.value === value)?.label);
</script>

<Select.Root
    {name}
    {items}
    type="single"
    allowDeselect={false}
    bind:open
    bind:value>
    <Select.Trigger
        {id}
        {disabled}
        class="
          flex h-fit max-w-full items-center justify-between gap-1 rounded-lg
          border-2 border-white-800 bg-white-300 px-4 py-1 pl-6 transition-all
          active:scale-95
          dark:border-black-200 dark:bg-black-400 dark:hover:border-white
          dark:hover:bg-white dark:hover:text-black
          disabled:pointer-events-none disabled:opacity-60
          hover:bg-white-500
        ">
        <span class="block truncate">{label}</span>
        <IconChevronExpand class="opacity-60" />
    </Select.Trigger>
    <Select.Portal>
        <Select.Content sideOffset={14} forceMount>
            {#snippet child({ props, open })}
                {#if open}
                    <div
                        {...props}
                        transition:fly={{ y: 10, duration: 300 }}
                        class="
                          max-w-[90svw] rounded-lg border-2 border-white-800
                          bg-white py-2 backdrop-blur-lg
                          dark:border-black-200 dark:bg-black
                        ">
                        {#each items as item}
                            <Select.Item
                                value={item.value}
                                label={item.label}
                                class="
                                  flex flex-row items-center gap-4 px-4 py-0.5
                                  data-[highlighted]:bg-white-700
                                  data-[highlighted]:dark:bg-black-300
                                ">
                                <span class="block truncate">{item.label}</span>
                                {#if item.value === value}
                                    <IconCheckmark class="opacity-60" />
                                {/if}
                            </Select.Item>
                        {/each}
                    </div>
                {/if}
            {/snippet}
        </Select.Content>
    </Select.Portal>
</Select.Root>
