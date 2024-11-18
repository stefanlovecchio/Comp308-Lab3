import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react(),
        federation({
            remotes: {
                authMicroFrontend: 'authMicroFrontend@http://localhost:5001/remoteEntry.js',
                vitalSignsMicroFrontend: 'vitalSignsMicroFrontend@http://localhost:5002/remoteEntry.js',
            },
            shared: ['react', 'react-dom', '@apollo/client', 'graphql'],
        }),
    ],
    server: {
        port: 5173, 
        cors: true,
    },
    build: {
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
    },
});
