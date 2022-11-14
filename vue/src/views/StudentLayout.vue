<template>
  <div>
    <!-- 头部区域  -->
    <div style="height: 60px; line-height: 60px; background-color: white; margin-bottom: 2px; display:flex">
      <div style="width: 300px">
        <img src="@/assets/logo.png" alt=""
             style="width: 40px; position: relative; top: 10px; left: 20px">
        <span style="margin-left: 25px; font-size: 24px">Gospel学生选课系统</span>
      </div>
      <div style="flex: 1; text-align: right; padding-right: 20px">
        <el-dropdown size="medium">
         <span class="el-dropdown-link" style="cursor: pointer">
           {{ admin.userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
         </span>
          <el-dropdown-menu slot="dropdown" style="margin-top: -5px">
            <el-dropdown-item>
              <div style="width: 50px; text-align: center;" @click="logout">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- 侧边栏和主体-->
    <div style="display: flex">
      <!-- 侧边栏导航 -->
      <div
          style="width: 200px; min-height: calc(100vh - 62px); overflow: hidden; margin-right: 2px; background-color: white;">
        <!-- :default-openeds="['user', 'user']"可以设置默认打开的子菜单，等号右边的值是子菜单的index构成的数组 -->
        <el-menu :default-active="$route.path"
                 router class="el-menu-demo">
          <el-menu-item index="/">
            <i class="el-icon-edit"></i>
            <span>选课</span>
          </el-menu-item>
          <el-menu-item index="/classlist">
            <i class="el-icon-reading"></i>
            <span>我的课程信息</span>
          </el-menu-item>

        </el-menu>
      </div>

      <!-- 主体数据 -->
      <div style="flex: 1; background-color: white; padding: 10px">
        <!-- 展示子路由：把子路由嵌在这里 -->
        <router-view/>
      </div>

    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "StudentLayout.vue",
  data() {
    return {
      admin: Cookies.get('admin') ? JSON.parse(Cookies.get("admin")) : {}
    }
  },
  methods: {
    logout() {
      Cookies.remove('admin');
      this.$router.push('/login');
      // 清除浏览器用户数据

    }
  }
}
</script>

<style scoped>

</style>