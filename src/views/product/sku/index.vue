<template>
    <div>
        <h1>sku管理</h1>
    </div>
</template>

<script setup lang="ts">
//@ts-ignore
import request from "@/utils/request";
request.post('/user/login', { username: 'system',
            password: '111111'})
</script>

<style scoped>

</style>