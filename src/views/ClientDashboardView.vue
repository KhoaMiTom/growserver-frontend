<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-4xl w-full mx-4 bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10">
      <!-- Header -->
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 z-10"></div>
        <div class="absolute inset-0 bg-[url('/src/assets/images/game-banner.jpg')] bg-cover bg-center"></div>
        <div class="relative z-20 px-8 py-16 text-center">
          <h1 class="text-5xl font-bold text-white mb-4 animate-fade-in">
            OldGrow
          </h1>
          <p class="text-lg text-gray-200 max-w-xl mx-auto animate-fade-in-up">
            You miss old Growtopia?
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="grid md:grid-cols-2 gap-6 p-8">
        <!-- Login Section -->
        <div class="space-y-4 animate-fade-in-up" style="animation-delay: 0.2s">
          <h2 class="text-2xl font-semibold text-white mb-6">Already have an account?</h2>
          <RouterLink 
            to="/player/login/dashboard/legacy-login"
            class="group block"
          >
            <button class="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl p-4 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-violet-600/50 flex items-center justify-center space-x-3">
              <span class="text-lg font-medium">Login</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </RouterLink>
        </div>

        <!-- Register Section -->
        <div class="space-y-4 animate-fade-in-up" style="animation-delay: 0.4s">
          <h2 class="text-2xl font-semibold text-white mb-6">New to OldGrow?</h2>
          <RouterLink 
            to="/player/login/dashboard/legacy-register"
            class="group block"
          >
            <button class="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-xl p-4 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-fuchsia-600/50 flex items-center justify-center space-x-3">
              <span class="text-lg font-medium">Create Account</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </RouterLink>
        </div>
      </div>

      <!-- Discord Section -->
      <div class="border-t border-white/10 p-8">
        <a 
          href="https://discord.gg/3pwkCF7vTN" 
          target="_blank"
          class="block bg-[#5865F2] hover:bg-[#4752C4] text-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl group animate-fade-in-up"
          style="animation-delay: 0.6s"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <svg class="w-8 h-8 fill-current" viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
                <g>
                  <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="currentColor" fill-rule="nonzero">
                  </path>
                </g>
              </svg>
              <div>
                <h3 class="text-xl font-semibold mb-1">Join our Discord Community</h3>
                <p class="text-blue-100">Connect with players, get support, and stay updated!</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
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
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}
</style>

