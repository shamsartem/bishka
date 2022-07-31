import { sveltekit } from '@sveltejs/kit/vite'
import fs from 'node:fs'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
}

export default config
