<template>
  <div>
    <el-dialog width="820px" v-model="visible" @close="onClose" :title="'博客'">
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
          <el-form-item label="分类" prop="category_id">
            <el-select
              v-model="formLabelAlign.category_id"
              placeholder="请选择标签类别"
              @change="categoryChange"
            >
              <el-option
                v-for="item in categoriesList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="标签" prop="label_id">
            <el-select
              v-model="formLabelAlign.label_id"
              placeholder="请选择标签类别"
              @change="labelChange"
            >
              <el-option
                v-for="item in labelsList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!-- <el-form-item v-show="!addOrUpdate" label="作者" prop="username">
            <el-input v-model="formLabelAlign.username" />
          </el-form-item> -->
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
import { onMounted, ref } from 'vue'
import { addArticle, updateArticle } from '@/api/modules/article'
import { getCategories } from '@/api/modules/category'
import { getLabels } from '@/api/modules/label'

interface ICategory {
  id: number
  name: string
}

interface ILabel {
  id: number
  name: string
  category: string
  category_id: number
}

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
const props = defineProps({
  addOrUpdate: {
    type: Boolean,
    default: false
  }
})
onMounted(async () => {
  const { data: categoriesData } = await getCategories()
  categoriesList.value = categoriesData as ICategory[]
  console.log(
    '%c Line:96 🍣 formLabelAlign.value.category_id',
    'color:#ffdd4d',
    formLabelAlign.value.category_id
  )
})
const formLabelAlign = ref<Partial<IArticle>>({
  id: 0,
  category: '',
  label: '',
  title: '',
  content: '',
  userid: 0,
  username: '',
  category_id: 0,
  label_id: 0
})
const categoriesList = ref<ICategory[]>([])
const labelsList = ref<ILabel[]>([])
const visible = ref(false)
const open = async () => {
  await getLabelList(formLabelAlign.value.category_id)
  visible.value = true
}
const onClose = () => {
  visible.value = false
  formLabelAlign.value = {
    id: undefined,
    category: '',
    label: '',
    title: '',
    content: '',
    userid: undefined,
    username: '',
    category_id: undefined,
    label_id: undefined
  }
}
const onCommit = async () => {
  if (props.addOrUpdate) {
    //TODO: 添加博客
  } else {
    //TODO: 更新博客
    const { data: data } = await updateArticle(formLabelAlign.value as IArticle)
    console.log('🚀 ~ onCommit ~ data:', data)
    onClose()
  }
}

const getLabelList = async (category_id?: number) => {
  console.log('🚀 ~ getLabelList ~ category_id:', category_id)
  const { data } = await getLabels()

  if (category_id) {
    labelsList.value = data!.filter((item) => item.category_id === category_id)
  } else {
    labelsList.value = data as ILabel[]
  }
  console.log('🚀 ~ getLabelList ~ labelsList:', labelsList)
}

const categoryChange = async (value: number) => {
  console.log('🚀 ~ categoryChange ~ value:', value)
  formLabelAlign.value.label_id = undefined
  await getLabelList(value)
}
const labelChange = (value: number) => {
  formLabelAlign.value.category_id = labelsList.value.filter((item) => {
    return item.id === value
  })[0].category_id
}
defineExpose({
  visible,
  open,
  formLabelAlign
})
</script>

<style scoped>
:deep().el-dialog {
  height: 600px;
  overflow: auto;
}
</style>
