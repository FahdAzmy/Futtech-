import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    prot: 3000,
  },
  test: {
    environment: "jsdom", // أو استخدام البيئة المناسبة
    globals: true, // إذا كنت تحتاج إلى استخدام globals
  },
  build: {
    outDir: "dist",
  },
});
