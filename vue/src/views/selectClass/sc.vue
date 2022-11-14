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

        <el-table :data="tableData.slice((params.pageNum-1)*params.pageSize,params.pageNum*params.pageSize)" stripe>
          <el-table-column prop="courseName" label="课程名称"></el-table-column>
          <el-table-column prop="teacherName" label="老师"></el-table-column>
          <el-table-column prop="studentNum" label="选课人数"></el-table-column>
          <el-table-column prop="limitNum" label="限选人数"></el-table-column>
          <el-table-column prop="address" label="上课地点"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">

              <el-button type="primary" slot="reference" @click="update(scope.row)">修改</el-button>
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
    <el-dialog title="修改选课信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="UpdateTable" label-width="100">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="UpdateTable.courseName" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="老师" prop="teacherName">
          <el-input v-model="UpdateTable.teacherName" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="限选人数" prop="limitNum">
          <el-input v-model="UpdateTable.limitNum" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="上课地点" prop="address">
          <el-input v-model="UpdateTable.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUpdate">确 定</el-button>
      </div>
    </el-dialog>
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
      temp:{

      },
      dialogFormVisible: false,
      tableData: [
      ],
      UpdateTable: {
        courseName: '',
        teacherName: '',
        limitNum: 0,
        address: '',
        id: 0,
  },
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
    saveUpdate(){
      request.post('course/admin/updateCourse',{
        courseName:this.UpdateTable.courseName,
        teacherName:this.UpdateTable.teacherName,
        limitNum:this.UpdateTable.limitNum,
        address:this.UpdateTable.address,
        id:this.UpdateTable.id,
      }).then(res=>{
          if(res.code===200) {
            this.$notify.success("修改成功");
            this.dialogFormVisible=false;
            this.load()
          }else{
            this.$notify.error("修改失败");
          }
      })
    },
    update(row){
      this.UpdateTable.courseName=row.courseName
      this.UpdateTable.teacherName=row.teacherName
      this.UpdateTable.limitNum=row.limitNum
      this.UpdateTable.address=row.address
      this.UpdateTable.id=row.id
      console.log(this.UpdateTable)
      this.dialogFormVisible = true;
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