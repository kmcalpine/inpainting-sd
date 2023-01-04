<script setup lang="ts">
	import Dropzone from "./components/dropzone.vue";
	import Canvas from "./components/canvas.vue";
	import useFile from "./compositions/file";

	const { files, addFile } = useFile();
</script>

<template>
	<public-view>
		<div class="w-[500px] h-[500px] flex bg-transparent mx-auto">
			<Dropzone
				v-if="!files.length"
				@image-dropped="addFile"
				#default="{ dropZoneActive }"
			/>
			<Canvas v-else class="" :userImg="files[0]"></Canvas>
		</div>
	</public-view>
</template>
