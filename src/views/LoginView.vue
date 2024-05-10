<template>
  <div class="login-view">
    <div class="login-form">
      <div class="title">请登录</div>
      <el-form :model="form" label-width="1px" style="max-width: 600px" :rules="rules">
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入用户名"
            :prefix-icon="User"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            clearable
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.enter="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage, type FormRules } from 'element-plus'
import { Login } from '../api/modules/login'
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/login'
const loginStore = useLoginStore()
interface RuleForm {
  name: string
  password: string
}
const router = useRouter()
const form = ref<RuleForm>({
  name: '',
  password: ''
})
const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const { login } = useLogin()
onMounted(() => {})
function useLogin() {
  const login = () => {
    console.log('%c Line:50 🌽', 'color:#3f7cff')
    Login(form.value)
      .then((res) => {
        if (res.code === 0) {
          ElMessage.success(res.message)
          localStorage.setItem('token', res.data.token)
          loginStore.login(res.data.token)
          router.push('/')
        } else if (res.status === -1002) {
          ElMessage.error(res.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onMounted(() => {
    document.addEventListener(
      'keyup',
      (event) => {
        const keyName = event.key
        if (keyName === 'Enter') {
          login()
        }
      },
      false
    )
  })

  onUnmounted(() => {
    document.removeEventListener('keyup', login)
  })

  return {
    login
  }
}
</script>
<style lang="less" scoped>
.login-view {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/img/bg.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    height: 400px;
    width: 600px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .el-form-item {
      margin-bottom: 20px;
    }
    .el-button {
      width: 100%;
    }
    .el-input {
      width: 360px;
    }
  }
}
</style>
