import { ref } from "vue";
import { defineStore } from "pinia";

export const useSidebarState = defineStore("sidebar-state", () => {
  const isOpen = ref(false);

  function toggle() {
    isOpen.value = !isOpen.value;
  }

  return { isOpen, toggle };
});
