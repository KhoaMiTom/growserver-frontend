<template>
  <Toast></Toast>

  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-4xl w-full mx-4 bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10">
      <div class="grid md:grid-cols-2">
        <!-- Left side - Game Banner -->
        <div class="relative hidden md:block">
          <div class="absolute inset-0 bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 z-10"></div>
          <div class="absolute inset-0 bg-[url('/src/assets/images/game-banner.jpg')] bg-cover bg-center"></div>
          <div class="relative z-20 h-full flex flex-col items-center justify-center p-8 text-center">
            <h1 class="text-4xl font-bold text-white mb-4 animate-fade-in">Welcome to OldGrow!</h1>
          </div>
        </div>

        <!-- Right side - Register Form -->
        <div class="p-8 md:p-12">
          <div class="mb-8 md:hidden text-center">
          </div>

          <Form
            v-slot="$form"
            :resolver="resolver"
            :initialValues="initialValues"
            @submit="onFormSubmit"
            class="space-y-6"
          >
            <div class="space-y-4">
              <div class="animate-fade-in-up" style="animation-delay: 0.1s">
                <label class="block text-sm font-medium text-gray-300 mb-1.5">
                  GrowID
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <InputText
                    id="growId"
                    name="growId"
                    v-model="initialValues.growId"
                    type="text"
                    class="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                    placeholder="Choose your GrowID"
                  />
                </div>
                <Message
                  v-if="$form.growId?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="mt-1.5 animate-fade-in"
                  >{{ $form.growId.error?.message }}</Message
                >
              </div>

              <div class="animate-fade-in-up" style="animation-delay: 0.2s">
                <label class="block text-sm font-medium text-gray-300 mb-1.5">
                  Password
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <InputText
                    id="password"
                    name="password"
                    v-model="initialValues.password"
                    type="password"
                    class="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                    placeholder="Create a password"
                  />
                </div>
                <Message
                  v-if="$form.password?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="mt-1.5 animate-fade-in"
                  >{{ $form.password.error?.message }}</Message
                >
              </div>

              <div class="animate-fade-in-up" style="animation-delay: 0.3s">
                <label class="block text-sm font-medium text-gray-300 mb-1.5">
                  Confirm Password
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <InputText
                    id="confirmPassword"
                    name="confirmPassword"
                    v-model="initialValues.confirmPassword"
                    type="password"
                    class="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                    placeholder="Confirm your password"
                  />
                </div>
                <Message
                  v-if="$form.confirmPassword?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="mt-1.5 animate-fade-in"
                  >{{ $form.confirmPassword.error?.message }}</Message
                >
              </div>
            </div>

            <div class="flex flex-col space-y-4">
              <button
                type="submit"
                class="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-violet-600/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 animate-fade-in-up"
                style="animation-delay: 0.4s"
              >
                Create Account
              </button>

              <div class="flex items-center justify-center space-x-2 text-sm animate-fade-in-up" style="animation-delay: 0.5s">
                <span class="text-gray-400">Already have an account?</span>
                <RouterLink 
                  to="/player/login/dashboard/legacy-login"
                  class="text-violet-400 hover:text-violet-300 font-medium transition-colors"
                >
                  Login here
                </RouterLink>
              </div>
            </div>
          </Form>

          <!-- Discord Section -->
          <div class="mt-8 pt-8 border-t border-white/10">
            <a 
              href="https://discord.gg/3pwkCF7vTN" 
              target="_blank"
              class="block bg-[#5865F2] hover:bg-[#4752C4] text-white p-4 rounded-xl shadow-lg transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl group animate-fade-in-up"
              style="animation-delay: 0.6s"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <svg class="w-6 h-6 fill-current" viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
                    <g>
                      <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="currentColor" fill-rule="nonzero">
                      </path>
                    </g>
                  </svg>
                  <div>
                    <h3 class="text-sm font-semibold">Join our Discord</h3>
                    <p class="text-xs text-blue-100">Get support & connect with players</p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Form, type FormSubmitEvent } from "@primevue/forms";
import Message from "primevue/message";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import Toast from "primevue/toast";
import { postSignup } from "@/helpers/fetch-post";

const toastSubmit = useToast();

const zObj = z
  .object({
    growId: z
      .string()
      .min(5, { message: "GrowID must be at least 5 characters." })
      .max(20, { message: "GrowID is too long." })
      .refine((v) => !/[!@#$%^&*(),.?":{}|<> ]/.test(v), {
        message: "GrowID contains special characters.",
      }),
    password: z.string().min(5, {
      message: "Password must contain at least 5 characters.",
    }),
    confirmPassword: z.string().min(5, {
      message: "Password must contain at least 5 characters.",
    }),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

const initialValues = ref<z.infer<typeof zObj>>({
  growId: "",
  password: "",
  confirmPassword: "",
});

const resolver = ref(zodResolver(zObj));

const onFormSubmit = async (event: FormSubmitEvent) => {
  if (event.valid) {
    const [data, err] = await postSignup<{ token: string }, string>(initialValues.value);

    if (err !== null) {
      toastSubmit.add({ severity: "error", summary: err, life: 2000 });
      return;
    } else {
      const token = data?.token;

      toastSubmit.add({
        severity: "success",
        summary: "Successfully registered new account!",
        life: 2000,
      });
      toastSubmit.add({
        severity: "info",
        summary: "Redirecting to growtopia shortly...",
        life: 3000,
      });

      setTimeout(() => {
        window.location.href = `/player/growid/login/validate?token=${token}`;
      }, 3000);
    }
  }
};
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
