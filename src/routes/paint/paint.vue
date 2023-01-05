<script setup lang="ts">
	import Dropzone from "./components/dropzone.vue";
	import Canvas from "./components/canvas.vue";
	import useFile from "./compositions/file";
	import { ref } from "vue";

	const { files, addFile } = useFile();

	const prompt = ref("");
</script>

<template>
	<public-view>
		<div class="w-[500px] h-[500px] flex flex-col bg-transparent mx-auto">
			<Dropzone
				v-if="!files.length"
				@image-dropped="addFile"
				#default="{ dropZoneActive }"
			/>
			<Canvas v-else class="" :userImg="files[0]"></Canvas>
		</div>
		<div class="flex mt-3">
			<div class="mx-auto flex w-[500px]">
				<input
					class="px-3 h-12 bg-[#181818] w-full rounded-l-md"
					v-model="prompt"
				/>
				<div class="bg-[#9919e3] flex ml-auto w-32 rounded-r-md flex">
					<span class="m-auto text-white text-sm">generate</span>
				</div>
			</div>
		</div>
	</public-view>
</template>
