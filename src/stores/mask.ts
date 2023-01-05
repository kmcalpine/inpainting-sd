import { ref } from "vue";
import { defineStore } from "pinia";

export const useMaskStore = defineStore("mask", () => {
	const mask = ref("");
	return { mask };
});
