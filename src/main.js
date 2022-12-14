/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import { createApp, markRaw } from 'vue'
import router from './router'
import { createPinia } from 'pinia'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

const pinia = createPinia()
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})

registerPlugins(app)

app.use(router)
app.use(pinia)

app.mount('#app')
