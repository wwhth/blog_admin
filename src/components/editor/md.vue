<template>
  <MdEditor v-model="internalValue" @change="updateModelValue" :toolbars="toolbars" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

interface Props {
  modelValue: string | undefined
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const toolbars = [
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  '-',
  'revoke',
  'next',
  'pageFullscreen',
  'fullscreen',
  // 'save',
  '=',
  'preview',
  'previewOnly',
  'htmlPreview',
  'catalog'
  // 'github'
]
const internalValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue
  }
)

const updateModelValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>
