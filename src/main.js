import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from '@/components/UI'
import FloatingVue from 'floating-vue'

const app = createApp(App)

//Для глбальнй регистрации UI компонентв
components.forEach(component => {
    app.component(component.name, component)
})


app
    .use(store)
    .use(router)
    .use(FloatingVue)
    .mount('#app')
