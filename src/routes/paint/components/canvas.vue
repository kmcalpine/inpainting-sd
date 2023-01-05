<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import VueDrawingCanvas from "vue-drawing-canvas";
	import { storeToRefs } from "pinia";
	import { useMaskStore } from "@/stores/mask";

	export interface Props {
		userImg: any;
	}

	const props = withDefaults(defineProps<Props>(), {
		userImg: "",
	});

	const emit = defineEmits(["interface"]);

	const { mask } = storeToRefs(useMaskStore());

	onMounted(() => {
		emitInterface();
	});

	const canvas = ref(null);
	const showCanvas = ref(true);
	const origImage = ref<null | string>(null);

	function repaintAllStrokes() {
		if (canvas.value !== null) {
			origImage.value = mask.value;
			showCanvas.value = false;
			// @ts-ignore
			let strokes = canvas.value.getAllStrokes();
			for (let stroke of strokes) {
				stroke.color = "black";
			}
		}
	}
	function redrawCanvas() {
		console.log("redrawing canvas");
		// @ts-ignore
		canvas.value.redraw();
	}

	const emitInterface = () => {
		emit("interface", {
			repaintAllStrokes: () => repaintAllStrokes(),
			redrawCanvas: () => redrawCanvas(),
		});
	};
</script>

<template>
	<div class="flex flex-col">
		<div class="w-[500px] h-[500px]">
			<img :src="props.userImg.url" class="h-[500px] w-[500px] object-fill" />
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
					v-model:image="mask"
					:line-cap="'round'"
					:line-join="'round'"
					:stroke-type="'dash'"
					:background-color="'transparent'"
					:line-width="50"
					:color="'#9919e3'"
				/>
			</div>
		</div>
	</div>
</template>
