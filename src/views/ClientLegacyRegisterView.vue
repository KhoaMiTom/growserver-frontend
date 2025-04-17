<template>
  <Toast></Toast>

  <div class="min-h-screen flex items-center justify-center">
    <div class="w-[420px] p-8 bg-black rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-zinc-900 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]">
      <!-- Logo with animation -->
      <div class="text-center mb-8">
        <div class="text-5xl font-black text-white mb-2 animate-fade-in">GrowServer</div>
        <div class="text-zinc-500 animate-fade-in-delay">Create your new account</div>
      </div>

      <Form
        v-slot="$form"
        :resolver="resolver"
        :initialValues="initialValues"
        @submit="onFormSubmit"
        class="space-y-6"
      >
        <div class="space-y-4">
          <div class="animate-slide-up">
            <label for="growId" class="block text-sm font-medium text-zinc-400 mb-1">
              GrowID
            </label>
            <InputText
              id="growId"
              name="growId"
              v-model="initialValues.growId"
              type="text"
              class="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all placeholder:text-zinc-600"
              placeholder="Choose your GrowID"
            />
            <Message
              v-if="$form.growId?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="mt-1"
              >{{ $form.growId.error?.message }}</Message
            >
          </div>

          <div class="animate-slide-up-delay">
            <label for="password" class="block text-sm font-medium text-zinc-400 mb-1">
              Password
            </label>
            <InputText
              id="password"
              name="password"
              v-model="initialValues.password"
              type="password"
              class="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all placeholder:text-zinc-600"
              placeholder="Create a password"
            />
            <Message
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="mt-1"
              >{{ $form.password.error?.message }}</Message
            >
          </div>

          <div class="animate-slide-up-delay-2">
            <label for="confirmPassword" class="block text-sm font-medium text-zinc-400 mb-1">
              Confirm Password
            </label>
            <InputText
              id="confirmPassword"
              name="confirmPassword"
              v-model="initialValues.confirmPassword"
              type="password"
              class="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all placeholder:text-zinc-600"
              placeholder="Confirm your password"
            />
            <Message
              v-if="$form.confirmPassword?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="mt-1"
              >{{ $form.confirmPassword.error?.message }}</Message
            >
          </div>
        </div>

        <div class="flex flex-col space-y-4">
          <button
            type="submit"
            class="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-2 focus:ring-offset-black animate-slide-up-delay-3"
          >
            Create account
          </button>
          
          <div class="text-center animate-fade-in-delay-2">
            <RouterLink 
              to="/player/login/dashboard/legacy-login"
              class="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Already have an account? 
              <span class="font-semibold">Sign in</span>
            </RouterLink>
          </div>
        </div>
      </Form>
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

.animate-fade-in-delay-2 {
  animation: fadeIn 0.5s ease-out 0.8s forwards;
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

.animate-slide-up-delay-2 {
  animation: slideUp 0.5s ease-out 0.8s forwards;
  opacity: 0;
}

.animate-slide-up-delay-3 {
  animation: slideUp 0.5s ease-out 1s forwards;
  opacity: 0;
}
</style>
