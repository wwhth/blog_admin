<template>
  <div class="addLabel"><el-button size="large" @click="handelAdd"> 添加标签 </el-button></div>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="name" label="标签" width="120" />
    <el-table-column property="category" label="类别" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> 编辑 </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <label-dialog ref="labelDialogRef" :addOrUpdate="addOrUpdate"></label-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { getLabels, deleteLabel } from '@/api/modules/label'
import { getCategories } from '@/api/modules/category'
import labelDialog from '@/components/dialog/labelDialog/index.vue'
import $bus from '@/utils/mitt'
interface ILabel {
  id: number
  name: string
  category: string
  category_id: number
}

interface ICategory {
  id: number
  name: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<ILabel[]>([])
const tableData = ref<ILabel[]>([])
const categoriesList = ref<ICategory[]>([])
const labelDialogRef = ref<InstanceType<typeof labelDialog>>()
const addOrUpdate = ref<boolean>(true)

const handleSelectionChange = (val: ILabel[]) => {
  multipleSelection.value = val
}
const handleEdit = (index: number, row: ILabel) => {
  labelDialogRef.value!.formLabelAlign.name = row.name
  labelDialogRef.value!.formLabelAlign.category_id = row.category_id
  labelDialogRef.value!.labelId = row.id
  addOrUpdate.value = false
  labelDialogRef.value?.open()
  console.log(index, row)
}
const handleDelete = (index: number, row: ILabel) => {
  ElMessageBox({
    title: '提示',
    message: '确定删除这个标签吗?',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showCancelButton: true,
    type: 'warning'
  })
    .then(async () => {
      const { code, message } = await deleteLabel(row.id)
      if (code === 200) {
        ElMessage({
          type: 'success',
          message: message
        })
        $bus.emit('refreshLabelList')
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
  labelDialogRef.value!.visible = true
}
const onLoad = async () => {
  const { data: categoriesData } = await getCategories()
  console.log('🚀 ~ onLoad ~ categoriesData:', categoriesData)
  categoriesList.value = categoriesData as ICategory[]
  const { data: labelsData } = await getLabels()
  tableData.value = labelsData!
}
onMounted(async () => {
  $bus.on('refreshLabelList', () => {
    onLoad()
  })
  await onLoad()
})

onUnmounted(() => {
  $bus.off('refreshLabelList')
})
</script>
<style lang="less" scoped>
.addLabel {
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
