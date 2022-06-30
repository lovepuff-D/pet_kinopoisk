import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from '@/components'
import FloatingVue from 'floating-vue'
import loader from "vue-ui-preloader";


const app = createApp(App)

//Для глбальнй регистрации UI компонентв
components.forEach(component => {
    app.component(component.name, component)
})


app
    .use(store)
    .use(router)
    .use(FloatingVue)
    .use(loader)
    .mount('#app')
