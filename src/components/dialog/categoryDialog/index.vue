<template>
  <div>
    <el-dialog
      :title="addOrUpdate ? '添加类别' : '修改类别'"
      width="600px"
      v-model="visible"
      @close="onClose"
    >
      <template #default>
        <el-form
          label-position="right"
          label-width="auto"
          :model="formLabelAlign"
          style="max-width: 600px"
        >
          <el-form-item label="类别" prop="name">
            <el-input v-model="formLabelAlign.name" />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="small" @click="handleCancel">取 消</el-button>
          <el-button size="small" type="primary" @click="handleOk" :loading="confirmLoading"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { createCategory, updateCategory } from '@/api/modules/category'
import { ElMessage } from 'element-plus'
import $bus from '@/utils/mitt'

const props = defineProps<{
  addOrUpdate: boolean
}>()
const visible = ref(false)
const categoryId = ref<number | null>(null)
const confirmLoading = ref<boolean>(false)
const formLabelAlign = reactive<{
  name: string
}>({
  name: ''
})

const open = () => {
  visible.value = true
}
const onClose = () => {
  visible.value = false

  formLabelAlign.name = ''
}

const handleCancel = () => {
  visible.value = false
}

const handleOk = async () => {
  if (formLabelAlign.name === '') {
    ElMessage({ message: '请输入类别', type: 'error' })
    return
  }
  confirmLoading.value = true
  if (props.addOrUpdate) {
    // 添加标签
    const { code, message } = await createCategory(formLabelAlign as { name: string })
    if (code === 200) {
      ElMessage({ message, type: 'success' })
      confirmLoading.value = false
      visible.value = false
      $bus.emit('refreshCategoryList')
    } else {
      ElMessage({ message, type: 'error' })
      confirmLoading.value = false
    }
  } else {
    // 修改标签

    const { code, message } = await updateCategory({
      id: categoryId.value,
      name: formLabelAlign.name
    } as { id: number; name: string; category_id: number })
    if (code === 200) {
      ElMessage({ message, type: 'success' })
      confirmLoading.value = false
      visible.value = false
      $bus.emit('refreshCategoryList')
    } else {
      ElMessage({ message, type: 'error' })
      confirmLoading.value = false
    }
  }
}

defineExpose({
  visible,
  open,
  formLabelAlign,
  categoryId
})
</script>
<style lang="less" scoped></style>
