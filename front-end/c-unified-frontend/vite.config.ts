import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@features': path.resolve(__dirname, './src/features'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@stores': path.resolve(__dirname, './src/stores'),
        '@api': path.resolve(__dirname, './src/api'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@contexts': path.resolve(__dirname, './src/contexts'),
        '@shared': path.resolve(__dirname, '../shared'),
      },
    },
    server: {
      port: 3000,
      host: true,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'router': ['react-router-dom'],
            'state': ['zustand'],
            'query': ['@tanstack/react-query'],
            'product': ['./src/features/product'],
            'cart': ['./src/features/cart'],
            'order': ['./src/features/order'],
            'user': ['./src/features/user'],
          },
        },
      },
    },
  };
});
