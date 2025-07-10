import type { App, Component } from 'vue';
// 引入项目中的全部全局组件
import SvgIcon from './SvgIcon/index.vue';
import Category from './Category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 全局对象
const components: { [name: string]: Component } = { SvgIcon, Category };
export default {
    install(app: App) {
        // 注册全局组件
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        })
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component);
        }
    }
}