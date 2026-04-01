import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/hooks/use-mobile": path.resolve(__dirname, "./src/Ganchos/use-mobile.tsx"),
      "@/hooks/use-toast": path.resolve(__dirname, "./src/Ganchos/use-toast.ts"),
      "@/assets": path.resolve(__dirname, "./src/Activos"),
    },
  },
});
