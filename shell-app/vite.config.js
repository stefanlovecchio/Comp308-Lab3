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
            shared: ['react', 'react-dom'], 
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
