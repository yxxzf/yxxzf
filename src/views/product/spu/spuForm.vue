<template>
    <el-form ref="formRef" v-model="spuForm" label-width="75" label-position="left">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称" v-model="spuForm.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select placeholder="请你选择品牌" v-model="spuForm.tmId" style="width: 200px;">
                <el-option v-for="item in AllTradeMark" :value="item.id" :label="item.tmName"
                    :key="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input v-model="spuForm.description" type="textarea" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="SPU照片">
            <!-- eslint-disable-next-line vue/no-v-model-argument -->
            <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <el-dialog title="照片预览" v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width:100%;height: 100%;" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性" label-width="100">
            <!-- @ts-ignore -->
            <el-select :placeholder="unSelectedAttr.length > 0 ? `还有 ${unSelectedAttr.length}项选择` : '暂无数据可选'"
                v-model="saleAttrIdAndValueName" style="width: 200px;">
                <el-option v-for="item in unSelectedAttr" :value="`${item.id}:${item.name}`" :label="item.name"
                    :key="item.id"></el-option>
            </el-select>
            <el-button @click="addSaleAttr" type="primary" icon="Plus" style="margin-left: 10px;"
                :disabled="!saleAttrIdAndValueName">添加销售属性</el-button>
            <!-- table展示销售属性与属性值的地方 -->
            <el-table border style="margin:10px 0px" :data="saleAttr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值">
                    <!-- row:即为当前SPU已有的销售属性对象 -->
                    <template #default="{ row }">
                        <el-tag style="margin:0px 5px" @close="row.spuSaleAttrValueList.splice(index, 1)"
                            :type="statusList[Math.floor(Math.random() * 5)]"
                            v-for="(item, index) in row.spuSaleAttrValueList" :key="index" closable>
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-input @blur="toLook(row)" v-model="row.saleAttrValue" v-if="row.flag == true"
                            placeholder="请你输入属性值" size="small" style="width:100px"></el-input>
                        <el-button @click="toEdit(row)" v-else type="primary" size="small" icon="Plus"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #default="{ row, $index }">
                        <el-button type="danger" size="small" icon="Delete" :class="row"
                            @click="saleAttr.splice($index, 1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item label-width="100">
            <el-button :disabled="saleAttr.length > 0 ? false : true" type="primary" @click="save">保存</el-button>
            <el-button @click="$emit('update:scene', 0)">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
//@ts-ignore
import { reqAddOrUpdateSpu, reqAllSaleAttr, reqAllTradeMark, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu';
//@ts-ignore
import type { AllTradeMark, HasSaleAttr, HasSaleAttrResponseData, SaleAttr, SaleAttrResponseData, SpuData, SpuHasImg, SpuImg, Trademark } from '@/api/product/spu/type';
//@ts-ignore
import { mockAllSaleList, mockHasSaleList, mockImgList, trademarkList } from '@/store/moudules/mock_data';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
let formRef = ref()
defineProps(['scene'])
let $emits = defineEmits(['update:scene', 'change'])
let spuForm = ref<SpuData>({
    category3Id: "",//收集三级分类的ID
    spuName: "",//SPU的名字
    description: "",//SPU的描述
    tmId: '',//品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
})
//存储已有的SPU这些数据
let AllTradeMark = ref<Trademark[]>([]);
//商品图片
let imgList = ref<SpuImg[]>([]);
// 照片预览
let dialogVisible = ref<boolean>(false)
// 预览照片地址
let dialogImageUrl = ref<string>('')
//已有的SPU销售属性
let saleAttr = ref<SaleAttr[]>([]);
//全部销售属性
let allSaleAttr = ref<HasSaleAttr[]>([]);
//将来收集还未选择的销售属性的ID与属性值的名字
let saleAttrIdAndValueName = ref<string>('')
// 未选销售属性
let unSelectedAttr = computed(() => {
    return allSaleAttr.value.filter(item => {
        return saleAttr.value.every(item1 => item.name != item1.saleAttrName)
    })
})
const statusList = ['primary', 'warning', 'danger', 'success', 'info']
// 预览照片
const handlePictureCardPreview = (file: any) => {
    console.log(file)
    dialogVisible.value = true
    dialogImageUrl.value = file.url
}
//照片墙删除文件钩子
const handleRemove = () => {
    console.log(123);
}
//照片钱上传成功之前的钩子约束文件的大小与类型
const handlerUpload = (file: any) => {
    if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
        if (file.size / 1024 / 1024 < 3) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件务必小于3M'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件务必PNG|JPG|GIF'
        })
        return false;
    }
}
const initSpuForm = async (spu: SpuData) => {
    //存储已有的SPU对象,将来在模板中展示
    spuForm.value = spu;
    //spu:即为父组件传递过来的已有的SPU对象[不完整],使用预存数据
    //获取全部品牌的数据
    //@ts-ignore
    let result: AllTradeMark = false ? await reqAllTradeMark() : trademarkList;
    //获取某一个品牌旗下全部售卖商品的图片
    let result1: SpuHasImg = false ? await reqSpuImageList((spu.id as number)) : mockImgList;
    imgList.value = result1.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
    //获取已有的SPU销售属性的数据
    let result2: SaleAttrResponseData = false ? await reqSpuHasSaleAttr((spu.id as number)) : mockHasSaleList;
    //获取整个项目全部SPU的销售属性
    let result3: HasSaleAttrResponseData = false ? await reqAllSaleAttr() : mockAllSaleList;
    //存储全部品牌的数据
    AllTradeMark.value = result.data;
    console.log(result2, result1, result3)
    //存储已有的SPU的销售属性
    saleAttr.value = result2.data;
    //存储全部的销售属性
    allSaleAttr.value = result3.data;
}

