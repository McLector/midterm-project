import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "studyspot.local", // <-- change this to your preferred URL
    port: 5173
  }
});
