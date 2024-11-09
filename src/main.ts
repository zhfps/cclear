import { mount } from 'svelte'
import App from './App.svelte'
import './app.css'
import './styles/index.scss'

const app = mount(App, {
  target: document.getElementById('app')!
})

export default app
