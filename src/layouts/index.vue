<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '63px' : '200px'"
        ><leftMenu v-if="loginStore.isLogin" :isCollapse="isCollapse"
      /></el-aside>
      <el-container>
        <el-header
          ><Header v-if="loginStore.isLogin" @change-collapse="changeCollapse"
        /></el-header>
        <el-main><RouterView /></el-main>
        <el-footer height="60px"><Footer v-if="loginStore.isLogin" /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { useLoginStore } from '@/stores/login'
import { RouterView } from 'vue-router'
import leftMenu from './leftMenu.vue'
import { ref } from 'vue'
const isCollapse = ref(false)
const loginStore = useLoginStore()
const changeCollapse = (data: boolean) => {
  console.log('%c Line:23 🍌', 'color:#93c0a4', data)
  isCollapse.value = data
}
</script>
<style lang="less" scoped>
.common-layout {
  height: 100vh;
  width: 100vw;
  .el-container {
    height: calc(100%);
  }
  .el-header {
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
  }
  .el-aside {
    background-color: #d3dce6;
    color: var(--el-text-color-primary);
    transition: width 0.3s ease;
  }
  .el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
  }
  .el-footer {
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
  }
}
</style>
