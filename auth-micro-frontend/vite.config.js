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
                './AuthApp': './src/App.jsx', 
                './Signup': './src/components/Signup.jsx', 
                './Login': './src/components/Login.jsx',
                './Logout': './src/components/Logout.jsx',
            },
            shared: ['react', 'react-dom'], 
        }),
    ],
    build: {
        target: 'esnext', 
        minify: false,
        cssCodeSplit: false,
    },
});
