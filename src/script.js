import './style.css'
import WebGLApp from './components/WebGLApp'

const app = new WebGLApp({selectors: {canvasSelector: 'canvas.webgl', regionTitleSelector: 'region-title'}})
app.render()