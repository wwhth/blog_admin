import zRequest from '..'
interface LoginResponse {
  code?: number
  message: string
  data: {
    token: string
  }
  status?: number
}
interface LoginRequest {
  name: string
  password: string
}
export function Login(form: LoginRequest) {
  // 请求登录接口
  return zRequest.post<LoginResponse>({
    url: 'api/v1/login',
    data: form
  })
}
