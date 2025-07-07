// 进行axios的二次封装，利用它的请求与响应拦截器
import axios from "axios";
import { ElMessage } from "element-plus";
import { GET_TOKEN } from "./token";
//利用axios的create方法，创建axios实例（其他的配置）
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // 基础请求路径带上api
    timeout: 5000 // 超时时间设置
})
//请求拦截器
request.interceptors.request.use(config => {
    // config配置对象，header属性请求头，给服务器携带公共参数
    // 返回配置对象
    if(GET_TOKEN()){
        config.headers.token = GET_TOKEN();
    }
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    // 成功回调，简化数据
    return response.data;
}, (error) => {
    //失败回调：处理网络错误
    let msg = '';
    const status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});
export default request;