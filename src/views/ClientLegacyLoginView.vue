<template>
  <Toast></Toast>

  <div class="min-h-screen flex items-center justify-center">
    <div class="w-[420px] p-8 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <!-- Logo with animation -->
      <div class="text-center mb-8">
        <div class="text-5xl font-black text-gray-900 mb-2 animate-fade-in">GrowServer</div>
        <div class="text-gray-500 animate-fade-in-delay">Welcome back to your account</div>
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
            <label for="growId" class="block text-sm font-medium text-gray-700 mb-1">
              GrowID
            </label>
            <InputText
              id="growId"
              name="growId"
              v-model="initialValues.growId"
              type="text"
              class="w-full p-3 rounded-lg border border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
              placeholder="Enter your GrowID"
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
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <InputText
              id="password"
              name="password"
              v-model="initialValues.password"
              type="password"
              class="w-full p-3 rounded-lg border border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
              placeholder="Enter your password"
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
        </div>

        <div class="flex flex-col space-y-4">
          <button
            type="submit"
            class="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 animate-slide-up-delay-2"
          >
            Sign in
          </button>
          
          <div class="text-center animate-fade-in-delay-2">
            <RouterLink 
              to="/player/login/dashboard/legacy-register"
              class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Don't have an account? 
              <span class="font-semibold">Sign up</span>
            </RouterLink>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Form, type FormSubmitEvent } from "@primevue/forms";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import Toast from "primevue/toast";
import { postValidate } from "@/helpers/fetch-post";

const toastSubmit = useToast();

const zObj = z.object({
  growId: z
    .string()
    .min(5, {
      message: "GrowID must be at least 5 characters.",
    })
    .max(20, {
      message: "GrowID are too long.",
    })
    .refine((v) => !/[!@#$%^&*(),.?":{}|<> ]/.test(v), {
      message: "GrowID are containing special characters.",
    }),
  password: z.string().min(5, {
    message: "Password must contains at least 5 characters long.",
  }),
});

const initialValues = ref<z.infer<typeof zObj>>({
  growId: "",
  password: "",
});

const resolver = ref(zodResolver(zObj));

const onFormSubmit = async (event: FormSubmitEvent) => {
  if (event.valid) {
    const [data, err] = await postValidate<{ token: string }, string>(initialValues.value);

    if (err !== null) {
      toastSubmit.add({ 
        severity: "error", 
        summary: "Authentication Failed", 
        detail: err,
        life: 3000,
        contentStyleClass: "bg-zinc-900 text-white border-l-4 border-red-500"
      });
      return;
    } else {
      const token = data?.token;

      toastSubmit.add({
        severity: "success",
        summary: "Welcome Back!",
        detail: "Your account has been validated successfully.",
        life: 2000,
        contentStyleClass: "bg-zinc-900 text-white border-l-4 border-green-500"
      });

      setTimeout(() => {
        toastSubmit.add({
          severity: "info",
          summary: "Preparing Your World",
          detail: "Connecting to Growtopia servers...",
          life: 2000,
          contentStyleClass: "bg-zinc-900 text-white border-l-4 border-blue-500"
        });
      }, 500);

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
</style>
