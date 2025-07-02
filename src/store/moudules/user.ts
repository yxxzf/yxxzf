import { reqLogin } from "@/api/user";
import type { loginForm } from "@/api/user/type";
import { defineStore } from "pinia";
import { ref } from "vue";
import { ElNotification } from "element-plus";
const useUserStore = defineStore('user', ()=>{
    // 登录成功返回Token
    let token = ref<string>(localStorage.getItem('TOKEN') as string);
    const userInfo = async (data: loginForm)=> {
        let result: any = await reqLogin(data)
        if (result.code == 200) {
            localStorage.setItem('TOKEN', result.data.token);
            ElNotification({
                type: 'success',
                message: '登录成功！'
            })
            return 'ok'
        } else {
            console.log(result)    
            return Promise.reject(new Error(result.data.message))
        }
    }

    return {
        token,
        userInfo
    }

})

export default useUserStore;