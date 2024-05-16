<template>
  <div class="header">
    <div class="crumbs">
      <el-icon>
        <component :is="isCollapse ? 'Fold' : 'Expand'" @click="handleCollapse" />
      </el-icon>
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="myInfo">my</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb/index.vue'
const isCollapse = ref(false)
const emit = defineEmits<{
  // (e: 'changeCollapse', value: boolean): void
  changeCollapse: [value: boolean]
}>()
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
  emit('changeCollapse', isCollapse.value)
}
</script>
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .crumbs {
    font-size: 14px;
    display: flex;
    align-items: center;
    .el-breadcrumb {
      margin-left: 20px;
    }
  }
  .myInfo {
    font-size: 14px;
  }
}
</style>
