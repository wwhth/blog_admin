<template>
  <div>
    <Header v-if="loginStore.isLogin" />

    <div class="main">
      <leftMenu />
      <RouterView />
    </div>
    <Footer v-if="loginStore.isLogin" />
  </div>
</template>
<script setup lang="ts">
import { useLoginStore } from '@/stores/login'
import { RouterView } from 'vue-router'
import leftMenu from './leftMenu.vue'

const loginStore = useLoginStore()
</script>
<style lang="less" scoped>
.main {
  display: flex;
}
</style>
