import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],build:{rollupOptions:{input:{home:'index.html',catalogo:'catalogo.html'}}},base:process.env.VITE_BASE_PATH || './'});

