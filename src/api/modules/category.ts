import zRequest from '..'

interface CategoryResponse {
  code?: number
  message: string
  data: {
    id: number
    name: string
  }[]
  status?: number
}
// 获取分类列表
export function getCategories() {
  return zRequest.get<CategoryResponse>({
    url: 'api/v1/category'
  })
}
