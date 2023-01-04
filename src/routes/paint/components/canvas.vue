<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import VueDrawingCanvas from "vue-drawing-canvas";
	export interface Props {
		userImg: any;
	}

	const props = withDefaults(defineProps<Props>(), {
		userImg: "",
	});

	const canvas = ref(null);
	const showCanvas = ref(true);
	const image = ref("");
	const origImage = ref<null | string>(null);

	const submitHandler = async (e: any) => {
		e.preventDefault();
		if (canvas.value !== null) {
			origImage.value = image.value;
			showCanvas.value = false;
			// @ts-ignore
			let strokes = canvas.value.getAllStrokes();
			for (let stroke of strokes) {
				stroke.color = "black";
			}
			// @ts-ignore
			canvas.value.redraw();
		}
		console.log("here");
		const body = {
			prompt: "a woman singing on stage",
			init_image: await readAsDataURL(props.userImg.file),
			mask: image.value,
		};
		console.log("after");
		const response = await fetch("../api/predictions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
	};

	async function readAsDataURL(file: any) {
		console.log("reading as data url");
		return new Promise((resolve, reject) => {
			const fr = new FileReader();
			fr.onerror = reject;
			fr.onload = () => {
				resolve(fr.result);
			};
			fr.readAsDataURL(file);
		});
	}
</script>

<template>
	<div class="flex flex-col">
		<div class="w-full h-full">
			<div><img :src="props.userImg.url" /></div>
			<div class="absolute top-0 left-0 w-full h-full bg-transparent">
				<img
					v-if="origImage"
					:src="origImage"
					class="absolute opacity-60 w-[500px] h-[500px]"
				/>
				<vue-drawing-canvas
					v-show="showCanvas"
					class="opacity-60"
					ref="canvas"
					:height="500"
					:width="500"
					v-model:image="image"
					:line-cap="'round'"
					:line-join="'round'"
					:stroke-type="'dash'"
					:background-color="'transparent'"
					:line-width="50"
					:color="'#9919e3'"
				/>
			</div>
		</div>
		<div @click="submitHandler">submit</div>
	</div>
</template>
