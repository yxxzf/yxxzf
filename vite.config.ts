import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

export default defineConfig(({ command, mode }) => {
    //获取各种环境下的对应的变量
    let env = loadEnv(mode, process.cwd());
    console.log(env.VITE_APP_BASE_API)
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
                    // 使用as *表示将所有转发的变量、mixins等以全局命名空间引入，这样我们就可以直接使用变量而不需要命名空间前缀
                    additionalData: '@use "@/styles/variable.scss" as *;',
                },
            },
        },
        //代理跨域
        server: {
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    //获取数据的服务器地址设置
                    target: env.VITE_SERVE,
                    //需要代理跨域
                    changeOrigin: true,
                    //路径重写
                    rewrite: (path) => path.replace(/^\/api/, ''),
                }
            }
        }
    }
})
