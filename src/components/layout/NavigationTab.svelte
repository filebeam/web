<script lang="ts">
    import type { IconComponent } from "$lib/types/icon";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    interface Props {
        name: string;
        path: string;
        icon: IconComponent;
    }

    let { name, path, icon }: Props = $props();

    const TabIcon = icon;
    const active = $page.url.pathname === path;
</script>

<button
    disabled={active}
    data-active={active}
    onclick={() => goto(path)}
    aria-label={name}
    class="
      flex aspect-square h-full w-24 flex-col items-center justify-center gap-1
      rounded-xl px-2 text-center text-black/70 outline-2 outline-transparent
      transition-all
      dark:text-white/70
      data-[active=false]:hover:bg-white-600
      data-[active=false]:md:hover:bg-white-500
      data-[active=false]:hover:dark:bg-black-300
      data-[active=false]:md:hover:dark:bg-black-400
      data-[active=true]:bg-white-600 data-[active=true]:text-black
      data-[active=true]:outline-white-800 data-[active=true]:dark:bg-black-200
      data-[active=true]:dark:text-white
      data-[active=true]:dark:outline-black-50
      md:w-auto
    ">
    <TabIcon class="size-6" />
    <span class="md:hidden">{name}</span>
</button>
