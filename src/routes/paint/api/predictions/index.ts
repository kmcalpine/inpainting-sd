import { addBackgroundToPNG } from "@/lib/add-background-to-png";
import express from "express";

const app = express();
app.use(express.json());

app.post("/api/predictions", (req, res) => {
	if (req.body.mask) {
		req.body.mask = addBackgroundToPNG(req.body.mask);
	}
	res.end(req.body.mask);
});

export const handler = app;
