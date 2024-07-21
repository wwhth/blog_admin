/// <reference types="vite/client" />
declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }
  export default component
}
// declare interface Window {
//   CESIUM_BASE_URL: string
// }

declare module '@wangeditor/editor-for-vue' {
  const Editor: any
  const Toolbar: any
  type IEditorConfig = any
}
declare module '@wangeditor/editor' {
  const Editor: any
  const Toolbar: any
  type IEditorConfig = any
}
