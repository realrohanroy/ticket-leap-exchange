import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { readFileSync } from "fs";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    https: {
      key: readFileSync(resolve(__dirname, 'localhost+2-key.pem')),
      cert: readFileSync(resolve(__dirname, 'localhost+2.pem'))
    },
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
