import mitt, { type Emitter } from 'mitt'

type Events = {
  foo?: string
  bar?: number
  refreshLabelList: void
  refreshCategoryList: void
  refreshArticleList: void
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
