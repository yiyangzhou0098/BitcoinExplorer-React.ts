import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	server: { 
    host: '::',  // This binds the dev server to all available network interfaces
    port: 5173 ,
    proxy: { 
      '/api': { 
        target: 'http://bc-backend-service:3030', }, }, }, });
