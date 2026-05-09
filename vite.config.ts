import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // If your Nitro config is handled via the TanStack Start plugin 
    // inside this wrapper, we pass it here:
    nitro: {
      compatibilityDate: '2026-05-09'
    }
  }
});
