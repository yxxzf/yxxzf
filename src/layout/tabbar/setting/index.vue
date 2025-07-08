<template>
    <div class="setting">
        <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
        <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
        <el-button size="small" icon="Setting" circle></el-button>
        <img :src="useStore.user_info.data?.avatar" alt="" style="height: 24px;width: 24px;margin: 0 10px; border-radius: 50%;">
        <!-- 下拉菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                {{ useStore.user_info.data?.name }}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="layout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
//@ts-ignore
import useLayOutSettingStore from '@/store/moudules/setting';
//@ts-ignore
import useUserStore from '@/store/moudules/user';
const layOutSettingStore = useLayOutSettingStore()
const useStore = useUserStore()
//刷新按钮点击回调
const updateRefsh = () => {
    layOutSettingStore.refresh = !layOutSettingStore.refresh;
};
//全屏按钮点击的回调
const fullScreen = () => {
    //DOM对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
    let full = document.fullscreenElement;
    //切换为全屏模式
    if (!full) {
        //文档根节点的方法requestFullscreen,实现全屏模式
        document.documentElement.requestFullscreen();
    } else {
        //变为不是全屏模式->退出全屏模式
        document.exitFullscreen();
    }
}
// tuichu
const layout = ()=> {
    useStore.userLogout()
}
</script>
<script lang="ts">
export default {
    name: 'Setting'
}
</script>
<style scoped>
.setting {
    display: flex;
    align-items: center;
}
</style>