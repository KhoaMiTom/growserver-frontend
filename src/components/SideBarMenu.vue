<template>
  <div class="flex gap-4">
    <div
      class="md:flex flex-col justify-between items-center w-auto h-screen p-4 hidden sticky top-0"
    >
      <div class="font-bold text-3xl">G</div>

      <div class="flex flex-col items-center gap-4">
        <template v-for="(item, key) in items[0].items" :key="key">
          <Button
            v-bind="item"
            @click="
              () => {
                if (!checkRoute(item.route as string)) $router.push({ name: item.route });
              }
            "
          ></Button>
        </template>
      </div>
      <div class="flex flex-col items-center gap-4">
        <template v-for="(item, key) in items[1].items" :key="key">
          <Button v-bind="item"></Button>
        </template>
      </div>
    </div>

    <div class="h-full w-full">
      <header class="sticky top-0 flex md:justify-center justify-between items-center p-6">
        <Button as="div" text plain class="font-bold" size="large">
          <slot name="header-name"></slot>
        </Button>
      </header>

      <slot name="content" />

      <Toolbar class="md:!hidden flex fixed bottom-0 left-0 z-50 w-full h-16">
        <template #start>
          <div class="flex gap-x-6">
            <template v-for="(item, key) in items[0].items" :key="key">
              <Button
                :icon="item.icon"
                :plain="item.plain"
                :text="item.text"
                @click="
                  () => {
                    if (!checkRoute(item.route as string)) $router.push({ name: item.route });
                  }
                "
              ></Button>
            </template>
          </div>
        </template>

        <template #center> </template>

        <template #end>
          <div class="flex items-center gap-4">
            <template v-for="(item, key) in items[1].items" :key="key">
              <Button
                :icon="item.icon"
                :as="item.as"
                :href="item.href"
                :url="item.url"
                :target="item.target"
                :rel="item.rel"
                :plain="item.plain"
                :text="item.text"
              ></Button>
            </template>
          </div>
        </template>
      </Toolbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import { ref } from "vue";

const $router = useRouter();
const $route = useRoute();

const items = ref([
  {
    label: "Navigation",
    items: [
      {
        label: "Home",
        route: "dashboard",
        icon: "pi pi-home",
        plain: true,
        text: $route.name !== "dashboard",
        command: () => {
          if (!checkRoute("dashboard")) $router.push({ name: "dashboard" });
        },
      },
      {
        label: "Search",
        route: "search",
        icon: "pi pi-search",
        plain: true,
        text: $route.name !== "search",
        command: () => {
          if (!checkRoute("search")) $router.push({ name: "search" });
        },
      },
      {
        label: "Profile",
        route: "profile",
        icon: "pi pi-user",
        plain: true,
        text: $route.name !== "profile",
        command: () => {
          if (!checkRoute("profile")) $router.push({ name: "profile" });
        },
      },
    ],
  },
  {
    label: "Misc",
    items: [
      {
        label: "Github",
        icon: "pi pi-github",
        as: "a",
        href: "https://github.com/StileDevs/GrowServer",
        url: "https://github.com/StileDevs/GrowServer",
        target: "_blank",
        rel: "noopener",
        plain: true,
        text: true,
      },
      {
        label: "Settings",
        route: "settings",
        icon: "pi pi-bars",
        plain: true,
        text: $route.name !== "settings",
        command: () => {
          if (!checkRoute("settings")) $router.push({ name: "settings" });
        },
      },
    ],
  },
]);

const checkRoute = (route: string) => $route.name === route;
</script>
