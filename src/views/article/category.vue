<template>
  <div>
    <div class="addLabel"><el-button size="large" @click="handelAdd"> 添加类别 </el-button></div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="name" label="类别" width="120" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> 编辑 </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <category-dialog ref="categoryDialogRef" :addOrUpdate="addOrUpdate"></category-dialog>
  </div>
</template>
<script setup lang="ts">
import { getCategories, deleteCategory } from '@/api/modules/category'

import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import categoryDialog from '@/components/dialog/categoryDialog/index.vue'
import $bus from '@/utils/mitt'

interface ICategory {
  id: number
  name: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<ICategory[]>([])
const tableData = ref<ICategory[]>([])
const categoriesList = ref<ICategory[]>([])
const categoryDialogRef = ref<InstanceType<typeof categoryDialog>>()
const addOrUpdate = ref<boolean>(true)

const handleSelectionChange = (val: ICategory[]) => {
  multipleSelection.value = val
}
const handleEdit = (index: number, row: ICategory) => {
  categoryDialogRef.value!.formLabelAlign.name = row.name
  addOrUpdate.value = false
  categoryDialogRef.value!.categoryId = row.id
  categoryDialogRef.value?.open()
  console.log(index, row)
}
const handleDelete = (index: number, row: ICategory) => {
  ElMessageBox({
    title: '提示',
    message: '确定删除这个类别吗?',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showCancelButton: true,
    type: 'warning'
  })
    .then(async () => {
      const { code, message } = await deleteCategory(row.id)
      if (code === 200) {
        ElMessage({
          type: 'success',
          message: message
        })
        onLoad()
      } else {
        ElMessage({
          type: 'error',
          message: message
        })
      }
    })
    .catch((err) => {
      console.log('🚀 ~ handleDelete ~ err:', err)
      // catch error
    })
}
const handelAdd = () => {
  addOrUpdate.value = true
  categoryDialogRef.value!.visible = true
}
const onLoad = async () => {
  const { data: categoriesData } = await getCategories()
  console.log('🚀 ~ onLoad ~ categoriesData:', categoriesData)
  categoriesList.value = categoriesData as ICategory[]
  const { data: CategorylsData } = await getCategories()
  tableData.value = CategorylsData!
}
onMounted(async () => {
  $bus.on('refreshCategoryList', () => {
    onLoad()
  })
  await onLoad()
})

onUnmounted(() => {
  $bus.off('refreshCategoryList')
})
</script>
<style lang="less" scoped>
.addLabel {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;

  .el-button {
    background-color: #409eff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
  }
}
</style>
