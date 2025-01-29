<template>
  <SideBarMenu>
    <template #header-name> Search </template>

    <template #content>
      <div
        style="border-color: rgba(255, 255, 255, 0.2)"
        class="rounded-md md:border-[1px] md:w-1/2 w-[80%] m-auto p-4"
      >
        Hello world
      </div>
    </template>
  </SideBarMenu>
</template>

<script lang="ts" setup>
import SideBarMenu from "@/components/SideBarMenu.vue";
</script>
