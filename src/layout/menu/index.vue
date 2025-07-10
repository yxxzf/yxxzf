<template>
    <!-- eslint-disable-next-line vue/no-multiple-template-root -->
    <template v-for="item in menuList">
        <!-- 没有子路由 -->
        <template v-if="!item.meta.hidden">
            <template v-if="!item.children">
                <el-menu-item :index="item.path" :key="item.path" @click="goRoute">
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <template #title>
                        <span>{{ item.meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>
        </template>
        <!-- 只有一个子路由 -->
        <template v-if="!item.meta.hidden">
            <template v-if="item.children && item.children.length == 1">
                <el-menu-item :index="item.children[0].path" :key="item.path" @click="goRoute">
                    <el-icon>
                        <component :is="item.children[0].meta.icon"></component>
                    </el-icon>
                    <template #title>
                        <span>{{ item.children[0].meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>
        </template>
        <!-- 多个子路由 -->
        <template v-if="!item.meta.hidden">
            <template v-if="item.children && item.children.length > 1">
                <el-sub-menu :index="item.path" :key="item.path">
                    <template #title>
                        <el-icon>
                            <component :is="item.meta.icon"></component>
                        </el-icon>
                        <span>{{ item.meta.title }}</span>
                    </template>
                    <Menu :menuList="item.children"></Menu>
                </el-sub-menu>
            </template>
        </template>
    </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'


defineProps(['menuList'])
const $router = useRouter()

const goRoute = (vc: any) => {
    $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>
<style scoped lang="scss"></style>