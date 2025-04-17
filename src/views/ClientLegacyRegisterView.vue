<template>
  <Toast></Toast>

  <div class="min-h-screen flex items-center justify-center">
    <div class="w-[400px] bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-slate-700/30 animate-fade-in">
      <!-- Header with Logo -->
      <div class="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-center animate-slide-down">
        <div class="text-4xl font-bold text-white mb-2">GrowServer</div>
        <div class="text-slate-100">Legacy Register</div>
      </div>

      <div class="p-8">
        <Form
          v-slot="$form"
          :resolver="resolver"
          :initialValues="initialValues"
          @submit="onFormSubmit"
          class="space-y-6"
        >
          <div class="space-y-4">
            <div class="animate-slide-up" style="animation-delay: 0.1s">
              <label for="growId" class="block text-sm font-medium text-slate-200 mb-1">
                GrowID
              </label>
              <InputText
                id="growId"
                name="growId"
                v-model="initialValues.growId"
                type="text"
                class="w-full p-3 rounded-lg bg-slate-700/50 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Choose your GrowID"
              />
              <Message
                v-if="$form.growId?.invalid"
                severity="error"
                size="small"
                variant="simple"
                class="mt-1 animate-fade-in"
                >{{ $form.growId.error?.message }}</Message
              >
            </div>

            <div class="animate-slide-up" style="animation-delay: 0.2s">
              <label for="password" class="block text-sm font-medium text-slate-200 mb-1">
                Password
              </label>
              <InputText
                id="password"
                name="password"
                v-model="initialValues.password"
                type="password"
                class="w-full p-3 rounded-lg bg-slate-700/50 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Create a password"
              />
              <Message
                v-if="$form.password?.invalid"
                severity="error"
                size="small"
                variant="simple"
                class="mt-1 animate-fade-in"
                >{{ $form.password.error?.message }}</Message
              >
            </div>

            <div class="animate-slide-up" style="animation-delay: 0.3s">
              <label for="confirmPassword" class="block text-sm font-medium text-slate-200 mb-1">
                Confirm Password
              </label>
              <InputText
                id="confirmPassword"
                name="confirmPassword"
                v-model="initialValues.confirmPassword"
                type="password"
                class="w-full p-3 rounded-lg bg-slate-700/50 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Confirm your password"
              />
              <Message
                v-if="$form.confirmPassword?.invalid"
                severity="error"
                size="small"
                variant="simple"
                class="mt-1 animate-fade-in"
                >{{ $form.confirmPassword.error?.message }}</Message
              >
            </div>
          </div>

          <div class="flex flex-col space-y-4">
            <button
              type="submit"
              class="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 animate-slide-up"
              style="animation-delay: 0.4s"
            >
              Register
            </button>
            
            <RouterLink 
              to="/player/login/dashboard/legacy-login"
              class="text-center text-slate-300 hover:text-slate-100 transition-colors animate-slide-up"
              style="animation-delay: 0.5s"
            >
              Already have an account? Login here
            </RouterLink>
          </div>
        </Form>
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
</style>
