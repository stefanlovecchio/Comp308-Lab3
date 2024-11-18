import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'vitalSignsMicroFrontend',
            filename: 'remoteEntry.js', 
            exposes: {
                './VitalSigns': './main.jsx', 
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
        port: 5002, 
        cors: true, 
    },
});
