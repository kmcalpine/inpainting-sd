<script setup lang="ts">
	import Dropzone from "./components/dropzone.vue";
	import Canvas from "./components/canvas.vue";
	import useFile from "./compositions/file";
	import { ref, reactive } from "vue";
	import { storeToRefs } from "pinia";
	import { useMaskStore } from "@/stores/mask";
	import Loading from "@/components/icons/Loading.vue";

	const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

	const { mask } = storeToRefs(useMaskStore());
	const { files, addFile, resetFile } = useFile();

	let canvasInterface = reactive({
		repaintAllStrokes: () => {},
		redrawCanvas: () => {},
	});

	const repaintAllStrokes = () => {
		canvasInterface.repaintAllStrokes();
	};

	const redrawCanvas = () => {
		canvasInterface.redrawCanvas();
	};

	const predictionOutput = ref<null | any>(null);

	const prompt = ref("");
	const loading = ref(false);
	const submitHandler = async (e: Event) => {
		loading.value = true;
		e.preventDefault();

		repaintAllStrokes();
		redrawCanvas();

		const body = {
			prompt: prompt.value,
			init_image: await readAsDataURL(files.value[0].file),
			mask: mask.value,
		};
		const response = await fetch("../api/predictions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (response.status !== 201) {
			// handle failed request
			return;
		}
		let prediction = await response.json();

		while (
			prediction.status !== "succeeded" &&
			prediction.status !== "failed"
		) {
			await sleep(1000);
			const response = await fetch(`../api/predictions/${prediction.id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			});
			prediction = await response.json();

			if (prediction.status === "succeeded") {
				predictionOutput.value = prediction;
				loading.value = false;
			}
		}
	};

	const getCanvasInterface = (ICanvas: any) => {
		canvasInterface = ICanvas;
	};

	async function readAsDataURL(file: any) {
		return new Promise((resolve, reject) => {
			const fr = new FileReader();
			fr.onerror = reject;
			fr.onload = () => {
				resolve(fr.result);
			};
			fr.readAsDataURL(file);
		});
	}

	const reset = (e: Event) => {
		resetFile();
		predictionOutput.value = null;
		prompt.value = "";
		mask.value = "";
		repaintAllStrokes();
	};
</script>

<template>
	<public-view>
		<div class="w-[500px] h-[500px] flex flex-col bg-transparent mx-auto">
			<div class="absolute top-0 -right-20 z-[999] flex flex-row">
				<button
					class="border border-gray-600 px-3 py-1 rounded-lg hover:bg-white/10"
					@click="reset"
				>
					reset
				</button>
			</div>
			<div
				v-if="loading"
				class="absolute w-full h-full opacity-80 bg-black z-[999]"
			>
				<Loading />
			</div>
			<div
				v-if="predictionOutput !== null"
				class="absolute z-[999] w-full h-full"
			>
				<img :src="predictionOutput.output" />
			</div>
			<div v-if="predictionOutput === null" class="w-full h-full">
				<Dropzone
					v-if="!files.length"
					@image-dropped="addFile"
					#default="{ dropZoneActive }"
				/>
				<Canvas
					v-else
					class=""
					:userImg="files[0]"
					@interface="getCanvasInterface"
				></Canvas>
			</div>
		</div>
		<div class="flex mt-3">
			<div class="mx-auto flex w-[500px]">
				<input
					class="px-3 h-12 bg-[#181818] w-full rounded-l-md outline-none"
					v-model="prompt"
					placeholder="enter prompt"
				/>
				<button
					class="bg-[#9919e3] opacity-50 flex ml-auto w-32 rounded-r-md flex"
					:class="{
						'cursor-pointer opacity-100': prompt.length > 0 && mask.length > 0,
					}"
					@click.once="submitHandler"
					:disabled="prompt.length === 0 || mask.length === 0"
				>
					<span class="m-auto text-white">generate</span>
				</button>
			</div>
		</div>
	</public-view>
</template>
