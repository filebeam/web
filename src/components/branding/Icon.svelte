<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    let { class: classList }: HTMLAttributes<SVGElement> = $props();
</script>

<svg
    id="a"
    width="1em"
    height="1em"
    viewBox="0 0 90 93.65"
    xmlns="http://www.w3.org/2000/svg"
    class={`
      fill-black transition-all
      dark:fill-blue
      ${classList}
    `}>
    <g id="b">
        <g id="c">
            <g id="d">
                <path
                    id="e"
                    d="M77.98,76.41c0,3.17-2.69,5.75-6.01,5.75H18.03c-3.32,0-6.01-2.58-6.01-5.75V17.25c0-3.17,2.69-5.75,6.01-5.75h23.89v23c0,6.35,5.38,11.5,12.02,11.5h24.04v30.41ZM88.24,32.81L55.7,1.68c-1.13-1.08-2.66-1.68-4.25-1.68H12.02C5.38,0,0,5.15,0,11.5v70.66c0,6.35,5.38,11.5,12.02,11.5h65.96c6.64,0,12.02-5.15,12.02-11.5v-45.28c0-1.52-.63-2.98-1.76-4.07h0Z"
                    style="fill-rule: evenodd" />
            </g>
        </g>
    </g>
</svg>
