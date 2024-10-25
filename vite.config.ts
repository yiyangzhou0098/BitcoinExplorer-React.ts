import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	server: { 
    host: '0.0.0.0',  // This binds the dev server to all available network interfaces
    port: 5173 ,
    proxy: { 
      '/api': { 
        target: 'http://localhost:3030', }, }, }, });
