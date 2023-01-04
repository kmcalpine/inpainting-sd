import { fileURLToPath, URL } from "node:url";
import mix from "vite-plugin-mix";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		mix({
			handler: "./src/routes/paint/api/predictions/index.ts",
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
