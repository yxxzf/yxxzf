import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import type { loginForm, loginFormData } from "@/api/user/type";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import type { userState } from "./types/types";
import { routes } from '@/router/routes'
// import { useRouter, useRoute } from 'vue-router'

const useUserStore = defineStore('user', () => {
    // 登录成功返回Token
    const userInfo = reactive<userState>({
        token: GET_TOKEN(),
        menuRoutes: routes,//仓库存储生成菜单需要数组(路由)
    });
    let token = ref<string>(GET_TOKEN() as string);

    const user_info = reactive<any>({
        data: {
            name: '',
            avatar: '',
            buttons: []
        }
    });
    const login = async (data: loginForm) => {
        const result: loginFormData = await reqLogin(data);
        if (result.code == 200) {
            SET_TOKEN(result.data as string);
            return result;
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
    //获取用户信息方法
    const getUserInfo = async () => {
        //获取用户信息进行存储仓库当中[用户头像、名字]
        const result: any = await reqUserInfo()
        //如果获取用户信息成功，存储一下用户信息
        if (result.code == 200) {
            user_info.data.name = result.data.name
            user_info.data.avatar = result.data.avatar
            user_info.data.buttons = result.data.buttons
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
            return result
        } else {
            // return Promise.reject(new Error(result.data.message))
        }
    }
    const userLogout = async () => {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        //退出登录请求
        let result: any = await reqLogout();
        console.log('logout：', result)
        if (result.code == 200) {
            userInfo.token = ''
            token.value = ''
            user_info.data.name = ''
            user_info.data.avatar = ''
            REMOVE_TOKEN()
        } else {
            return Promise.reject(new Error(result.message))
        }


    }

    return {
        login,
        userInfo,
        user_info,
        getUserInfo,
        userLogout,
        token
    }

})

export default useUserStore;