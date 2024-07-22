<template>
  <div>
    <div class="addLabel"><el-button size="large" @click="handleAdd"> 添加文章 </el-button></div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="title" label="标题" width="120" show-overflow-tooltip />
      <el-table-column property="category" label="类别" />
      <el-table-column property="label" label="标签" />
      <el-table-column property="username" label="作者" />
      <!-- <el-table-column property="introduce" label="介绍" show-overflow-tooltip /> todo 暂时没这个字段 -->
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> 编辑 </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <article-dialog ref="articleDialogRef" :addOrUpdate="addOrUpdate" />
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { deleteArticle, getArticleList } from '@/api/modules/article'
import articleDialog from '@/components/dialog/articleDialog/index.vue'
import bus from '@/utils/mitt'
import { ElMessage, ElMessageBox } from 'element-plus'
interface IArticle {
  id: number
  category: string
  label: string
  title: string
  content: string
  userid: number
  username: string
  category_id: number
  label_id: number
}
const tableData = ref<IArticle[]>([])
const multipleSelection = ref<IArticle[]>([])
const articleDialogRef = ref<typeof articleDialog>()
const addOrUpdate = ref<boolean>(false)
onMounted(async () => {
  await onLoad()
  bus.on('refreshArticleList', onLoad)
})
onBeforeUnmount(() => {
  bus.off('refreshArticleList', onLoad)
})
const onLoad = async () => {
  const { data } = await getArticleList()
  tableData.value = data as IArticle[]
}
const handleSelectionChange = (val: IArticle[]) => {
  console.log('🚀 ~ handleSelectionChange ~ val:', val)
  multipleSelection.value = val
}
const handleAdd = () => {
  addOrUpdate.value = true
  articleDialogRef.value?.open()
  console.log('🚀 ~ handleAdd ~ articleDialogRef.value:', articleDialogRef.value)
}
const handleEdit = (index: number, row: IArticle) => {
  addOrUpdate.value = false
  articleDialogRef.value!.formLabelAlign = row
  console.log('🚀 ~ handleEdit ~ articleDialogRef.value!.formLabelAlign :', articleDialogRef.value)
  articleDialogRef.value?.open()
  console.log(index, row)
}
const handleDelete = async (index: number, row: IArticle) => {
  ElMessageBox({
    title: '提示',
    message: '确定删除这篇文章吗?',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showCancelButton: true,
    type: 'warning'
  })
    .then(async () => {
      const { code, message } = await deleteArticle(row.id)
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
