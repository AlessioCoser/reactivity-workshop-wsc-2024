import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  esbuild: {
    jsxImportSource: path.resolve(__dirname, '../../src/jsx'),
    jsx: 'automatic'
  }
})
