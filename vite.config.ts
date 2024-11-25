import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import icons from "unplugin-icons/vite";
import info from "unplugin-info/vite";

export default defineConfig({
    plugins: [sveltekit(), info(), icons({ compiler: "svelte" })],
});
