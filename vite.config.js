import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' makes every asset path relative, so the site works from any
// address, including https://USERNAME.github.io/REPOSITORY/
export default defineConfig({
  base: './',
  plugins: [react()],
})
