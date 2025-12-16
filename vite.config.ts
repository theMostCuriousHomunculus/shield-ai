import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({
			addExtensions: true,
			autoCodeSplitting: true,
			generatedRouteTree: './src/routeTree.gen.ts',
			quoteStyle: 'single',
			routeFileIgnorePrefix: '-',
			routesDirectory: './src/routes',
			semicolons: true,
			target: 'react',
		}),
		react(),
		svgr({
			include: ['**/*.svg', '**/*.svg?react'],
			svgrOptions: { icon: true },
		}),
	],
})
