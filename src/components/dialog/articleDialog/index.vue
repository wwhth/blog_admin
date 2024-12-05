<template>
  <div>
    <el-dialog width="65vw" v-model="visible" @close="onClose" :title="'博客'">
      <template #default>
        <el-form
          label-position="right"
          label-width="auto"
          :model="formLabelAlign"
          style="max-width: 60vw"
        >
          <el-form-item label="标题" prop="title">
            <el-input v-model="formLabelAlign.title" />
          </el-form-item>
          <el-form-item label="简介" prop="introduce">
            <el-input v-model="formLabelAlign.introduce" />
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
          <el-form-item label="文章类型" prop="artical_type">
            <el-switch
              v-model="formLabelAlign.artical_type"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              active-text="富文本"
              inactive-text="md"
            />
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
            <editor v-if="formLabelAlign.artical_type" v-model="formLabelAlign.content" />
            <editorMD v-else v-model="formLabelAlign.content" />
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
import editorMD from '@/components/editor/md.vue'
import bus from '@/utils/mitt'
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
  introduce: string
  artical_type: boolean | number
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
})
const formLabelAlign = ref<Partial<IArticle>>({
  id: 0,
  category: '',
  label: '',
  title: '',
  content: '',
  userid: Number(localStorage.getItem('userId')) || undefined,
  username: '',
  introduce: '',
  category_id: undefined,
  label_id: undefined,
  artical_type: false
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
    userid: Number(localStorage.getItem('userId')) || undefined,
    username: '',
    category_id: undefined,
    label_id: undefined,
    artical_type: false
  }
}
const onCommit = async () => {
  // formLabelAlign.value.artical_type = Number(formLabelAlign.value.artical_type)
  console.log('🚀 ~ onCommit ~ formLabelAlign.value:', formLabelAlign.value)
  if (props.addOrUpdate) {
    //TODO: 添加博客
    await addArticle(formLabelAlign.value as IArticle)
  } else {
    //TODO: 更新博客
    await updateArticle(formLabelAlign.value as IArticle)
  }
  bus.emit('refreshArticleList')
  onClose()
}

const getLabelList = async (category_id?: number) => {
  const { data } = await getLabels()

  if (category_id) {
    labelsList.value = data!.filter((item) => item.category_id === category_id)
  } else {
    labelsList.value = data as ILabel[]
  }
}

const categoryChange = async (value: number) => {
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
