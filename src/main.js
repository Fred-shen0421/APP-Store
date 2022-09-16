import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import csi from './csi'
import i18n from './locales'
import router from './router'
import store from './store'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});

app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(i18n)
app.use(csi)

//掛載app
app.mount('#app')