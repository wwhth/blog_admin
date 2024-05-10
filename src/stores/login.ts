import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
  // const token = ref(localStorage.getItem('token') || '')
  // const isLogin = computed(() => token.value ? true : false)
  // return { token, isLogin }
  state: () => {
    return {
      token: "",
      isLogin: localStorage.getItem('token') ? true : false
    }
  },
  actions: {
    login(data: string) {
      this.token = data
      this.isLogin = true
    },
  }
})
