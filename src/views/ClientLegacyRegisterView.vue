<template>
  <Toast></Toast>

  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
    <div class="w-[400px] bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-slate-700/30">
      <!-- Header with Logo -->
      <div class="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-center">
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
            <div>
              <label for="growId" class="block text-sm font-medium text-slate-200 mb-1">
                GrowID
              </label>
              <InputText
                id="growId"
                name="growId"
                v-model="initialValues.growId"
                type="text"
                class="w-full p-3 rounded-lg bg-slate-700/50 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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

            <div>
              <label for="password" class="block text-sm font-medium text-slate-200 mb-1">
                Password
              </label>
              <InputText
                id="password"
                name="password"
                v-model="initialValues.password"
                type="password"
                class="w-full p-3 rounded-lg bg-slate-700/50 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-slate-200 mb-1">
                Confirm Password
              </label>
              <InputText
                id="confirmPassword"
                name="confirmPassword"
                v-model="initialValues.confirmPassword"
                type="password"
                class="w-full p-3 rounded-lg bg-slate-700/50 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              class="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Register
            </button>
            
            <RouterLink 
              to="/player/login/dashboard/legacy-login"
              class="text-center text-slate-300 hover:text-slate-100 transition-colors"
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
