<template>
  <div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { ref } from 'vue'
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
const menuList = [
  {
    name: '首页',
    path: '/home',
    group: [
      {
        title: 'group1',
        list: [
          {
            name: '首页1',
            path: '/home1'
          },
          {
            name: '首页2',
            path: '/home2'
          }
        ]
      },
      {
        title: 'group2',
        list: [
          {
            name: '首页3',
            path: '/home3'
          },
          {
            name: '首页4',
            path: '/home4'
          }
        ]
      }
    ]
  },
  {
    name: '列表',
    path: '/list'
  },
  {
    name: '详情',
    path: '/detail'
  }
]
</script>
<style lang="less" scoped></style>
