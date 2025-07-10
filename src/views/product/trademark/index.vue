<template>
    <div class="trademark">
        <!-- 卡片顶部添加品牌按钮 -->
        <el-card class="box-card">
            <el-button type="primary" icon="Plus" @click="addTrademark">添加品牌</el-button>
            <!-- 表格组件：用于展示已有得平台数据 -->
            <!-- table:---border:可以设置表格纵向是否有边框
                table-column:---label:某一个列表 ---width:设置这列宽度 ---align:设置这一列对齐方式    
            -->
            <el-table border style="margin: 10px 0;" :data="trademarkList">
                <el-table-column label="序号" align="center" width="80px" type="index"></el-table-column>
                <el-table-column prop="tmName" label="品牌名称"></el-table-column>
                <el-table-column label="品牌LOGO">
                    <template #default="{ row }">
                        <!-- row.logoUrl -->
                        <img :src="row.logoUrl" :alt="row.logoUrl" style="width:100px;height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #default="{ row }">
                        <!-- 仅用于消除报红 -->
                        {{ !row ? row : '' }}
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                        <el-popconfirm :title="`您确认删除品牌${row.tmName}吗?`" width="220"
                        icon="Delete" @confirm="deleteTrademark(row.id)">
                            <template #reference>
                                <el-button type="danger" size="small" icon="delete" ></el-button>
                            </template>
                        </el-popconfirm>         
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器组件
                pagination->
                v-model:current-page:设置分页器当前页码
                v-model:page-size:设置每一个展示数据条数
                page-sizes:用于设置下拉菜单数据
                background:设置分页器按钮的背景颜色
                layout:可以设置分页器六个子组件布局调整
            -->
            <!-- eslint-disable-next-line vue/no-v-model-argument -->
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                size="default" :background="true" layout="prev, pager, next, ->, sizes, total" :total="total"
                @size-change="sizeChange" @current-change="getHasTrademark" />
        </el-card>
        <!-- 对话框组件:在添加品牌与修改已有品牌的业务时候使用结构 -->
        <!-- 
            v-model:属性用户控制对话框的显示与隐藏的 true显示 false隐藏
            title:设置对话框左上角标题
        -->
        <el-dialog v-model="dialogFormVisible" :title="!trademarkParams.id ? '添加品牌' : '修改品牌'">
            <el-form style="width: 80%;" :rules="rules" :model="trademarkParams" ref="formRef">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input v-model="trademarkParams.tmName" placeholder="请输入品牌名称" autocomplete="off" />
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirm">
                        提交
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
//@ts-ignore
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark'
//@ts-ignore
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { onMounted, ref, reactive, nextTick } from 'vue'
let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
// 已有品牌总数
let total = ref<number>(200)
// 品牌表单
let formRef = ref()
// 获取已有品牌数据
let trademarkList = ref<Records>([])
//定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
let dialogFormVisible = ref<boolean>(false)

onMounted(() => {
    getHasTrademark()
})
// @ts-ignore获取已有品牌的接口
const getHasTrademark = async (pager = 1) => {
    //当前页码
    currentPage.value = pager;
    let result: TradeMarkResponseData = await reqHasTrademark(currentPage.value, pageSize.value)
    //@ts-ignore
    trademarkList.value = result.data.records
    total.value = result.data.total
    console.log(result)
}

//当下拉菜单发生变化的时候触发次方法
//这个自定义事件,分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
    //当前每一页的数据量发生变化的时候，当前页码归1
    getHasTrademark();
}

// 添加品牌
const addTrademark = () => {
    dialogFormVisible.value = true

    //清空收集数据
    trademarkParams.id = 0;
    trademarkParams.tmName = '';
    trademarkParams.logoUrl = '';
    //第一种写法:ts的问号语法
    console.log('@@@', formRef.value)
    // formRef.value?.clearValidate('tmName');
    // formRef.value?.clearValidate('logoUrl');
    nextTick(() => {
        formRef.value.clearValidate('tmName');
        formRef.value.clearValidate('logoUrl');
    })
}
//修改已有品牌的按钮的回调
//row:row即为当前已有的品牌
const updateTrademark = (row: TradeMark) => {
    dialogFormVisible.value = true
    //清空校验规则错误提示信息
    nextTick(() => {
        formRef.value.clearValidate('tmName');
        formRef.value.clearValidate('logoUrl');
    })

    Object.assign(trademarkParams, row)
}
//气泡确认框确定按钮的回调
const deleteTrademark = async (id: number) => {
    //点击确定按钮删除已有品牌请求
    const result = await reqDeleteTrademark(id)
    if (result.code == 200) {
        //删除成功提示信息
        ElMessage({
            type: 'success',
            message: '删除品牌成功'
        });
        //再次获取已有的品牌数据
        getHasTrademark(trademarkList.value.length > 1 ? pageSize.value : pageSize.value - 1);
    } else {
        ElMessage({
            type: 'error',
            message: '删除品牌失败'
        })
    }
}
//上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
    //钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
    //要求:上传文件格式png|jpg|gif 4M
    console.log(rawFile)
    debugger
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件大小应小于4M'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: "上传文件格式务必PNG|JPG|GIF"
        })
        return false;
    }
}
//图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    //response:即为当前这次上传图片post请求服务器返回的数据
    //收集上传图片的地址,添加一个新的品牌的时候带给服务器
    console.log(uploadFile)
    trademarkParams.logoUrl = response.data;
    //图片上传成功,清除掉对应图片校验结果
    formRef.value.clearValidate('logoUrl');

}
const confirm = async () => {
    //在你发请求之前,要对于整个表单进行校验
    //调用这个方法进行全部表单相校验,如果校验全部通过，在执行后面的语法
    await formRef.value.validate();
    let result: any = await reqAddOrUpdateTrademark(trademarkParams);
    //添加|修改已有品牌
    if (result.code == 200) {
        //关闭对话框
        dialogFormVisible.value = false;
        //弹出提示信息
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
        });
        //再次发请求获取已有全部的品牌数据
        getHasTrademark(trademarkParams.id ? currentPage.value : 1);
    } else {
        //添加品牌失败
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
        });
        //关闭对话框
        dialogFormVisible.value = false;
    }
}

//品牌自定义校验规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
    //是当表单元素触发blur时候,会触发此方法
    //自定义校验规则
    if (value.trim().length >= 2) {
        callBack();
    } else {
        //校验未通过返回的错误的提示信息
        callBack(new Error('品牌名称位数大于等于两位'))
    }
}
//品牌LOGO图片的自定义校验规则方法
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
    //如果图片上传
    if (value) {
        callBack();
    } else {
        callBack(new Error('LOGO图片务必上传'))
    }
}

//表单校验规则对象
const rules = {
    tmName: [
        //required:这个字段务必校验,表单项前面出来五角星
        //trigger:代表触发校验规则时机[blur、change]
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, validator: validatorLogoUrl }
    ]
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