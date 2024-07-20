import zRequest from '..'

interface CategoryResponse {
  code?: number
  message: string
  data?: {
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
// 添加分类
export function createCategory(body: { name: string }) {
  return zRequest.post<CategoryResponse>({
    url: 'api/v1/category/create',
    data: body
  })
}
// 编辑分类
export function updateCategory(body: { id: number; name: string }) {
  return zRequest.post<CategoryResponse>({
    url: 'api/v1/category/update',
    data: body
  })
}
// 删除分类
export function deleteCategory(id: number) {
  return zRequest.get<CategoryResponse>({
    url: 'api/v1/category/delete/' + id
  })
}
