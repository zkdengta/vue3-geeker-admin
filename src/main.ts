import { createApp } from 'vue'
import App from './App.vue'
// reset style sheet
import "@/styles/reset.scss";
//全局注册Element-Plus组件
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
// // custom element dark(自定义暗黑模式)
// import "@/styles/theme/element-dark.scss";
// // custom element css
// import "@/styles/element.scss";
// vue Router
import router from '@/routers/index';
// // vue i18n
// import I18n from "@/languages/index";
// // pinia store
// import pinia from "@/stores/index";




const app =  createApp(App)

// 注册element Icons组件
Object.keys(Icons).forEach(key =>{
    app.component(key,Icons[key as keyof typeof Icons])
})

app.use(ElementPlus).use(router).mount('#app')
