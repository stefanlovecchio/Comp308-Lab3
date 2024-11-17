import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'shellApp',
            remotes: {
                authMicroFrontend: 'http://localhost:5001/remoteEntry.js', 
            },
            shared: ['react', 'react-dom'], 
        }),
    ],
    server: {
        port: 5173, 
    },
});
