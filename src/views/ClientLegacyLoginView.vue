<template>
  <Toast></Toast>

  <div
    class="flex justify-center absolute top-1/2 left-1/2 mr-[-%50] -translate-x-1/2 -translate-y-1/2"
  >
    <div class="w-[400px] h-auto bg-surface-800 rounded-md">
      <div class="text-center mt-8 mb-4">
        <div class="font-bold text-2xl">Legacy Login</div>
      </div>

      <div class="flex justify-center flex-row">
        <Form
          v-slot="$form"
          :resolver="resolver"
          :initialValues="initialValues"
          @submit="onFormSubmit"
          class="w-full px-8"
        >
          <div class="p-4">
            <div class="mb-4">
              <label for="username" class="block text-sm font-medium text-surface-200">
                Username
              </label>
              <InputText
                id="username"
                name="username"
                v-model="initialValues.username"
                type="text"
                class="mt-1 block w-full rounded-md"
              />
              <Message
                v-if="$form.username?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.username.error?.message }}</Message
              >
            </div>

            <div class="mb-4">
              <label for="password" class="block text-sm font-medium text-surface-200">
                Password
              </label>
              <InputText
                id="password"
                name="password"
                v-model="initialValues.password"
                type="password"
                class="mt-1 block w-full rounded-md"
              />
              <Message
                v-if="$form.password?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.password.error?.message }}</Message
              >
            </div>

            <div class="flex justify-center">
              <button
                type="submit"
                class="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 w-full rounded-md"
              >
                Login
              </button>
            </div>
          </div>
        </Form>
      </div>
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
import { authClient } from "@/lib/auth-client";
import { useFetch } from "@vueuse/core";

const toastSubmit = useToast();

const zObj = z.object({
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters.",
    })
    .max(20, {
      message: "Username are too long.",
    })
    .refine((v) => !/[!@#$%^&*(),.?":{}|<> ]/.test(v), {
      message: "Username are containing special characters.",
    }),
  password: z.string().min(5, {
    message: "Password must contains at least 5 characters long.",
  }),
});

const initialValues = ref<z.infer<typeof zObj>>({
  username: "",
  password: "",
});

const resolver = ref(zodResolver(zObj));

const onFormSubmit = async (event: FormSubmitEvent) => {
  if (event.valid) {
    const dataSubmit = initialValues.value;
    await authClient.signIn.username(
      {
        username: dataSubmit.username,
        password: dataSubmit.password,
      },
      {
        onError: (err) => {
          toastSubmit.add({
            severity: "error",
            summary: `Error occured:\n${err.error.status} (${err.error.statusText})\n${err.error.message}\n${err.error.code}`,
            life: 5000,
          });
        },
        onSuccess: () => {
          toastSubmit.add({
            severity: "success",
            summary: "Successfully logged in!",
            life: 2000,
          });
          toastSubmit.add({
            severity: "info",
            summary: "Redirecting to growtopia shortly...",
            life: 3000,
          });

          // setTimeout(() => {
          //   window.location.href = `/player/growid/login/validate?token=${data.token}`;
          // }, 3000);
        },
      },
    );
  }
};
</script>
