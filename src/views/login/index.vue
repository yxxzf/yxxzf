<template>
    <div class="login-container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login_btn" type="primary" :loading="loading" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
// @ts-ignore
import useUserStore from '@/store/moudules/user';
// @ts-ignore
import { getTime } from '@/utils/time';
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '111111' });
let loading = ref(false);
let loginForms = ref();
let userStore = useUserStore();

let $router = useRouter();
let $route = useRoute()


const validatorUserName = (rule: any, value: any, callback: any) => {
    //rule:即为校验规则对象
    //value:即为表单元素文本内容
    //函数:如果符合条件callBack放行通过即为
    //如果不符合条件callBack方法,注入错误提示信息
    console.log(rule)
    if (value.length >= 5) {
        callback();
    } else {
        callback(new Error('账号长度至少五位'));
    }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
    //rule:即为校验规则对象
    //value:即为表单元素文本内容
    //函数:如果符合条件callBack放行通过即为
    //如果不符合条件callBack方法,注入错误提示信息
    console.log(rule)
    if (value.length >= 6) {
        callback();
    } else {
        callback(new Error('密码长度至少六位'));
    }
}
// 登陆系统
const login = async () => {
    //保证全部表单相校验通过再发请求
    await loginForms.value.validate();
    //加载效果:开始加载
    loading.value = true;
    //点击登录按钮以后干什么?
    //通知仓库发登录请求
    //请求成功->首页展示数据的地方
    //请求失败->弹出登录失败信息
    userStore.login(loginForm).then(() => {
        const redirect: any = $route.query.redirect
        console.log(redirect)
        $router.push({path: redirect || '/'});
        ElNotification({
            type: 'success',
            message: '欢迎回来！',
            title: `Hi！${getTime()}好！`
        });
        loading.value = false
    }).catch(error => {
        ElNotification({
            type: 'error',
            message: error.message
        })
        loading.value = false
    });
}

const rules = {
    username: [
        //规则对象属性:
        //required,代表这个字段务必要校验的
        //min:文本长度至少多少位
        //max:文本长度最多多少位
        //message:错误的提示信息
        //trigger:触发校验表单的时机 change->文本发生变化触发校验,blur:失去焦点的时候触发校验规则
        // { required: true, min: 6, max: 10, message: '账号长度至少六位', trigger: 'blur' }
        { trigger: 'change', validator: validatorUserName }
    ],
    password: [
        // { required: true, min: 6, max: 10, message: '密码长度至少六位', trigger: 'blur' }
        { trigger: 'change', validator: validatorPassword }
    ]
}
</script>

<style scoped lang="scss">
.login-container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        top: 30vh;
        width: 80%;
        padding: 40px;
        background: url("@/assets/images/login_form.png") no-repeat;
        background-size: cover;

        h1 {
            font-size: 40px;
            color: white;
        }

        h2 {
            font-size: 20px;
            margin: 20px 0;
            color: white;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>