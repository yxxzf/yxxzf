import { createApp } from 'vue';
import App from '@/App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// 清除默认样式
import '@/styles/reset.scss';
import '@/styles/variable.scss';
// @ts-expect-error SVG文件需要配置代码
import 'virtual:svg-icons-register';
import GloalComponent from '@/components/index';
// 引入vue-router
import router from './router';
// 引入仓库
import pinia from './store';
const app = createApp(App);

app.use(ElementPlus, {
    locale: zhCn
});
app.use(router);
app.use(pinia);
app.use(GloalComponent);
// console.log('import.meta.env: ', import.meta.env)
app.mount('#app');
