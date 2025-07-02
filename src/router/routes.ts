//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const routes = [
        {
            path: '/login',
            component: () => import('@/views/login/index.vue'),
            name: 'login'
        },
        {
            path: '/',
            component: () => import('@/views/home/index.vue'),
            name: 'home'
        },
        {
            path: '/404',
            component: () => import('@/views/404/index.vue'),
            name: '404'
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/404',
            name: 'Any'
        }
    ]