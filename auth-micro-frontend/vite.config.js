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
                './App': './src/App.jsx',
            },
            shared: ['react', 'react-dom', '@apollo/client', 'graphql'],

        }),
    ],
    server: {
        port: 5001,
        cors: {
            origin: '*',
        },
    },
});
