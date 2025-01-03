import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [solidPlugin(), basicSsl()],
  server: {
    https: true, // Enables HTTPS for Vite
    port: 3000,  // Default port for Vite
  },
  resolve: {
    alias: {
      '@livekit/client': '/node_modules/@livekit/client',
    },
  }
});
