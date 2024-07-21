import zRequest from '..'

interface articleResponse {
  code?: number
  message: string
  data?: {
    id: number
    category: string
    label: string
    title: string
    content: string
    userid: number
    username: string
    category_id: number
    label_id: number
  }[]
  status?: number
}

interface IArticle {
  id: number
  category: string
  label: string
  title: string
  content: string
  userid: number
  username: string
}
export function getArticleList() {
  return zRequest.get<articleResponse>({
    url: 'api/v1/article'
  })
}

export function addArticle(data: Omit<IArticle, 'id' | 'name'>) {
  return zRequest.post<articleResponse>({
    url: 'api/v1/article/create',
    data
  })
}
export function deleteArticle(id: number) {
  return zRequest.get<articleResponse>({
    url: `api/v1/article/delete/${id}`
  })
}

export function updateArticle(data: IArticle) {
  return zRequest.post<articleResponse>({
    url: 'api/v1/article/update',
    data
  })
}
