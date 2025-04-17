<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-[400px] bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-slate-700/30 animate-fade-in">
      <!-- Header with Logo -->
      <div class="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-center animate-slide-down">
        <div class="text-4xl font-bold text-white mb-2">GrowServer</div>
        <div class="text-slate-100">Welcome to GrowServer</div>
      </div>

      <div class="p-8 space-y-6">
        <RouterLink to="/player/login/dashboard/legacy-login" class="block">
          <Button 
            label="Login Legacy" 
            icon="pi pi-user" 
            class="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 animate-slide-up"
          />
        </RouterLink>

        <div class="pt-4">
          <RouterLink to="/player/login/dashboard/legacy-register" class="block">
            <Button 
              label="Register Legacy Account" 
              icon="pi pi-user-plus" 
              class="w-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 animate-slide-up"
            />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import Button from "primevue/button";
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-slide-down {
  animation: slideDown 0.5s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}

body {
  background-color: transparent !important;
}
</style>
