//商品分类全局组件的小仓库
import { defineStore } from "pinia";
import { ref } from 'vue'
import { category1, category2, category3 } from "./mock_data";
import { reqC1, reqC2 } from "@/api/product/attr";
import type { CategoryObj, CategoryResponseData } from "@/api/product/attr/type";


export const useCategoryStore = defineStore('category', () => {
    //存储一级分类的数据
    let c1Attr = ref<CategoryObj[]>(category1.data)
    // 存储一级分类的id
    let c1Id = ref<number | string>('')
    //存储二级分类的数据
    let c2Attr = ref<CategoryObj[]>(category2.data)
    // 存储二级分类的id
    let c2Id = ref<number | string>('')
    //存储二级分类的数据
    let c3Attr = ref<CategoryObj[]>(category3.data)
    // 存储二级分类的id
    let c3Id = ref<number | string>('')

    // 获取一级分类的数据
    const getCategory1 = async () => {
        const result: CategoryResponseData = await reqC1()
        if (result.code == 200) {
            c1Attr.value = result.data
        } else {
            return Promise.reject(new Error(result.message))
        }
    }
    // 获取二级分类的数据
    const getCategory2 = async () => {
        const result: CategoryResponseData = await reqC2(c1Id.value as number)
        if (result.code == 200) {
            c2Attr.value = result.data
        } else {
            return Promise.reject(new Error(result.message))
        }
    }
    // 获取三级分类的数据
    const getCategory3 = async () => {
        const result: CategoryResponseData = await reqC2(c2Id.value as number)
        if (result.code == 200) {
            c3Attr.value = result.data
        } else {
            return Promise.reject(new Error(result.message))
        }
    }

    // 清空数据
    const clearCategoryId = () => {
        c1Id.value = '';
        c2Id.value = '';
        c3Id.value = '';
    }


    return {
        c1Attr,
        c1Id,
        c2Attr,
        c2Id,
        c3Attr,
        c3Id,
        getCategory1,
        getCategory2,
        getCategory3,
        clearCategoryId
    }
})