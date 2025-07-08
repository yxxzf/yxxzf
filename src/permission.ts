//路由鉴权:鉴权,项目当中路由能不能被的权限的设置(某一个路由什么条件下可以访问、什么条件下不可以访问)
import router from '@/router/index'
//@ts-ignore
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
import pinia from './store'
import useUserStore from './store/moudules/user'
import settings from './settings'
import { GET_TOKEN } from './utils/token'
// import { GET_TOKEN } from './utils/token'
const userStore = useUserStore(pinia)
router.beforeEach((to: any, from: any) => {
    // console.log(to, from)
    const token = userStore.token
    //获取用户名字
    const username = userStore.user_info.data?.name
    if (token || GET_TOKEN()) {
        if (to.path == '/login') {
        } else {
            //登录成功访问其余六个路由(登录排除)
            //有用户信息
            if (username) {
                //放行
                return 
            } else {
                //如果没有用户信息,在守卫这里发请求获取到了用户信息再放行
                //获取用户信息
                userStore.getUserInfo().then((res) => {
                    console.log(res)
                }).catch((error)=> {
                    //token过期:获取不到用户信息了
                    //用户手动修改本地存储token
                    //退出登录->用户相关的数据清空
                    console.log(error)
                    userStore.userLogout()
                    return ({ path: '/login', query: { redirect: to.path } })
                })
            }
        }
    } else {
        //用户未登录判断
        if (to.path == '/login') {
        } else {
            return ({ path: '/login', query: { redirect: to.path } })
        }
    }
    nprogress.start()
})

router.afterEach((to: any, from: any) => {
    // console.log(to, from)
    document.title = `${settings.title} - ${to.meta.title}`
    nprogress.done()
})

//第一个问题:任意路由切换实现进度条业务 ---nprogress
//第二个问题:路由鉴权(路由组件访问权限的设置)
//全部路由组件:登录|404|任意路由|首页|数据大屏|权限管理(三个子路由)|商品管理(四个子路由)

//用户未登录:可以访问login,其余六个路由不能访问(指向login)
//用户登录成功:不可以访问login[指向首页],其余的路由可以访问