<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
// import {Edit} from '@element-plus/icons-vue'
// import { reqLogin } from './api/user';
import { onMounted } from 'vue';
onMounted( ()=> {
  // reqLogin({username: 'admin',password: '111111'});
})
</script>

<style scoped lang="sass">
</style>
