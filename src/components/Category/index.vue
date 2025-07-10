<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select v-model="categoryStore.c1Id" style="width: 150px;" placeholder="" @change="handler" :disabled="!scene">
                    <el-option v-for="item in categoryStore.c1Attr" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="categoryStore.c2Id" style="width: 150px;" placeholder=""  @change="handler1" :disabled="!scene">
                    <el-option v-for="item in categoryStore.c2Attr" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="categoryStore.c3Id" style="width: 150px;" placeholder="" :disabled="!scene">
                    <el-option v-for="item in categoryStore.c3Attr" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
//@ts-ignore
import { useCategoryStore } from '@/store/moudules/category';
const categoryStore = useCategoryStore()
// 获取场景
defineProps(['scene'])
//分类全局组件挂载完毕,通知仓库发请求获取一级分类的数
onMounted( ()=> {
    console.log(categoryStore.c1Attr)
    // 手动清空下拉框里数据
    // categoryStore.c2Id = '';
    // categoryStore.c1Id = '';
    // categoryStore.c3Id = '';
    //通知仓库获取一级分类的方法
    categoryStore.getCategory1()
})
// 清空下拉框的值
onBeforeUnmount( ()=> {
    categoryStore.clearCategoryId()
})
//此方法即为一级分类下拉菜单的change事件(选中值的时候会触发,保证一级分类ID有了)
const handler = ()=> {
    //需要将二级、三级分类的数据清空
    categoryStore.c2Id = ''
    categoryStore.c3Attr = []
    categoryStore.c3Id = ''
    //通知仓库获取二级分类的数据
    categoryStore.getCategory2()
}
//此方法即为二级分类下拉菜单的change事件(选中值的时候会触发,保证二级分类ID有了)
const handler1 = ()=> {
    //清理三级分类的数据
    categoryStore.c3Id = ''
    //通知仓库获取三级分类的数据
    categoryStore.getCategory3()
}

</script>
<script lang="ts">
export default {
    name: 'Category'
}
</script>
<style scoped></style>