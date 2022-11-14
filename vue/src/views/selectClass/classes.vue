<template>
  <div>
    <!-- 搜索表单 -->
    <div style="margin-bottom: 20px">
      <el-select v-model="value" clearable placeholder="根据课程筛选">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" clearable placeholder="根据老师筛选">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button style="margin-left: 5px" type="primary" @click="load"><i class="el-icon-search">搜索</i></el-button>
      <el-button style="margin-left: 5px" type="warning" @click="reset"><i class="el-icon-refresh">重置</i></el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" stripe>
      <el-table-column prop="number" label="学生学号"></el-table-column>
      <el-table-column prop="name" label="学生姓名"></el-table-column>
      <el-table-column prop="major" label="专业"></el-table-column>
      <el-table-column prop="courseName" label="课程名称"></el-table-column>
      <el-table-column prop="teacher" label="课程老师"></el-table-column>
      <!--      <el-table-column label="操作">-->
      <!--        <template v-slot="scope">-->
      <!--          &lt;!&ndash; scope.row就是当前行数据 &ndash;&gt;-->
      <!--          &lt;!&ndash; 跳转页面的同时，把id带到编辑页面 &ndash;&gt;-->
      <!--          <el-button type="primary" @click="$router.push('/editUser?id=' + scope.row.id)">编辑</el-button>-->
      <!--          <el-popconfirm-->
      <!--              style="margin-left: 5px"-->
      <!--              title="您确定删除这行数据吗？"-->
      <!--              @confirm="del(scope.row.id)"-->
      <!--          >-->
      <!--            <el-button type="danger" slot="reference">删除</el-button>-->
      <!--          </el-popconfirm>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
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
  name: 'User',
  data() {
    return {
      tableData: [
      ],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
        name: '',
        phone: '',
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
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
    reset() {
      this.value = '',
          this.params = {
            pageNum: 1,
            pageSize: 10,
            name: '',
            phone: '',
          }
      this.load()
    },
    handleCurrentChange(pageNum) {
      //点击分页按钮触发分页
      this.params.pageNum = pageNum
      this.load()
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