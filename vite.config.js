import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    // Ensures assets are loaded relative to the HTML file
    base: './',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                customize: resolve(__dirname, 'customize.html'),
            },
        },
    },
})
