<template>
  <div>
    <h1>我是APP</h1>
    <el-button type="primary" :icon="Edit">主要按钮</el-button>
    <h3>使用svg图标</h3>
    <div>
      <Svg-icon name="home" color="$base-menu-background"></Svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Edit} from '@element-plus/icons-vue'
</script>

<style scoped></style>
