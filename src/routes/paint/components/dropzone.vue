<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from "vue";
	const emit = defineEmits(["image-dropped"]);

	const active = ref(false);

	function setActive() {
		active.value = true;
	}

	function setInactive() {
		active.value = false;
	}

	function onDrop(e: any) {
		setActive();
		emit("image-dropped", [...e.dataTransfer.files]);
	}

	function preventDefaults(e: any) {
		e.preventDefault();
	}

	const events = ["dragenter", "dragover", "dragleave", "drop"];

	onMounted(() => {
		events.forEach((eventName) => {
			document.body.addEventListener(eventName, preventDefaults);
		});
	});

	onUnmounted(() => {
		events.forEach((eventName) => {
			document.body.removeEventListener(eventName, preventDefaults);
		});
	});
</script>

<template>
	<div
		:data-active="active"
		@dragenter.prevent="setActive"
		@dragover.prevent="setActive"
		@dragleave.prevent="setInactive"
		@drop.prevent="onDrop"
		class="h-full w-full bg-[#121212] flex"
	>
		<div class="m-auto">drag image to begin painting</div>
		<slot :dropZoneActive="active" />
	</div>
</template>
