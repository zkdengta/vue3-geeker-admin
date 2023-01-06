import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//全局注册Element-Plus组件
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";

const app =  createApp(App)

// 注册element Icons组件
Object.keys(Icons).forEach(key =>{
    app.component(key,Icons[key as keyof typeof Icons])
})

app.use(ElementPlus).mount('#app')
