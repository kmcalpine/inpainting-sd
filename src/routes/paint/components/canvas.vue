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
	const image = ref("");
</script>

<template>
	<div class="w-full h-full">
		<div><img :src="props.userImg" /></div>
		<div class="absolute top-0 left-0 w-full h-full bg-transparent">
			<vue-drawing-canvas
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
</template>
