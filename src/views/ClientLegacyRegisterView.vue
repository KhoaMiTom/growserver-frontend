<template>
  <Toast></Toast>

  <div
    class="flex justify-center absolute top-1/2 left-1/2 mr-[-%50] -translate-x-1/2 -translate-y-1/2"
  >
    <div class="w-[520px] h-auto bg-surface-800 rounded-lg">
      <div class="text-center mt-8 mb-4">
        <div class="font-bold text-2xl">Legacy Register</div>
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
            <div class="flex gap-4 mb-2">
              <div>
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

              <div>
                <label for="name" class="block text-sm font-medium text-surface-200">
                  Full name
                </label>
                <InputText
                  id="name"
                  name="name"
                  v-model="initialValues.name"
                  type="text"
                  class="mt-1 block w-full rounded-md"
                />
                <Message
                  v-if="$form.name?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.name.error?.message }}</Message
                >
              </div>
            </div>

            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-surface-200"> Email </label>
              <InputText
                id="email"
                name="email"
                v-model="initialValues.email"
                type="email"
                class="mt-1 block w-full rounded-md"
              />
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
                $form.email.error?.message
              }}</Message>
            </div>

            <div class="flex gap-4 mb-2">
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

              <div class="mb-4">
                <label for="confirmPassword" class="block text-sm font-medium text-surface-200">
                  Confirm Password
                </label>
                <InputText
                  id="confirmPassword"
                  name="confirmPassword"
                  v-model="initialValues.confirmPassword"
                  type="password"
                  class="mt-1 block w-full rounded-md"
                />
                <Message
                  v-if="$form.confirmPassword?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.confirmPassword.error?.message }}</Message
                >
              </div>
            </div>

            <div class="flex justify-center">
              <button
                type="submit"
                class="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 w-full rounded-md"
              >
                Register
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
import Message from "primevue/message";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import Toast from "primevue/toast";
import { postSignup } from "@/helpers/fetch-post";
import { authClient } from "@/lib/auth-client";

const toastSubmit = useToast();

const zObj = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(30, { message: "Name is too long." }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." })
      .max(20, { message: "Username is too long." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers and underscore",
      }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, {
      message: "Password must contain at least 8 characters.",
    }),
    confirmPassword: z.string().min(5, {
      message: "Password must contain at least 8 characters.",
    }),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

const initialValues = ref<z.infer<typeof zObj>>({
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const resolver = ref(zodResolver(zObj));
const onFormSubmit = async (event: FormSubmitEvent) => {
  if (event.valid) {
    const data = initialValues.value;
    const res = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      username: data.username,
    });
    console.log(res);
    // const [data, err] = await postSignup<{ token: string }, string>(initialValues.value);
    // if (err !== null) {
    //   toastSubmit.add({ severity: "error", summary: err, life: 2000 });
    //   return;
    // } else {
    //   const token = data?.token;
    //   toastSubmit.add({
    //     severity: "success",
    //     summary: "Successfully registered new account!",
    //     life: 2000,
    //   });
    //   toastSubmit.add({
    //     severity: "info",
    //     summary: "Redirecting to growtopia shortly...",
    //     life: 3000,
    //   });
    //   setTimeout(() => {
    //     window.location.href = `/player/growid/login/validate?token=${token}`;
    //   }, 3000);
    // }
  }
};
</script>
