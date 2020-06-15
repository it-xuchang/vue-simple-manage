<template>
  <div class="login-index">
    <div class="login-container">
      <el-form :model="loginForm" :rules="loginRules"
               status-icon
               ref="loginForm"
               label-position="left"
               label-width="0px"
               class="demo-ruleForm login-page">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="userAccount">
          <el-input type="text"
                    v-model="loginForm.userAccount"
                    auto-complete="off"
                    placeholder="请输入手机号或者邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    v-model="loginForm.password"
                    auto-complete="off"
                    placeholder="请输入密码"
                    @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>
        <div class="rememberme">
          <el-checkbox id="rememberme"
            v-model="loginForm.rememberMe"
            :checked="loginForm.rememberMe"
            v-on:click="checkItem()"
          >记住密码</el-checkbox>
        </div>

        <el-form-item style="width:100%;">
          <el-switch id="accountType"
            v-model="accountType"
            :aria-checked="accountType"
            active-text="教师登录"
            inactive-text="学生登录">
          </el-switch>
        </el-form-item>

        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="handleLogin()" :loading="logining">登录</el-button>
        </el-form-item>
        <el-row style="text-align: center; margin-top: -10px;;">
          <el-link type="primary" @click="handleForgetPassword">忘记密码</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary" @click="handleRegister()">用户注册</el-link>
        </el-row>
      </el-form>
    </div>
  </div>

</template>

<script>
  import { login } from '@/api/user'

  export default {
    name: 'Login',
    data: function () {
      return {
        loginForm: {
          userAccount: '',
          userType: '',
          userAccountType: '',
          password: '',
          rememberMe: false
        },
        accountType: true,
        loginRules: {
          userAccount: [{required: true, trigger: 'blur', message: '用户名不能为空'}],
          password: [{required: true, trigger: 'blur', message: '密码不能为空'}]
        },
        loading: false,
        redirect: undefined
      }
    },
    created () {
      this.handleRememberPassword()
    },
    methods: {
      handleLogin () {
        //切换用户的类型，教师或者学生
        if(this.accountType){
          this.loginForm.userType = '0';
        }else {
          this.loginForm.userType = '1';
        }
        //判断用户输入的是邮箱还是手机号码
        let phoneReg = /^1[3-9][0-9]{9}$/;  //以1开头第二位数字为3-9 的11位数字
        let emailReg= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (phoneReg.test(this.loginForm.userAccount)){
          this.loginForm.userAccountType = '0';
        }else if (emailReg.test(this.loginForm.userAccount)){
          this.loginForm.userAccountType = '1';
        }else {
          this.$message.error("账号格式输入有误");
        }
        //执行登录操作
        login(this.loginForm).then(response => {
          this.loading = true
          //登录成功，将响应的信息存进去内存中
          // console.log(response)
          let allCookies = document.cookie

          if (response.data.success) {
            //记住密码
            if (this.loginForm.rememberMe){
              //设置cookie
              this.setCookie("rememberMe",this.loginForm.rememberMe,7)
              this.setCookie("userAccount",this.loginForm.userAccount,7)
              this.setCookie("password",this.loginForm.password,7)
              this.setCookie("userType",this.loginForm.userType,7)
            }else {
              //删除cookie
              this.delCookie("rememberMe")
              this.delCookie("userAccount")
              this.delCookie("password")
              this.delCookie("userType")
            }
            //设置缓存
            localStorage.setItem('roleId', JSON.stringify(response.data.data.roleId))
            localStorage.setItem('userId', JSON.stringify(response.data.data.userId))
            localStorage.setItem('userType', JSON.stringify(this.loginForm.userType))
            localStorage.setItem('token', JSON.stringify(response.data.data.token))
            // localStorage.setItem('menus', JSON.stringify(response.data.data.menus))

            //登录成功，跳转页面，学生跳转首页或者课程中心，教师跳转后台
            if (this.loginForm.userType == '0'){//教师
              var menuItem = response.data.data.menus;
              var userMenu = []
              menuItem.forEach(item => {
                if (item.type == '0'){
                  userMenu.push(item)
                }
              })
              localStorage.setItem('menus', JSON.stringify(userMenu))
              this.$router.push({
                path: '/admin/bashboard'
              })
            }else {//学生
              this.$confirm('登录成功，页面跳转！', '提示', {
                confirmButtonText: '进入个人中心',
                cancelButtonText: '返回主页',
                type: 'warning'
              }).then(() => {
                //切换页面-进入个人中心
                this.$router.push({
                  path: '/person/personal'
                })
              }).catch(() => {
                //切换页面-返回主页
                this.$router.push({
                  path: '/'
                })
              });
            }

            this.loading = false
          }else {//登录失败的返回信息
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          // 当请求错误时，提示错误信息
          this.loading = false
          this.$message(error)
        })
      },
      handleRegister(){
        this.$router.push({
          path: '/register'
        })
      },
      handleForgetPassword(){
        this.$router.push({
          path: '/forget'
        })
      },
      handleRememberPassword(){
        if (this.getCookie("rememberMe") != null && this.getCookie("rememberMe")){
          this.loginForm.userAccount = this.getCookie("userAccount")
          this.loginForm.password = this.getCookie("password")
          this.loginForm.userType = this.getCookie("userType")
          this.loginForm.rememberMe = this.getCookie("rememberMe")
          if(this.getCookie("userType") == '0'){
            this.accountType = true;
          }else {
            this.accountType = false;
          }
        }
      },
      setCookie: function (cookieName, cookieValue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + "; " + expires;
      },
      getCookie(cookieName){
        var arr, reg = new RegExp("(^| )" + cookieName + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
          return unescape(arr[2]);
        } else {
          return null;
        }
      },
      delCookie(cookieName){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(cookieName);
        if (cval != null) {
          document.cookie = cookieName + "=" + cval + ";expires=" + exp.toGMTString();
        }
      },
      checkItem:function(){
        this.loginForm.rememberMe = !this.loginForm.rememberMe;
      }

    }
  }
</script>

<style scoped>
  /*.login-index{*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*  background-image:url(	https://docs-1255840532.cos.ap-shanghai.myqcloud.com/3968.jpg );*/
  /*  background-size: cover;*/
  /*}*/
  .login-container {
    width: 100%;
    height: 100%;
  }
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
  .rememberme{
    margin-left: -270px;
  }
</style>
