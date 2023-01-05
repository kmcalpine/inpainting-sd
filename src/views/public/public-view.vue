<script setup lang="ts">
	import Logo from "@/components/logo.vue";
</script>

<template>
	<div class="w-full h-full flex p-20 flex flex-col">
		<Logo class="absolute" />
		<slot />
	</div>
</template>
