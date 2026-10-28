import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { reveal } from './directives/reveal'
import { count } from './directives/count'
import { imgFade } from './directives/imgFade'
import { tilt } from './directives/tilt'
import { magnetic } from './directives/magnetic'
import { parallax } from './directives/parallax'

import './styles/tokens.css'
import './styles/base.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('reveal', reveal)
app.directive('count', count)
app.directive('img-fade', imgFade)
app.directive('tilt', tilt)
app.directive('magnetic', magnetic)
app.directive('parallax', parallax)

app.mount('#app')
