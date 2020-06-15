<template>
  <div class="index_header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item >
        <el-link  @click="handleHome()">首页</el-link>
      </el-menu-item>
      <el-submenu >
        <template slot="title" >课程分类</template>
        <el-menu-item  v-for="item in categoryItem" :key="item">{{item.categoryName}}</el-menu-item>
      </el-submenu>
      <el-menu-item ><a href="https://www.baidu.com" target="_blank">联系我们</a></el-menu-item>

      <el-menu-item style="margin-left: 150px">
        <div class="el-menu-search">
          <el-input placeholder="请输入内容" v-model="courseName" class="input-with-select">
            <el-button slot="append" @click="handleSearch()" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-menu-item>

      <el-menu-item style="float:right" :hidden="!isLogin">
        <el-dropdown>
          <el-avatar :src="avatar"></el-avatar>
          <span>{{username}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-link icon="el-icon-s-platform"  @click="handlePersonal()">课程中心</el-link>
            </el-dropdown-item>
<!--            <el-dropdown-item>-->
<!--              <el-link icon="el-icon-s-home"  @click="handleLogout()">我的主页</el-link>-->
<!--            </el-dropdown-item>-->
            <el-dropdown-item icon="el-icon-s-order" :hidden="isHidden">
              <el-link  @click="handleDoAdmin()" >后台管理系统</el-link>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-close" >
              <el-link  @click="handleLogout()">退出登录</el-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
      <el-menu-item style="float: right" :hidden="isLogin">
        <el-row style="text-align: center; ">
          <el-link type="primary" @click="handleLogin" target="_blank">登录</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary" @click="handleRegister()" target="_blank">注册</el-link>
        </el-row>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import { queryCourseCategory } from '@/api/home'
  import { queryUserDetail } from '@/api/home'
  import { queryTeacherDetail } from '@/api/home'
  import bus from './common/bus'
  export default {
    name: 'navbar',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        //课程分类
        categoryItem:[],
        isHidden: false,
        isLogin: false,
        username: '',
        avatar: '',
        courseName:''
      };
    },
    created () {
      this.handleQueryCourseCategory();
      this.handleQueryUserDetail();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      //查询课程分类
      handleQueryCourseCategory(){
        queryCourseCategory().then(response => {
          if (response.data.success) {
            this.categoryItem = response.data.data
          }
        }).catch(error => {
          // 当请求错误时，提示错误信息
          this.$message(error)
        })
      },
      handleQueryUserDetail(){
        var id = JSON.parse(localStorage.getItem("userId"));
        var userType = JSON.parse(localStorage.getItem("userType"));
        if (userType == '0'){//教师类型
          var teacherParam = {
            teacherId: id
          }
          queryTeacherDetail(teacherParam).then(response => {
            if (response.data.returnCode == '401') {
              // 清空localStorege,可能之前存储了一些菜单之类的数据
              localStorage.clear();
            }
            this.username = response.data.data[0].teacherName;
            if (response.data.data[0].teacherImageUrl == null || response.data.data[0].teacherImageUrl == ''){
              this.avatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
            }else {
              this.avatar = response.data.data[0].teacherImageUrl;
            }
            this.isLogin = true
            this.isHidden = false
          }).catch(error => {
            this.$message(error)
          })

        }else if (userType == '1'){//学生类型
          var userParam = {
            userId : id
          }
          queryUserDetail(userParam).then(response => {
            if (response.data.returnCode == '401') {
              // 清空localStorege,可能之前存储了一些菜单之类的数据
              localStorage.clear();
            }
            this.username = response.data.data[0].username;
            if (response.data.data[0].userImageUrl == null || response.data.data[0].userImageUrl == ''){
              this.avatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
            }else {
              this.avatar = response.data.data[0].userImageUrl;
            }
            this.isLogin = true
            this.isHidden = true
          }).catch(error => {
            this.$message(error)
          })

        }else {//未登录
          this.isLogin = false
        }

      },
      handleRegister(){
        let routeData = this.$router.resolve({
          path: '/register'
        });
        window.open(routeData.href, '_blank');
      },
      handleLogin(){
        let routeData = this.$router.resolve({
          path: '/login'
        });
        window.open(routeData.href, '_blank');
      },
      handleLogout(){
        this.$confirm('是否确认退出！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.clear();
          this.$router.push({
            path: '/login'
          })
        }).catch(() => {
        });

      },
      handleHome(){
        this.$router.push({
          path: '/'
        })
      },
      handlePersonal(){
        this.$router.push({
          path: '/person/personal'
        })
      },
      handleSearchCourse(){
        this.$router.push({
          path: '/course/search'
        })
      },
      handleDoAdmin(){
        this.$router.push({
          path: '/admin/bashboard'
        })
      },
      handleSearch(){
        this.$router.push({
          path: '/course/search',
          query:{
            courseName: this.courseName
          }
        })
        bus.$emit('searchCourse', this.courseName);
      }
    }
  }
</script>

<style scoped>
  a{ text-decoration:none}
  /*头部菜单*/
  .index_header{
    max-width: 1497.6px;
  }
  .el-select .el-input {
    width: 50px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
