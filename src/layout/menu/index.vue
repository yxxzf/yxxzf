<template>
    <div>
        <template v-for="item in menuList">
            <!-- 没有子路由 -->
            <template v-if="!item.meta.hidden">
                <template v-if="!item.children">
                    <el-menu-item :index="item.path" :key="item.path">
                        <template #title>
                            <el-icon>
                                <component :is="item.meta.icon"></component>
                            </el-icon>
                            <span>{{ item.meta.title }}</span>
                        </template>
                    </el-menu-item>
                </template>
            </template>
            <!-- 只有一个子路由 -->
            <template v-if="!item.meta.hidden">
                <template v-if="item.children && item.children.length == 1">
                    <el-menu-item :index="item.children[0].path" :key="item.path">
                        <template #title>
                            <el-icon>
                                <component :is="item.children[0].meta.icon"></component>
                            </el-icon>
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
    </div>
</template>

<script setup lang="ts">
defineProps(['menuList'])
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>
<style scoped lang="scss"></style>