<template>
  <div></div>
</template>
<script setup lang="ts">
import { getCategories } from '@/api/modules/category'
import { onMounted } from 'vue'

onMounted(async () => {
  const { data } = await getCategories()
  console.log('🚀 ~ onMounted ~ res:', data)
})
</script>
<style lang="less" scoped></style>
