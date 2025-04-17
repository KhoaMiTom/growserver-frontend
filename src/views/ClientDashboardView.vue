<template>
  <div class="min-h-screen flex items-center justify-center select-none">
    <div class="w-[420px] p-8 bg-black rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-zinc-900 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]">
      <!-- Logo with animation -->
      <div class="text-center mb-8">
        <div class="text-5xl font-black text-white mb-2 animate-fade-in">GrowServer</div>
        <div class="text-zinc-500 animate-fade-in-delay">Choose your login method</div>
      </div>

      <div class="space-y-4">
        <RouterLink to="/player/login/dashboard/legacy-login" class="block">
          <Button 
            label="Sign in with GrowID" 
            icon="pi pi-user" 
            class="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-2 focus:ring-offset-black animate-slide-up"
          />
        </RouterLink>

        <div class="pt-4">
          <RouterLink to="/player/login/dashboard/legacy-register" class="block">
            <Button 
              label="Create new account" 
              icon="pi pi-user-plus" 
              class="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-2 focus:ring-offset-black animate-slide-up-delay"
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

// Prevent right click
document.addEventListener('contextmenu', event => event.preventDefault());

// Prevent keyboard shortcuts for copy
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
    e.preventDefault();
  }
});
</script>

<style>
/* Prevent text selection */
* {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

body {
  background-color: transparent !important;
}

/* Custom Toast Styling */
:deep(.p-toast) {
  @apply font-sans;
}

:deep(.p-toast-message) {
  @apply bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg;
}

:deep(.p-toast-message-content) {
  @apply text-white p-4;
}

:deep(.p-toast-message-icon) {
  @apply text-white;
}

:deep(.p-toast-message-text) {
  @apply text-white;
}

:deep(.p-toast-summary) {
  @apply font-semibold;
}

:deep(.p-toast-detail) {
  @apply text-zinc-300;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fadeIn 0.5s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out 0.4s forwards;
  opacity: 0;
}

.animate-slide-up-delay {
  animation: slideUp 0.5s ease-out 0.6s forwards;
  opacity: 0;
}
</style>
