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
shared: {
    react: {
      singleton: true,
      requiredVersion: '^18.0.0',
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '^18.0.0',
    },
    '@apollo/client': {
      singleton: true,
      requiredVersion: '^3.0.0', // Adjust to match your version
    },
    graphql: {
      singleton: true,
      requiredVersion: '^16.0.0', // Adjust to match your version
    },
  },
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