//添加一个新的SPU初始化请求方法
const initAddSpu = async (c3Id: number | string) => {
    //清空数据
    Object.assign(spuForm.value, {
        category3Id: "",//收集三级分类的ID
        spuName: "",//SPU的名字
        description: "",//SPU的描述
        tmId: '',//品牌的ID
        spuImageList: [],
        spuSaleAttrList: [],
    })
    //清空照片
    imgList.value = []
    //清空销售属性
    saleAttr.value = []
    saleAttrIdAndValueName.value = ''
    spuForm.value.category3Id = c3Id
    //获取全部品牌的数据
    //@ts-ignore
    let result: AllTradeMark = false ? await reqAllTradeMark() : trademarkList
    //获取整个项目全部SPU的销售属性
    let result1: HasSaleAttrResponseData = false ? await reqAllSaleAttr() : mockAllSaleList
    //存储全部品牌的数据
    AllTradeMark.value = result.data;
    //存储全部的销售属性
    allSaleAttr.value = result1.data;

}

//添加销售属性的方法
const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
    let newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    saleAttr.value.push(newSaleAttr)
    saleAttrIdAndValueName.value = ''
}

//属性值按钮的点击事件
const toEdit = (row: SaleAttr) => {
    //点击按钮的时候,input组件不就不出来->编辑模式
    row.flag = true;
    row.saleAttrValue = ''
}

//表单元素失却焦点的事件回调
const toLook = (row: SaleAttr) => {
    //整理收集的属性的ID与属性值的名字
    const { baseSaleAttrId, saleAttrValue, saleAttrName, } = row
    //整理成服务器需要的属性值形式
    const newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        saleAttrValueName: saleAttrValue as string
    }
    if (saleAttrValue!.trim().length == 0) {
        ElMessage({
            type: 'error',
            message: '属性名不能为空'
        })
        return
    }

    const repeat = row.spuSaleAttrValueList.find(item => item.saleAttrValueName == saleAttrValue)
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性名不能重复'
        })
        return
    }
    row.spuSaleAttrValueList.push(newSaleAttr)
    //切换为查看模式
    row.flag = false;
}
//保存按钮的回调
const save = async () => {
    //整理参数
    //发请求:添加SPU|更新已有的SPU
    //成功
    //失败
    //1:照片墙的数据
    spuForm.value.spuImageList = imgList.value.map((item: any) => {
        return {
            imgName: item.name,//图片的名字
            imgUrl: (item.response && item.response.data) || item.url
        }
    });
    //2:整理销售属性的数据
    spuForm.value.spuSaleAttrList = saleAttr.value;
    console.log(spuForm.value)
    let result = await reqAddOrUpdateSpu(spuForm.value);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: spuForm.value.id ? '更新成功' : '添加成功'
        })
        //通知父组件切换场景为0
        $emits('update:scene', 0);
        $emits('change', spuForm.value.id ? 'update' : 'add')
    } else {
        ElMessage({
            type: 'success',
            message: spuForm.value.id ? '更新成功' : '添加成功'
        })
        //通知父组件切换场景为0
        $emits('update:scene', 0);
    }


}
defineExpose({ initSpuForm, initAddSpu })
</script>
<script lang="ts">
export default {
    name: 'SpuForm'
}
</script>
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>