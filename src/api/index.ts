import { BASE_URL, HEADERS, TIMEOUT } from './config'
console.log('%c Line:2 🥥 BASE_URL', 'color:#2eafb0', BASE_URL)
import ZRequest from './request'
const zRequest = new ZRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: HEADERS
})
export default zRequest
