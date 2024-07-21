<template>
  <div>
    <el-dialog width="1200px" v-model="visible" @close="onClose" :title="'博客'">
      <template #default>
        <el-form
          label-position="right"
          label-width="auto"
          :model="formLabelAlign"
          style="max-width: 800px"
        >
          <el-form-item label="标题" prop="title">
            <el-input v-model="formLabelAlign.title" />
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <el-input v-model="formLabelAlign.category" />
          </el-form-item>
          <el-form-item label="标签" prop="label">
            <el-input v-model="formLabelAlign.label" />
          </el-form-item>
          <el-form-item label="作者" prop="username">
            <el-input v-model="formLabelAlign.username" />
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <editor v-model="formLabelAlign.content" />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="onCommit">确定</el-button>
        <el-button @click="onClose">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { addArticle, updateArticle } from '@/api/modules/article'

interface IArticle {
  id: number
  category: string
  label: string
  title: string
  content: string
  userid: number
  username: string
}
const props = defineProps({
  addOrUpdate: {
    type: Boolean,
    default: false
  }
})
const formLabelAlign = ref<Partial<IArticle>>({
  id: 0,
  category: '',
  label: '',
  title: '',
  content: '',
  userid: 0,
  username: ''
})

const visible = ref(false)
const open = () => {
  visible.value = true
}
const onClose = () => {
  visible.value = false
}
const onCommit = async () => {
  if (props.addOrUpdate) {
    //TODO: 添加博客
  } else {
    //TODO: 更新博客
    const { data: data } = await updateArticle(formLabelAlign.value as IArticle)
    console.log('🚀 ~ onCommit ~ data:', data)
  }
}

defineExpose({
  visible,
  open,
  formLabelAlign
})
</script>

<style scoped></style>
