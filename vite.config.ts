import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/tanakh-palindrome-finder/',  // <-- שנה לשם ה-repository שלך בדיוק! (כולל הסלאש בסוף וההתחלה)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
});
