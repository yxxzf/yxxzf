//路由鉴权:鉴权,项目当中路由能不能被的权限的设置(某一个路由什么条件下可以访问、什么条件下不可以访问)
import router from '@/router/index'
//@ts-ignore
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
router.beforeEach((to: any, from: any)=> {
    nprogress.start()
})

router.afterEach((to: any, from: any)=> {
    nprogress.done()
})