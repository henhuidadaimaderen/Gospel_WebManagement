<template>
  <div>
    <el-table :data="tableData.slice((params.pageNum-1)*params.pageSize,params.pageNum*params.pageSize)" stripe>
      <el-table-column prop="number" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="college" label="学院"></el-table-column>
      <el-table-column prop="major" label="专业"></el-table-column>
    </el-table>
    <!-- 分页 -->
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
  name: 'AdminList',
  data() {
    return {
      tableData: [],
      total: 0,
      form: {},
      params: {
        pageNum: 1,
        pageSize: 10,
        username: '',
        phone: '',
        email: '',
      }
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request.get('/user/getList',).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.userList
          this.total = res.data.userList.length
        }
      })
    },
    handleCurrentChange(pageNum) {
      //点击分页按钮触发分页
      this.params.pageNum = pageNum
      this.load()
    },
  }
}
</script>

<style scoped>

</style>