import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import HomePage from './components/HomePage.vue';
import Redirect from './components/Redirect.vue';

import './style.css'

const routes = [
    {path: '/', component: HomePage},
    {path: '/:redirectId', component: Redirect}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App);

app.use(router)


app.mount("#app")
