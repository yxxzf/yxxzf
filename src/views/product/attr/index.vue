<template>
    <div>
        <Category :scene="scene" />
        <el-card style="margin: 10px 0;">
            <div v-show="scene">
                <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id"
                    @click="addAttr">添加属性</el-button>
                <el-table border style="margin:10px 0px" :data="!categoryStore.c3Id ? attrInfoList.data : attrArr">
                    <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
                    <el-table-column label="属性名称" align="center" width="120" prop="attrName"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #default="{ row }">
                            <el-tag style="margin:5px" v-for="item in row.attrValueList" :key="item.id"
                                :type="statusList[Math.floor(Math.random() * 5)]">{{ item.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120">
                        <template #default="{ row }">
                            <el-button type="warning" icon="Edit" size="small" @click="updateAttr(row)"></el-button>
                            <el-popconfirm :title="`您是否确认删除属性${row.attrName}`" @confirm="removeattr(row.id)">
                                <template #reference>
                                    <el-button type="danger" icon="Delete" size="small"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="!scene">
                <!-- 展示添加属性与修改数据的结构 -->
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请你输入属性名称" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button @click="addAttrValue" :disabled="!attrParams.attrName" type="primary" size="default"
                    icon="Plus">添加属性值</el-button>
                <el-button size="default" @click="scene = !scene">取消</el-button>
                <el-table border style="margin:10px 0px" :data="attrParams.attrValueList">
                    <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
                    <el-table-column label="属性值名称">
                        <!-- row:即为当前属性值对象 -->
                        <template #default="{ row, $index }">
                            <!-- eslint-disable-next-line vue/no-parsing-error -->
                            <el-input :ref="(vc: any)=> inputArr[$index] = vc" v-if="row.flag" size="small" placeholder="请你输入属性值名称" @blur="toLook(row, $index)"
                                v-model="row.valueName"></el-input>
                            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作">
                        <template #default="{ row, index }">
                            <el-button type="danger" size="small" icon="Delete" :class="row.valueName"
                                @click="attrParams.attrValueList.splice(index, 1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save"
                    :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
                <el-button size="default" @click="scene = !scene">取消</el-button>
            </div>
        </el-card>

    </div>
</template>

<script setup lang="ts">
//@ts-ignore
import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from '@/api/product/attr';
//@ts-ignore
import type { Attr, AttrList, AttrResponseData, AttrValue } from '@/api/product/attr/type';
//@ts-ignore
import { useCategoryStore } from '@/store/moudules/category'
//@ts-ignore
import { attrInfoList } from '@/store/moudules/mock_data';
import { ElMessage } from 'element-plus';
import { nextTick, ref, watch } from 'vue';
let categoryStore = useCategoryStore()
let attrArr = ref<AttrList>([])
//准备一个数组:将来存储对应的组件实例el-input
let inputArr = ref<any>([])
// 属性参数
let attrParams = ref<Attr>({
    attrName: "",//新增的属性的名字
    attrValueList: [//新增的属性值数组
    ],
    categoryId: '',//三级分类的ID
    categoryLevel: 3,//代表的是三级分类
})
//定义card组件内容切换变量
let scene = ref<boolean>(true);//scene=0,显示table,scene=1,展示添加与修改属性结构
const statusList = ['primary', 'warning', 'danger', 'success', 'info']
// 根据三级属性变化获取属性列表
watch(() => categoryStore.c3Id, () => {
    //清空上一次查询的属性与属性值
    console.log('c3Id', categoryStore.c3Id)
    attrArr.value = [];
    //保证三级分类得有才能发请求
    if (!categoryStore.c3Id) return;
    getAttr()
})
// 查询属性列表
const getAttr = async () => {
    //获取分类的ID
    const { c1Id, c2Id, c3Id } = categoryStore;
    //获取分类下的已有的属性与属性值
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
    if (result.code == 200) {
        attrArr.value = result.data;
    }
}
// 添加属性
const addAttr = () => {
    scene.value = false
    //每一次点击的时候,先清空一下数据再收集数据
    Object.assign(attrParams, {
        attrName: "",//新增的属性的名字
        attrValueList: [//新增的属性值数组
        ],
        categoryId: categoryStore.c3Id,//三级分类的ID
        categoryLevel: 3,//代表的是三级分类
    })
}
//添加属性值按钮的回调
const addAttrValue = () => {
    //点击添加属性值按钮的时候,向数组添加一个属性值对象
    attrParams.value.attrValueList.push({
        valueName: '',
        flag: true,//控制每一个属性值编辑模式与切换模式的切换
    });
    nextTick( ()=> {
        inputArr.value[attrParams.value.attrValueList.length - 1].focus()
    })
}
//table表格修改已有属性按钮的回调
const updateAttr = (row: Attr) => {
    //切换为添加与修改属性的结构
    scene.value = false;
    //将已有的属性对象赋值给attrParams对象即为
    //ES6->Object.assign进行对象的合并
    console.log(row)
    Object.assign(attrParams.value, JSON.parse(JSON.stringify(row)));
}
// 删除某个属性的信息
const removeattr = async (attrId: number) => {
    //发相应的删除已有的属性的请求
    let result: any = await reqRemoveAttr(attrId);
    //删除成功
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        //获取一次已有的属性与属性值
        //获取分类的ID
        getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}
//属性值表单元素失却焦点事件回调
const toLook = (row: AttrValue, index: number)=> {
    // 添加的属性值不能为空
    if (row.valueName.trim().length == 0) {
        //删除调用对应属性值为空的元素
        attrParams.value.attrValueList.splice(index, 1)
        //提示信息
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return;
    }
    // 添加的属性值不能重复
    const repeat = attrParams.value.attrValueList.find( item => (item != row && item.valueName == row.valueName))
    console.log(repeat)
    if (repeat) {
        //将重复的属性值从数组当中干掉
        attrParams.value.attrValueList.splice(index, 1);
        //提示信息
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
        return;
    }
    //相应的属性值对象flag:变为false,展示div
    row.flag = false
}

//属性值div点击事件
const toEdit = (row: AttrValue, index: number) => {
    //相应的属性值对象flag:变为true,展示input
    row.flag = true;
    //nextTick:响应式数据发生变化,获取更新的DOM(组件实例)
    nextTick(() => {
        inputArr.value[index].focus();
    })

}

//保存按钮的回调
const save = async () => {
    //发请求
    //@ts-ignore
    let result: any = await reqAddOrUpdateAttr(attrParams.value);
    //添加属性|修改已有的属性已经成功
    if (result.code == 200) {
        //切换场景
        scene.value = true;
        //提示信息
        ElMessage({
            type: 'success',
            message: attrParams.value.id ? '修改成功' : '添加成功'
        });
        //获取全部已有的属性与属性值
        //获取分类的ID
        getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: attrParams.value.id ? '修改失败' : '添加失败'
        })
    }
}

</script>
<script lang="ts">
export default {
    name: 'Attr'
}
</script>
<style scoped></style>