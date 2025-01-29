import { createAuthClient } from "better-auth/vue";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.BASE_URL,
  plugins: [usernameClient()],
});
