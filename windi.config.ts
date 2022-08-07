import scrollbarPlugin from '@windicss/plugin-scrollbar'
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
	darkMode: 'class',
	plugins: [scrollbarPlugin],
	variants: {
		scrollbar: ['dark', 'rounded'],
	},
})
