<template>
    <div>
        <h1>这是登录成之后展示页面{{ userStore.user_info.username }}</h1>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
//@ts-ignore
import useUserStore from '@/store/moudules/user';
const userStore = useUserStore()
onMounted(()=> {
    userStore.getUserInfo().then(res => {
        console.log(res)
    })
})
</script>

<style scoped lang="scss">

</style>