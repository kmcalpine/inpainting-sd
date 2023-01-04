import { fileURLToPath, URL } from "node:url";
import mix from "vite-plugin-mix";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		esbuildCommonjs(["pngjs"]),
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
