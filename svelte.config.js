import { mdsvex } from "mdsvex";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: [
        vitePreprocess(),
        mdsvex({
            extensions: [".md"],
            layout: "./src/components/layout/Markdown.svelte",
        }),
    ],

    extensions: [".svelte", ".md"],
    kit: {
        // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://svelte.dev/docs/kit/adapters for more information about adapters.
        adapter: adapter({
            // default options are shown. On some platforms
            // these options are set automatically ~ see below
            pages: "build",
            assets: "build",
            fallback: undefined,
            precompress: false,
            strict: true,
        }),

        alias: { $components: "src/components" },
        env: { publicPrefix: "WEB" },
    },
};

export default config;
