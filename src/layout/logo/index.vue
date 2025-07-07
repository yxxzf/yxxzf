<template>
    <div class="logo">
        <img :src="settings.logo" alt="系统图标" srcset="">
        <p :style="{display: layOutSettingStore.fold ? 'none': ''}">{{ settings.title }}</p>
    </div>
</template>

<script setup lang="ts">
//@ts-ignore
import settings from '@/settings';
//@ts-ignore
import useLayOutSettingStore from '@/store/moudules/setting';
const layOutSettingStore = useLayOutSettingStore()
</script>
<script lang="ts">
export default {
    name: 'Logo'
}
</script>
<style scoped lang="scss">
.logo {
    width: 100%;
    height: 50px;
    background-color: black;
    padding: 10px;
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