import { addBackgroundToPNG } from "@/lib/add-background-to-png";
import express from "express";
import axios from "axios";

const API_HOST = "https://api.replicate.com";

const app = express();
app.use(express.json({ limit: "200mb" }));

app.post("/api/predictions", async (req, res) => {
	if (req.body.mask) {
		req.body.mask = addBackgroundToPNG(req.body.mask);
	}
	const body = JSON.stringify({
		// Pinned to a specific version of Stable Diffusion, fetched from:
		// https://replicate.com/stability-ai/stable-diffusion
		version: "be04660a5b93ef2aff61e3668dedb4cbeb14941e62a3fd5998364a32d613e35e",
		input: req.body,
	});

	const prediction = await getPredictions(body);

	res.statusCode = 201;
	res.end(JSON.stringify(prediction));
});

async function getPredictions(body: any) {
	try {
		const response = await axios.post(`${API_HOST}/v1/predictions`, body, {
			headers: {
				Authorization: `Token ${import.meta.env.VITE_REPLICATE_KEY}`,
				"Content-Type": "application/json",
			},
		});
		console.log(response.data);
		return response.data;
	} catch (e) {
		console.log(e);
	}
}

export const handler = app;
