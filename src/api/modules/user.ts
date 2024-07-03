import zRequest from '..'
interface getMenuListResponse {
  code?: number
  message: string
  data: any
}
export function getMenuList() {
  // 请求登录接口
  return zRequest.get<getMenuListResponse>({
    url: 'api/v1/user/getMenuList'
  })
}
