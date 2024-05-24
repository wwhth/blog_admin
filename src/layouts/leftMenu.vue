<template>
  <div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :default-active="$route.meta.parentPath"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :router="true"
    >
      <el-sub-menu v-for="item in menuList" :key="item.id" :index="item.url">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>

        <el-menu-item
          v-if="item.children"
          v-for="item1 in item.children"
          :key="item1.id"
          :index="item1.url"
        >
        <template #title>
          <el-icon>
            <component :is="item1.icon"></component>
          </el-icon>
          <span>{{ item1.name }}</span>
        </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { getMenuList } from '../api/modules/user'
import type { menuType } from './types/index'
let menuList = ref<menuType[]>([])
const props = withDefaults(
  defineProps<{
    isCollapse: boolean
  }>(),
  {
    isCollapse: false
  }
)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

onMounted(async () => {
  const { data } = await getMenuList()
  console.log('%c Line:56 🍐 data', 'color:#f5ce50', data)
  menuList.value = data
})
</script>
<style lang="less" scoped></style>
