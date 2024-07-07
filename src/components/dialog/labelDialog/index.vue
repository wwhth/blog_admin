<template>
  <div>
    <el-dialog
      :title="addOrUpdate ? '添加标签' : '修改标签'"
      width="600px"
      v-model="visible"
      @close="onClose"
    >
      <template v-slot:default>
        <el-form
          label-position="right"
          label-width="auto"
          :model="formLabelAlign"
          style="max-width: 600px"
        >
          <el-form-item label="标签" prop="name">
            <el-input v-model="formLabelAlign.name" />
          </el-form-item>
          <el-form-item label="类别" prop="category_id">
            <el-select v-model="formLabelAlign.category_id" placeholder="请选择标签类别">
              <el-option
                v-for="item in categoriesList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
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
import { ref, reactive, onMounted } from 'vue'
import { getCategories } from '@/api/modules/category'
import { addLabel, updateLabel } from '@/api/modules/label'
import { ElMessage } from 'element-plus'
import $bus from '@/utils/mitt'
interface ICategory {
  id: number
  name: string
}

const props = defineProps<{
  addOrUpdate: boolean
}>()
const visible = ref(false)
const labelId = ref<number | null>(null)
const categoriesList = ref<ICategory[]>([])
const confirmLoading = ref<boolean>(false)
const formLabelAlign = reactive<{
  name: string
  category_id: number | null
}>({
  name: '',
  category_id: null
})

const open = () => {
  visible.value = true
}
const onClose = () => {
  visible.value = false

  formLabelAlign.name = ''
  formLabelAlign.category_id = null
}

const handleCancel = () => {
  visible.value = false
}

const handleOk = async () => {
  if (formLabelAlign.name === '' || formLabelAlign.category_id === null) {
    ElMessage({ message: '请输入标签名称和类别', type: 'error' })
    return
  }
  confirmLoading.value = true
  if (props.addOrUpdate) {
    // 添加标签
    const { code, message } = await addLabel(
      formLabelAlign as { name: string; category_id: number }
    )
    if (code === 200) {
      ElMessage({ message, type: 'success' })
      confirmLoading.value = false
      visible.value = false
      $bus.emit('refreshLabelList')
    } else {
      ElMessage({ message, type: 'error' })
      confirmLoading.value = false
    }
  } else {
    // 修改标签

    const { code, message } = await updateLabel({
      id: labelId.value,
      name: formLabelAlign.name,
      category_id: formLabelAlign.category_id
    } as { id: number; name: string; category_id: number })
    if (code === 200) {
      ElMessage({ message, type: 'success' })
      confirmLoading.value = false
      visible.value = false
      $bus.emit('refreshLabelList')
    } else {
      ElMessage({ message, type: 'error' })
      confirmLoading.value = false
    }
  }
}

onMounted(async () => {
  const { data: categoriesData } = await getCategories()
  categoriesList.value = categoriesData
})

defineExpose({
  visible,
  open,
  formLabelAlign,
  labelId
})
</script>
<style lang="less" scoped></style>
