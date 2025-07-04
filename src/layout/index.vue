<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollBar">
                <!-- 菜单组件 -->
                <el-menu :default-active="$route.path" background-color="#000" text-color="#fff">
                    <Menu :menuList="userStore.userInfo.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabber">456</div>
        <!-- 内容展示区域 -->
        <div class="layout_main">
            <p style="background-color: red;">我是一个段落</p>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { House, FullScreen, Document, Setting } from '@element-plus/icons-vue';
//@ts-ignore
import Logo from './logo/index.vue';
//@ts-ignore
import Menu from './menu/index.vue';
//@ts-ignore
import useUserStore from '@/store/moudules/user';
import { useRoute } from 'vue-router';
const userStore = useUserStore();
const $route = useRoute();
console.log('route', $route);
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    background: red;

    // display: flex;
    .layout_slider {
        width: 260px;
        height: 100vh;
        background: black;
        color: #fff;

        .scrollBar {
            width: 100%;
            height: calc(100vh - 50px);
            .el-menu {
                border-right: none;
            }
        }
    }

    .layout_tabber {
        width: calc(100% - 260px);
        height: 50px;
        background-color: cyan;
        position: fixed;
        top: 0;
        left: 260px;
    }

    .layout_main {
        position: absolute;
        width: calc(100% - 260px);
        height: calc(100vh - 50px);
        background-color: yellowgreen;
        overflow: auto;
        padding: 20px;
        left: 260px;
        top: 50px
    }
}
</style>