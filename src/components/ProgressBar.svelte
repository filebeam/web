<script lang="ts">
    import { Progress } from "bits-ui";

    interface Props {
        value: number;
        max?: number;
    }

    let { value = $bindable(0), max = $bindable(100) }: Props = $props();
</script>

<Progress.Root
    class="
      h-1 w-full overflow-hidden rounded-full bg-white-800
      dark:bg-black-400
    "
    {value}
    {max}>
    <div
        style={`transform: translateX(-${100 - (100 * (value ?? 0)) / 100}%)`}
        class="
          h-full w-full animate-pulse rounded-full bg-black-200 transition-all
          dark:bg-white
        ">
    </div>
</Progress.Root>
