<template>
    <div class="logo">
        <img :src="settings.logo" alt="系统图标" srcset="">
        <p>{{ settings.title }}</p>
    </div>
</template>

<script setup lang="ts">
//@ts-ignore
import settings from '@/settings';
</script>
<style scoped lang="scss">
.logo {
    width: 100%;
    height: 50px;
    background-color: black;
    padding: 20px;
    display: flex;
    align-items: center;

    // justify-content:left;
    img {
        width: 40px;
        height: 40px;
    }

    p {
        font-size: 20px;
        margin-left: 5px;
        color: #fff;
    }
}
</style>