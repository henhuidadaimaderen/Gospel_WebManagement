<template>
  <div>
    <el-table :data="tableData.slice((pageNum-1)*pageSize,pageNum*pageSize)" stripe>
      <el-table-column prop="number" label="学生学号"></el-table-column>
      <el-table-column prop="name" label="学生姓名"></el-table-column>
      <el-table-column prop="major" label="专业"></el-table-column>
      <el-table-column prop="courseName" label="课程名称"></el-table-column>
      <el-table-column prop="teacher" label="课程老师"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="margin-top: 20px">
      <el-pagination
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>


<script>
import request from "@/utils/request";

export default {
  name: 'User',
  data() {
    return {
      tableData: [
      ],
      total: 0,
      pageNum: 1,
      pageSize: 10,
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request.get('/course/admin/getRecord').then(res=>{
        this.tableData=res.data.recordList
        this.total=res.data.recordList.length
      })
    },
    handleCurrentChange(pageNum) {
      //点击分页按钮触发分页
      this.pageNum = pageNum
    },
    del(id) {
      request.delete("/user/delete/" + id).then(res => {
        if (res.code === '200') {
          this.$notify.success("删除成功")
          //删除后自动刷新
          this.load()
        } else {
          this.$notify.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>