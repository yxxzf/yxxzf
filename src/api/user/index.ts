import request from "@/utils/request";
//项目用户相关的请求地址
import type { loginForm, loginFormData, loginResponseData } from './type'
// @ts-expect-error
enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout'
}
//登录接口
export const reqLogin = (data: loginForm) =>
    request.post<any, loginFormData>(API.LOGIN_URL, data);
//获取用户信息

export const reqUserInfo = () =>
    request.get<any, loginResponseData>(API.USERINFO_URL);

//退出登录

// export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)