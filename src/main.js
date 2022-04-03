import { createApp } from '../modules/vue'
import App from './App.vue'

const app = createApp(App);

console.log(app);
app.mount('#app');