
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  server: {
    host: "::",
    port: 8080,
    // Removed HTTPS configuration to use standard HTTP for development
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
}));
