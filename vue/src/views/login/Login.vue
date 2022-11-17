<template>
  <div style="height: 100vh; overflow: hidden">
    <div style="width: 500px; height: 400px; background-color: white; border-radius: 10px;
    margin: 150px auto; padding: 50px">
      <div style="margin: 30px; text-align: center; font-size: 30px; font-weight: bold; color: dodgerblue">登 录</div>
      <el-form :model="admin" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" prefix-icon="el-icon-user" size="medium"
                    v-model="admin.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" show-password prefix-icon="el-icon-lock" size="medium"
                    v-model="admin.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" size="medium" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import Cookies from 'js-cookie'

export default {
  name: 'LOGIN',
  data() {
    return {
      admin: {},
      rules: {
        //姓名仅要求为必填
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在3-15个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          request.post('/user/login', {
            account: this.admin.username,
            password: this.admin.password,
          }).then(res => {
            if (res.code === 1000) {
              // console.log(this.$router)
              this.$notify.success("登录成功")
              if (res.data !== null) {
                Cookies.set('admin', JSON.stringify(res.data))
              }

              if (res.data.userInfo.flag===0){
                this.$router.push('/')
              }
              else{
                this.$router.push('/selectClassHome');
              }
            } else {
              this.$notify.error(res.message)
            }
          })
        }
      })
    }
  }
}
</script>