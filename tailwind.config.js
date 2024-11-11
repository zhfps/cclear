/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        height: {
          'screen-40': 'calc(100vh - 40px)',
          'screen-60': 'calc(100vh - 60px)',
        }
      }
    },
    plugins: []
  }