import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';
import type { Plugin } from 'vite';

function copyPublicFilesPlugin(): Plugin {
  return {
    name: 'copy-public-files',
    writeBundle(options) {
      const outDir = options.dir || resolve(__dirname, 'dist');
      const publicDir = resolve(__dirname, 'public');
      const skip = ['3_Generations_Owned copy.webp'];

      function copyDir(src: string, dest: string) {
        const entries = readdirSync(src);
        for (const entry of entries) {
          if (skip.includes(entry)) continue;
          const srcPath = join(src, entry);
          const destPath = join(dest, entry);
          const stat = statSync(srcPath);
          if (stat.isDirectory()) {
            mkdirSync(destPath, { recursive: true });
            copyDir(srcPath, destPath);
          } else {
            try { copyFileSync(srcPath, destPath); } catch {}
          }
        }
      }
      copyDir(publicDir, outDir);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyPublicFilesPlugin()],
  publicDir: false,
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
