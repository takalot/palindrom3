import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/palindrom3/',          // ← חובה! שם ה-repository שלך בדיוק
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
});
