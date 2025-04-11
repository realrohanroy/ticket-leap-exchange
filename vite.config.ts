
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8080,
    // Removed HTTPS configuration to use standard HTTP for development
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
