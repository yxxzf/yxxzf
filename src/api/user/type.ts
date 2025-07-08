// 登录接口需要携带的参数ts类型
export interface loginForm {
    username: string,
    password: string
}
interface dataType {
    code?: string,
    message?: string
    ok?: boolean
}
// 登录接口返回数据类型
export interface loginFormData {
    code: number,
    data?: string,
    message?: string
    ok?: boolean
}
export interface useInfo extends dataType{
    data:{
        routes:string[],
        buttons:string[],
        roles:string[],
        name:string,
        avatar:string
    }
}
interface user {
    checkUser: useInfo
}
// 定义服务器返回用户相关信息的数据类型
export interface loginResponseData {
    code: number,
    data: user
}