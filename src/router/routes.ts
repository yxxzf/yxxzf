//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const routes = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',//菜单标题
            hidden: true//代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
            // icon: "Promotion",//菜单文字左侧的图标,支持element-plus全部图标
        }
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        redirect: '/home',
        meta: {
            title: 'layout',
            hidden: false
        },
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                name: 'home',
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: false,
            icon: 'DocumentDelete'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: false,
            icon: 'DataLine'
        }
    }
]