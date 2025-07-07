<template>
    <div class="breadcrumb">
        <!-- 顶部左侧静态 -->
        <el-icon style="margin-right:10px" @click="foldMenu">
            <component :is="layOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
        </el-icon>
        <!-- 左侧面包屑 -->
        <el-breadcrumb separator-icon="ArrowRight">
            <!-- 面包动态展示路由名字与标题 -->
            <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title"
                :to="item.path">
                <!-- 图标 -->
                <el-icon style="vertical-align: middle;">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <!-- 面包屑展示匹配路由的标题 -->
                <span>{{ item.meta.title }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
//@ts-ignore
import useLayOutSettingStore from '@/store/moudules/setting';
const layOutSettingStore = useLayOutSettingStore();

const foldMenu = ()=> {
    layOutSettingStore.fold = !layOutSettingStore.fold
}
</script>
<script lang="ts">
export default {
    name: 'Breadcrumb'
}
</script>
<style scoped lang="scss">
.breadcrumb {
    display: flex;
    align-items: center;
}
</style>