import { reqLogin, reqUserInfo } from "@/api/user";
import type { loginForm, loginFormData, useInfo } from "@/api/user/type";
import { defineStore } from "pinia";
import { ref } from "vue";
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import type { userState } from "./types/types";
import { routes } from '@/router/routes'
import { useRouter, useRoute } from 'vue-router'

const useUserStore = defineStore('user', () => {
    // 登录成功返回Token
    const userInfo = ref<userState>({
        token: GET_TOKEN(),
        menuRoutes: routes,//仓库存储生成菜单需要数组(路由)
    });
    const $router = useRouter()
    const $route = useRoute()
    const user_info = ref<useInfo>({} as useInfo);
    const login = async (data: loginForm) => {
        const result: loginFormData = await reqLogin(data);
        if (result.code == 200) {
            SET_TOKEN(result.data.token as string);
            return 'ok';
        } else {
            console.log(result);
            return Promise.reject(new Error(result.data.message));
        }
    }
    //获取用户信息方法
    const getUserInfo = async () => {
        //获取用户信息进行存储仓库当中[用户头像、名字]
        const result: any = await reqUserInfo()
        //如果获取用户信息成功，存储一下用户信息
        if (result.code == 200) {
            user_info.value.username = result.data.checkUser.username
            user_info.value.avatar = result.data.checkUser.avatar
            user_info.value.buttons = result.data.checkUser.buttons
            console.log(result.data, user_info)
            // //计算当前用户需要展示的异步路由
            // const userAsyncRoute = filterAsyncRoute(
            //     cloneDeep(asnycRoute),
            //     result.data.routes,
            // )
            //菜单需要的数据整理完毕
            // this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
            //     //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
            //     ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
            //         router.addRoute(route)
            //     })
            return 'ok'
        } else {
            return Promise.reject(new Error(result.data.message))
        }
    }
    const userLogout = () => {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        user_info.value.token = ''
        user_info.value.username = ''
        user_info.value.avatar = ''
        REMOVE_TOKEN()
        $router.replace({ path: '/login', query: { redirect: $route.path } })
    }

    return {
        login,
        userInfo,
        user_info,
        getUserInfo,
        userLogout
    }

})

export default useUserStore;