// 登录接口需要携带的参数ts类型
export interface loginForm {
    username: string,
    password: string
}
interface dataType {
    token?: string,
    message?: string
}
// 登录接口返回数据类型
export interface loginFormData {
    code: number,
    data: dataType
}
interface useInfo {
    userId: number,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string,
}
interface user {
    checkUser: useInfo
}
// 定义服务器返回用户相关信息的数据类型
export interface loginResponseData {
    code: number,
    data: user
}