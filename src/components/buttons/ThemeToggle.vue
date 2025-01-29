<template>
  <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
</template>

<script setup lang="ts">
import Button from "primevue/button";
function toggleDarkMode() {
  document.documentElement.classList.toggle("my-app-dark");
}
</script>
