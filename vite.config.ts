import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/submit': {
        target: 'https://tltiysrigsdwqfqygqms.supabase.co',
        changeOrigin: true,
        rewrite: () => '/functions/v1/submit-contact',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsdGl5c3JpZ3Nkd3FmcXlncW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NjQ0NzYsImV4cCI6MjA4OTU0MDQ3Nn0.DxDU8VDH5fnRsb8chTJsfZAw_q6BU1Be4tC5JZ02s7E',
        },
      },
    },
  },
});
