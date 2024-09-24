import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://astroship.web3templates.com",
  integrations: [starlight({
    title: 'Research',
    disable404Route: true,
  }), tailwind(), mdx(), sitemap(), svelte()]
});