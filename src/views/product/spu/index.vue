<template>
    <div>
        <Category :scene="!scene" />
        <el-card style="margin:10px 0px">
            <!-- v-if|v-show:都可以实现显示与隐藏 -->
            <div v-show="scene == 0">
                <el-button type="primary" icon="Plus" @click="addSpu" :disabled="!categoryStore.c3Id">添加SPU</el-button>
                <!-- 展示已有SPU数据 -->
                <el-table style="margin: 10px 0;" border :data="records">
                    <el-table-column label="序号" type="index" align="center" width="80" />
                    <el-table-column label="SPU名称" prop="spuName" />
                    <el-table-column label="SPU描述" show-overflow-tooltip prop="description" />
                    <el-table-column label="SPU操作">
                        <template #default="{ row }">
                            <el-button type="primary" size="small" icon="Plus" title="添加SKU"
                                @click="addSku()"></el-button>
                            <el-button type="warning" size="small" icon="Edit" title="修改SKU"
                                @click="updateSpu(row)"></el-button>
                            <el-button type="info" size="small" icon="View" title="查看SKU"
                                @click="viewSku(row)"></el-button>
                            <el-popconfirm :title="`你确定删除${row.spuName}?`" icon="Warning" width="200px"
                                @confirm="deleteSpu(row)">
                                <template #reference>
                                    <el-button type="danger" size="small" icon="Delete" title="删除SKU"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- eslint-disable-next-line vue/no-v-model-argument -->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                    :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
            </div>
            <!-- eslint-disable-next-line vue/no-v-model-argument -->
            <SpuForm v-show="scene == 1" v-model:scene="scene" @change="changeScene" ref="spu"></SpuForm>
            <SkuForm v-show="scene == 2"></SkuForm>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import SkuForm from './skuForm.vue';
import SpuForm from './spuForm.vue';
//@ts-ignore
import { reqHasSpu } from '@/api/product/spu';
//@ts-ignore
import type { HasSpuResponseData, SpuData } from '@/api/product/spu/type';
//@ts-ignore
import type { Records } from '@/api/product/spu/type';
//@ts-ignore
import { useCategoryStore } from '@/store/moudules/category';
import { ref, watch } from 'vue';

let categoryStore = useCategoryStore()
let pageNo = ref<number>(1)
let pageSize = ref<number>(7)
let total = ref<number>(100)
// 切换场景
let scene = ref<number>(0)
//存储已有的SPU的数据
let records = ref<Records>([]);
// spuForm
let spu = ref()

//监听三级分类ID变化
watch(() => categoryStore.c3Id, () => {
    //当三级分类发生变化的时候清空对应的数据
    records.value = [];
    //务必保证有三级分类ID
    if (!categoryStore.c3Id) return
    getHasSpu()
})
// 监听页码数和每页条数变化
watch(() => pageNo.value, () => getHasSpu(pageNo.value))
watch(() => pageSize.value, () => getHasSpu())
//此方法执行:可以获取某一个三级分类下全部的已有的SPU
const getHasSpu = async (pager = 1) => {

    let result: HasSpuResponseData = await reqHasSpu(pager, pageSize.value, categoryStore.c3Id);
    console.log(result)
    if (result.code == 200) {
        records.value = result.data.records
        total.value = result.data.total
    }

}//子组件SpuForm绑定自定义事件:目前是让子组件通知父组件切换场景为0
const changeScene = (method: string) => {

    if (method == 'update') {
        //更新留在当前页
        getHasSpu(pageNo.value);
    } else {
        //添加留在第一页
        getHasSpu();
    }
}
//添加新的SPU按钮的回调
const addSpu = () => {
    //切换为场景1:添加与修改已有SPU结构->SpuForm
    scene.value = 1;
    //点击添加SPU按钮,调用子组件的方法初始化数据
    spu.value.initAddSpu(categoryStore.c3Id);
}
//修改已有的SPU的按钮的回调
const updateSpu = (row: SpuData) => {
    scene.value = 1
    spu.value.initSpuForm(row)
}
//添加skU数据
const addSku = () => {

}
//查看SKU列表的数据
const viewSku = (row: SpuData) => {

}
//删除已有的SPU按钮的回调
const deleteSpu = (row: SpuData) => {

}
</script>

<style scoped></style>