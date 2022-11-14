<template>
  <div style="width: 80%">
    <div style="margin-bottom: 30px">新增学生</div>
    <el-form :inline="true"  label-width="100px">
      <el-form-item label="学院" >
        <el-input v-model="form.college" placeholder="请输入学院"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.major" placeholder="请输入专业" ></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入姓名" ></el-input>
      </el-form-item>
    </el-form>

    <div style="text-align: center; margin-top: 30px">
      <el-button type="primary" @click="save" size="medium">提交</el-button>
    </div>
    <el-dialog title="您的账号信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="100">
        <el-form-item label="用户名" prop="courseName">
          <span>{{this.Account.username}}</span>
        </el-form-item>
        <el-form-item label="密码" prop="courseName">
          <span >{{this.Account.password}}</span>
        </el-form-item>
      </el-form>
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible = false"></el-button>-->
<!--      </div>-->
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: 'AddAdmin',
  data() {
    return {
      dialogFormVisible:false,
      Account:{},
      form: {
        college:'',
        major:'',
      }
    }
  },
  methods: {
    clear(){
      this.form.college='';
      this.form.major='';
      this.form.name='';
    },
    save() {
          request.post('/user/add/one',{
              college:this.form.college,
              major:this.form.major,
              flag:2,
              name:this.form.name
          }).then(res => {
            if (res.code === 200) {
              console.log(res)
              this.Account=res.data.user
              this.dialogFormVisible=true;
              this.clear()
              this.$notify.success('新增成功')
            } else {
              this.$notify.error(res.message)
            }
          })
        }
  }
}
</script>