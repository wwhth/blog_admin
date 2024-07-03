<template>
  <div class="common-layout">
    <el-container>
      <!-- <el-aside :width="isCollapse ? '63px' : '200px'"> -->
      <leftMenu
        :style="isCollapse ? 'width:64px' : 'width:200px'"
        :isCollapse="isCollapse"
      ></leftMenu>
      <!-- </el-aside> -->

      <el-container>
        <el-header><Header @change-collapse="changeCollapse" /></el-header>
        <el-main><RouterView /></el-main>
        <el-footer height="60px"><Footer /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import leftMenu from './leftMenu.vue'
import { ref } from 'vue'
const isCollapse = ref(false)
const changeCollapse = (data: boolean) => {
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
    transition: width 1s ease;
  }
  .el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
  }
  .el-footer {
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
  }
  // :deep(.menu) {
  //   transition: width 1s ease;
  // }
  // :deep(.el-menu-item) {
  //   transition: width 1s ease;
  // }
}
</style>
