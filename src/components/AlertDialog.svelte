<script lang="ts">
    import { dialogs } from "$lib/dialog.svelte";
    import { fade, scale } from "svelte/transition";

    import { AlertDialog } from "bits-ui";

    import IconWarning from "~icons/tabler/alert-triangle";

    let { id }: { id: string } = $props();
    const dialog = $derived(dialogs[id]);
</script>

<AlertDialog.Root open={dialog.open}>
    <AlertDialog.Portal>
        <AlertDialog.Overlay forceMount>
            {#snippet child({ props, open })}
                {#if open}
                    <div
                        transition:fade={{ duration: 200 }}
                        class="
                          fixed inset-0 z-50 flex items-center justify-center
                          bg-[#000]/70 backdrop-blur-lg
                        "
                        {...props}>
                    </div>
                {/if}
            {/snippet}
        </AlertDialog.Overlay>
        <AlertDialog.Content forceMount interactOutsideBehavior="close">
            {#snippet child({ props, open })}
                {@const AlertIcon = dialog.icon || IconWarning}
                {#if open}
                    <div
                        {...props}
                        class="
                          fixed left-[50%] top-[50%] z-50 flex w-full
                          max-w-[90%] translate-x-[-50%] translate-y-[-50%]
                          flex-col items-center gap-2 rounded-xl border
                          border-white-900 bg-gradient-to-b from-white-300
                          to-white-400 p-8 text-center shadow-2xl
                          dark:border-black-50 dark:from-black-600
                          dark:to-black-300 dark:text-white
                          sm:w-[32rem]
                        "
                        transition:scale={{ start: 0.9, duration: 300 }}>
                        <AlertIcon class="size-12 opacity-90" />
                        <AlertDialog.Title class="text-lg font-bold opacity-90">
                            {dialog.title}
                        </AlertDialog.Title>
                        <AlertDialog.Description class="opacity-80">
                            {dialog.description}
                        </AlertDialog.Description>
                        <div class="mt-4 flex w-full flex-col gap-3">
                            {#if dialog.buttons}
                                {#each dialog.buttons as button}
                                    <AlertDialog.Action
                                        onclick={button.callback}
                                        class="
                                          w-full rounded-lg border-2
                                          border-white-600 bg-white-400 px-3
                                          py-1 transition-all
                                          dark:border-black-50 dark:bg-black-200
                                          dark:hover:bg-black-100
                                          hover:bg-white-500
                                        ">
                                        {button.label}
                                    </AlertDialog.Action>
                                {/each}
                            {:else}
                                <AlertDialog.Cancel
                                    class="
                                      w-full rounded-lg border-2
                                      border-white-600 bg-white-400 px-3 py-1
                                      transition-all
                                      dark:border-black-50 dark:bg-black-200
                                      dark:hover:bg-black-100
                                      hover:bg-white-500
                                    ">
                                    Aceptar
                                </AlertDialog.Cancel>
                            {/if}
                        </div>
                    </div>
                {/if}
            {/snippet}
        </AlertDialog.Content>
    </AlertDialog.Portal>
</AlertDialog.Root>
