<script setup lang="ts">
	import { ref, watch } from "vue";
	import VueDrawingCanvas from "vue-drawing-canvas";
	export interface Props {
		userImg: string;
	}

	const props = withDefaults(defineProps<Props>(), {
		userImg: "",
	});

	const canvas = ref(null);
	const showCanvas = ref(true);
	const image = ref("");
	const origImage = ref<null | string>(null);

	const submitHandler = async () => {
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
		const body = {
			prompt: "",
			initImg: props.userImg,
			mask: image.value,
		};
		const response = await fetch("../api/predictions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
	};
</script>

<template>
	<div class="flex flex-col">
		<div class="w-full h-full">
			<div><img :src="props.userImg" /></div>
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
