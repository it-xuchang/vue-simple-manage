<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <h3 class="title">用户登录</h3>
      <el-form-item prop="userAccount">
        <el-input v-model="loginForm.userAccount"  type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>

      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住我</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div  id="el-login-footer">
      <span> ⋅ </span>
      <a href="http://www.beian.miit.gov.cn" target="_blank"></a>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        userAccount: '13800138000',
        userType: '0',
        userAccountType: '0',
        password: '123456',
        rememberMe: false
      },
      loginRules: {
        userAccount: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  methods: {
    handleLogin () {
      login(this.loginForm).then(response => {
        this.loading = true
        //登录成功，将响应的信息存进去内存中
        if (response.data.success) {
          localStorage.setItem('menus', JSON.stringify(response.data.data.menus))
          localStorage.setItem('roleId', JSON.stringify(response.data.data.roleId))
          localStorage.setItem('userId', JSON.stringify(response.data.data.userId))
          // this.$store.saveToken(this.$store,);
          //切换页面
          this.loading = false
          this.$router.push({
            path: '/admin'
          })
          // router.replace({
          //   path: "/admin",
          //   query: { redirect: router.currentRoute.fullPath }
          // });
        }
      }).catch(error => {
        // 当请求错误时，提示错误信息
        this.loading = false
        this.$message(error)
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .index_main{
    width:78%;
    height:100%;
    background:#ffffff;
    margin:0 auto;
    /*position:absolute;*/
    /*top:0;*/
    /*bottom:0;*/
    /*left:0;*/
    /*right:0;*/
  }
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image:url(	https://docs-1255840532.cos.ap-shanghai.myqcloud.com/3968.jpg );
    background-size: cover;
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 385px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon{
      height: 39px;width: 14px;margin-left: 2px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    display: inline-block;
    height: 38px;
    float: right;
    img{
      cursor: pointer;
      vertical-align:middle
    }
  }
</style>
