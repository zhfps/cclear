import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
/**
 * adapter
 */
const config = {
  kit: {
    adapter: adapter()
  },
  preprocess: vitePreprocess()
}
export default config