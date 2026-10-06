import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Caminhos relativos: o site funciona tanto em marcel1712.github.io/<repo>/
  // quanto na raiz de um domínio próprio, sem precisar trocar nada aqui.
  base: './',
  plugins: [react()],
})
