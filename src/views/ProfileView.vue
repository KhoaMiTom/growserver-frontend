<template>
  <SideBarMenu>
    <template #header-name> Profile </template>

    <template #content>
      <div
        style="border-color: rgba(255, 255, 255, 0.2)"
        class="rounded-md md:border-[1px] md:w-[70%] w-[100%] m-auto"
      >
        <div class="flex flex-col gap-y-6 p-6">
          <div class="flex flex-wrap gap-6 items-center">
            <Avatar
              image="https://avatars.githubusercontent.com/u/48410066?v=4"
              class=""
              shape="circle"
              size="xlarge"
            />
            <div>
              <h1 class="font-bold text-3xl">JadlionHD</h1>
              <p>jadlionhd</p>
            </div>
          </div>

          <div>Orang ngoding & Tohok fan</div>
        </div>

        <div
          style="border-color: rgba(255, 255, 255, 0.2)"
          class="flex flex-col justify-center items-center border-t-[1px] h-screen"
        >
          <div class="text-gray-200">Nothing to see here :p</div>
        </div>
      </div>
      <FooterMenu />
    </template>
  </SideBarMenu>
</template>

<script lang="ts" setup>
import Avatar from "primevue/avatar";
import SideBarMenu from "@/components/SideBarMenu.vue";
import FooterMenu from "@/components/FooterMenu.vue";
</script>
