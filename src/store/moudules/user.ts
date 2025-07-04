import { reqLogin } from "@/api/user";
import type { loginForm, loginFormData } from "@/api/user/type";
import { defineStore } from "pinia";
import { ref } from "vue";
import { GET_TOKEN, SET_TOKEN } from "@/utils/token";
import type { userState } from "./types/types";
import { routes } from '@/router/routes'
const useUserStore = defineStore('user', () => {
    // 登录成功返回Token
    const userInfo = ref<userState>({
        token: GET_TOKEN(),
        menuRoutes: routes,//仓库存储生成菜单需要数组(路由)
    });
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

    return {
        login,
        userInfo
    }

})

export default useUserStore;