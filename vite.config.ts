// import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

//@ts-expect-error https://vite.dev/config/ 
export default ({ command }) => {
    return {
        plugins: [vue(),
        vueDevTools(),
        // SVG图标配置
        createSvgIconsPlugin({
            // Specify the icon folder to be cached
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            // Specify symbolId format
            symbolId: 'icon-[dir]-[name]',
        }),
        viteMockServe({
            enable: command === 'serve',
        }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src') // 相对路径别名配置，使用 @ 代替 src
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // 一直报错。。。
                    javascriptEnabled: true,
                    // additionalData: '@import "./src/styles/variable.scss";',
                    // sass1.8后已经弃用@import，使用@use导入
                    // additionalData: '@use "@/styles/variable.scss";',
                },
            },
        },
    }
}
