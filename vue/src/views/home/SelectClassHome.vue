<template>
  <el-form>
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
          <span v-if="scope.row.flag===0">
            <el-popconfirm
                style="margin-left: 5px"
                title="您确定选中该课吗？"
                @confirm="save(scope.row.id)"
            >
            <el-button type="primary" slot="reference">选课</el-button>
          </el-popconfirm>
          </span>
          <span v-else>
            <el-popconfirm
                style="margin-left: 5px"
                title="您确定退选该课吗？"
                @confirm="save(scope.row.id)"
            >
            <el-button type="danger" slot="reference">退选</el-button>
          </el-popconfirm>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="中选情况" >
        <template slot-scope="scope">
          <span v-if="scope.row.flag===1" style="color: blue">中选</span>
          <span v-else>未中选</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->

  </div>
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
  </el-form>

</template>
<script>
import request from "@/utils/request";

export default {
  name: 'SelectClassHome',
  data() {
    return {
      form: {
        teacherId:15
      },
      tableData: [
      ],
      params:{
        pageNum: 1,
        pageSize: 8,
      },
      total:0,
    }
  },
  created() {
    this.load()
  },
  methods: {
    load(){
      request.get('/course/student/getCourse').then(res=>{
        this.tableData=res.data.allCourses
        this.total=res.data.allCourses.length;
        // this.tableData.map((row)=>{
        //   console.log(row)
        //   if(row.allCourses.flag===1){
        //     row.selected='中选'
        //   } else {
        //     row.selected='未中选'
        //   }
        // })
        // console.log(this.tableData)
      })



    },
    save(id) {
      console.log({
        courseId: id+''
      },typeof(id+'') )
        request.post("/course/student/select?courseId="+id
        ).then((res)=>{
          if(res.code===200){
            this.$notify.success("选课成功")
            this.load()
          }
          else{
            this.$notify.error("选课失败")
          }
        })
    },
    handleCurrentChange(pageNum) {
      //点击分页按钮触发分页
      this.params.pageNum = pageNum
      this.load()
    }
  },

}
</script>