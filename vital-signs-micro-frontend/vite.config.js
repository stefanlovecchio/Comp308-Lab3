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
                './VitalSigns': './src/components/VitalSigns.jsx', 
            },
            shared:  ['react', 'react-dom', '@apollo/client', 'graphql'], 
        }),
    ],
    server: {
        port: 5002, 
        cors: true, 
    },
});
