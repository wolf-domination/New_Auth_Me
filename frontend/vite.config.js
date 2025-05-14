// frontend/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      failOnError: mode === "production"
    })
  ],
  server: {
    proxy: {
      '/api': 'https://new-auth-me-1.onrender.com'
    },
  }, overrides: [
    {
      files: ["src/context/*.jsx"],
      rules: {
        'react-refresh/only-export-components': 'off'
      }
    }
  ]
}));