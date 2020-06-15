<template>
  <div class="index-header">
    <div class="logo">网络学习平台</div>
    <div class="back">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{fullPath}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="user-group">

      <div class="user">
        <el-dropdown>
          <el-avatar style="margin-top: 10px;"  :src="avatar"></el-avatar>
      <span class="el-dropdown-link" style="float: right;margin-left: 10px">
        {{username}}
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user">
              <el-link  @click="handlePersonalDetail()">个人信息</el-link>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-close">
              <el-link  @click="handleLogout()">退出登录</el-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

  </div>
</template>

<script>
  import { queryUserDetail } from '@/api/home'
  import { queryTeacherDetail } from '@/api/home'
  import bus from '../../../components/common/bus'
  export default {
    name: 'adminHeader',
    data(){
      return{
        username: '',
        avatar: '',
        fullPath:''
      }
    },
    created () {
      this.handleQueryUserDetail();
      this.handleBread();
      bus.$on('fullpath', msg => {
        this.handleBread();
      });
    },
    methods:{
      handleBread(){
        this.fullPath = localStorage.getItem("fullPath")
      },
      handleJoinTemplate(url){
        this.$router.push({
          path: url
        })
        bus.$emit('fullpath', this.msg);
        // this.reload();
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
      handlePersonalDetail(){
        this.fullPath = '个人信息';
        this.$router.push({
          path: '/admin/person/detail'
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

      }
    }
  }
</script>

<style scoped>
.index-header{
  width: 100%;
  height: 65px;
  position:absolute;
  top:0;
  line-height:65px;
  background-color: #e7edf0;
}
  .logo{
    float: left;
    width: 220px;
    line-height: 65px;
    font-size: 24px;
    vertical-align:middle;
    padding: 0px;
    text-align: center;
    display: table-cell;
  }
  .back{
    vertical-align:middle;
    text-align: center;
    display: table-cell;
    float: left;
    margin-top: 23px;
    margin-left: 10px;
  }
  .el-breadcrumb{
    font-size: 18px !important;
  }
  .user-group{
    float: right;
    margin-right: 50px;
  }
  .user{
    vertical-align:middle;
    padding: 0px;
    float: right;
    text-align: center;
    display: table-cell;
    margin-left: 3px;
    font-size: 18px
  }
</style>
