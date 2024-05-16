<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index" :to="item.path">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

// computed: {
//   breadcrumbItems() {
//     const matched = this.$route.matched;
//     return matched.filter(item => item.meta && item.meta.title);
//   }
// }
const breadcrumbItems = computed(() => {
  const matched = route.matched.filter((item) => item.meta && item.meta.title)
  console.log('%c Line:22 🍌 matched', 'color:#93c0a4', matched)
  return matched.filter((item) => item.meta && item.meta.title)
})
</script>
