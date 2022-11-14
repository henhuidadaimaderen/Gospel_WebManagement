<template>
  <div >
    <el-form>
      <h3 style="align-content: center">我的课表</h3>
      <div style="margin-left: 40px">
        <el-table :data="tableData" stripe>
          <el-table-column prop="course_name" label="课程名称"></el-table-column>
          <el-table-column prop="teacher_name" label="老师"></el-table-column>
          <el-table-column prop="address" label="上课地点"></el-table-column>
        <!-- 分页 -->
        </el-table>
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
      request.get('course/student/getSelfCourse').then(res=>{
        console.log(res.data)
        this.tableData=res.data.CourseList;
        this.total=res.data.CourseList.length;
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