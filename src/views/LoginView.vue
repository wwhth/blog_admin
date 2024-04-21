<template>
  <div class="login-view">
    <div class="login-form">
      <div class="title">请登录</div>
      <el-form :model="form" label-width="1px" style="max-width: 600px">
        <el-form-item>
          <el-input
            v-model="form.name"
            placeholder="请输入用户名"
            :prefix-icon="User"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
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
import { Login } from '../api/modules/login'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = ref({
  name: '',
  password: ''
})
const login = () => {
  Login(form.value)
    .then((res) => {
      localStorage.setItem('token', res.data.token)
      console.log(res)
      router.push('/')
    })
    .catch((err) => {
      console.log(err)
    })
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
