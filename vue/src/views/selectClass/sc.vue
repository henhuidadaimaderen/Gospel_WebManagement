<template>
  <div >
    <div style="margin-bottom: 30px">选课设置</div>
    <el-form :inline="true" :model="form" label-width="100px" >
      <el-form-item label="课程名称">
        <el-input v-model="form.classname" placeholder="请输入开设课程名称"></el-input>
      </el-form-item>
      <el-form-item label="课程教师">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="限选人数">
        <el-input v-model="form.num" placeholder="请输入年龄"></el-input>
      </el-form-item>
      <el-form-item label="上课地点">
        <el-input v-model="form.address" placeholder="请输入上课地点"></el-input>
      </el-form-item>
      <el-button type="primary" @click="save" size="medium" style="margin-left: 20px">开放选课</el-button>
      <h3 style="align-content: center">当前开设课程列表</h3>
      <div style="margin-left: 40px">

        <el-table :data="tableData" stripe>
          <el-table-column prop="courseName" label="课程名称"></el-table-column>
          <el-table-column prop="teacherName" label="老师"></el-table-column>
          <el-table-column prop="studentNum" label="选课人数"></el-table-column>
          <el-table-column prop="limitNum" label="限选人数"></el-table-column>
          <el-table-column prop="address" label="上课地点"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">

              <el-button type="primary" slot="reference" @click="update(scope.row.id)">修改</el-button>
              <el-popconfirm
                  style="margin-left: 5px"
                  title="您确定停止选课吗？"
                  @confirm="del(scope.row.id)"
              >
                <el-button type="danger" slot="reference">停止选课</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->

      </div>
    </el-form>
    <div style="margin-top: 20px">
      <el-pagination
          background
          :current-page="params.pageNum"
          :page-size="params.pageSize"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
import request from "@/utils/request";

export default {
  name: 'setsc',
  data() {
    return {
      form: {
      },
      tableData: [
      ],
      params:{
        pageNum: 1,
        pageSize: 8,
      },
      total:4,
    }
  },
  created() {
    this.load()
  },
  methods: {
    load(){
      request.post('course/admin/getAll?type='+2).then(res=>{
        this.tableData=res.data.allCourses;
        this.total=res.data.allCourses.length;
      })
    },
    update(id){
          request.post('course/admin/updateCourse',{
            courseName:this.form.classname,
            teacherName:this.form.name,
            limitNum:this.form.num,
            address:this.form.address
          }).then(res=>{

          })
    },
    clear(){
          this.form.classname='';
          this.form.name='';
          this.form.num='';
          this.form.address='';
    },
    save() {
        request.post("/course/add",{
          courseName:this.form.classname,
          teacherName:this.form.name,
          limitNum:this.form.num,
          address:this.form.address
        }).then(res=>{
          if(res.code===200){
            this.$notify.success(res.message);
            this.load()
            this.clear()
          }
          else{
            this.$notify.error(res.message);
          }
      })
    },
    del(id){
      request.post('/course/endSelect?courseId='+id,).then(res=>{
        console.log(res)
        if(res.code===200){
          this.$notify.success(res.message);
          this.load();
        }
        else{
          this.$notify.error(res.message);
        }
      })
    }
    ,
    handleCurrentChange(pageNum) {
      //点击分页按钮触发分页
      this.params.pageNum = pageNum
      this.load()
    }
  },

}
</script>