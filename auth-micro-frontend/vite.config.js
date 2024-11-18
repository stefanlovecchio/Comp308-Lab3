import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'authMicroFrontend',
            filename: 'remoteEntry.js', 
            exposes: {
                './AuthApp': './main.jsx', 
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
        port: 5001, 
        cors: true, 
    },
});
