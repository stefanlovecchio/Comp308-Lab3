import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react(),
        federation({
            remotes: {
                authMicroFrontend: 'http://localhost:5001/remoteEntry.js', 
                vitalSignsMicroFrontend: 'http://localhost:5002/remoteEntry.js', 
            },
            shared: {
    react: {
      singleton: true, // Use only one version
      requiredVersion: '^18.0.0',
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '^18.0.0',
    },
  },
        }),
    ],
    server: {
        port: 5173, 
    },
    build: {
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
    },
});
