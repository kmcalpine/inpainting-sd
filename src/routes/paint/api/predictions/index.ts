import type { Handler } from "vite-plugin-mix";

export const handler: Handler = (req, res, next) => {
	if (req.path === "/api/predictions") {
		console.log("inside");
	}
	next();
};
