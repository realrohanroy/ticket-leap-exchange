
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
    strictPort: true,
    allowedHosts: ["f2cc2b83-a2fe-4463-86dd-5d502f519bbd.lovableproject.com"],
  },
  base: mode === 'production' ? '/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: mode !== 'production',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
}));
