import type { App, Component } from 'vue';
// 引入项目中的全部全局组件
import SvgIcon from './SvgIcon/index.vue';
// 全局对象
const components: { [name: string]: Component } = { SvgIcon };
export default {
    install(app: App) {
        // 注册全局组件
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        })
    }
}