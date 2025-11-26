import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // REPLACE 'repo-name' WITH YOUR GITHUB REPOSITORY NAME
  // Example: base: '/anuchamath-portfolio/',
  base: '/repo-name/', 
})