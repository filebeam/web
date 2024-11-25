<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    type Props = HTMLInputAttributes & {
        ref?: HTMLInputElement;
    };

    let { ref = $bindable(), ...restProps }: Props = $props();
</script>

<input
    bind:this={ref}
    class="
      peer h-12 w-96 max-w-full rounded-lg border-2 border-white-800
      bg-white-300 p-4 transition-all
      dark:border-black-200 dark:bg-black-500
      invalid:outline-red-500 invalid:dark:outline-red
      placeholder:text-black/60 placeholder:dark:text-white/60
    "
    {...restProps} />
