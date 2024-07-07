import zRequest from '..'

interface LabelResponse {
  code?: number
  message?: string
  data?: {
    id: number
    name: string
    category: string
    category_id: number
  }[]
  status?: number
}
// 获取标签列表
export function getLabels() {
  return zRequest.get<LabelResponse>({
    url: 'api/v1/label'
  })
}

// 添加标签
export function addLabel(data: { name: string; category_id: number }) {
  return zRequest.post<LabelResponse>({
    url: 'api/v1/label/create',
    data
  })
}

// 修改标签
export function updateLabel(data: { id: number; name: string; category_id: number }) {
  return zRequest.post<LabelResponse>({
    url: 'api/v1/label/update',
    data
  })
}
// 删除标签
export function deleteLabel(id: number) {
  return zRequest.get<LabelResponse>({
    url: `api/v1/label/delete/${id}`
  })
}
