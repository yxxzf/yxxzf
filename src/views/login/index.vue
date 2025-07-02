<template>
    <div class="login-container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm">

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
                        <el-button class="login_btn" type="primary" :loading="loading"
                        size="default" @click="login">登录</el-button>
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref} from 'vue';
import {User, Lock} from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
// @ts-ignore
import useUserStore from '@/store/moudules/user';
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '111111' });
let loading = ref(false);
let userStore = useUserStore();

let $router = useRouter();
// 登陆系统
const login = ()=> {
    //加载效果:开始加载
    loading.value = true;
    //点击登录按钮以后干什么?
    //通知仓库发登录请求
    //请求成功->首页展示数据的地方
    //请求失败->弹出登录失败信息
    userStore.userInfo(loginForm).then( () => {
        
        $router.push('/');
        loading.value = false
    }).catch( error => {
        ElNotification({
                type: 'error',
                message: error.message
            })
        loading.value = false
    });
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