<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :style="{width: layOutSettingStore.fold ? '50px' : '260px'}">
            <Logo></Logo>
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollBar">
                <!-- 菜单组件 -->
                <el-menu :default-active="$route.path" background-color="#000" text-color="#fff"
                    :collapse="layOutSettingStore.fold">
                    <Menu :menuList="userStore.userInfo.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_right">
            <!-- 顶部导航 -->
            <div class="layout_tabber">
                <Tabbar />
            </div>
            <!-- 内容展示区域 -->
            <div class="layout_main">
                <Main />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { House, FullScreen, Document, Setting } from '@element-plus/icons-vue';
//@ts-ignore
//引入左侧菜单logo子组件
import Logo from './logo/index.vue'
//引入菜单组件
import Menu from './menu/index.vue'
//右侧内容展示区域
import Main from './main/index.vue';
//引入顶部tabbar组件
import Tabbar from './tabbar/index.vue';
//@ts-ignore
import useUserStore from '@/store/moudules/user';

//@ts-ignore
import useLayOutSettingStore from '@/store/moudules/setting';
import { useRoute } from 'vue-router';
const userStore = useUserStore();
const layOutSettingStore = useLayOutSettingStore();
const $route = useRoute();
console.log('route', $route);
</script>
<script lang="ts">
export default {
    name: 'Layout'
}
</script>
<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    display: flex;
    // flex-direction: column;

    .layout_slider {
        width: 260px;
        height: 100vh;
        background: black;
        color: #fff;
        transition: 0.3s;
        .scrollBar {
            width: 100%;
            height: calc(100vh - 50px);

            .el-menu {
                border-right: none;
            }
        }
    }

    .layout_right {
        flex: 1;
        height: 100vh;
        transition: .3s;
        .layout_tabber {
            width: 100%;
            height: 50px;
        }

        .layout_main {
            position: absolute;
            width: 100%;
            height: calc(100vh - 50px);
            background-color: yellowgreen;
            overflow: auto;
            padding: 20px;
        }
    }
}
</style>