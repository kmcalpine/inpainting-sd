import type { App } from "vue";
import PublicView from "./public";

export function registerViews(app: App): void {
	app.component("PublicView", PublicView);
}
