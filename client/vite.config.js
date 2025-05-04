import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import jsconfigPaths from "vite-jsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), jsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // your backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
