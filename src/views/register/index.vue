<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">用户注册</p>
        <el-form
          :model="registerForm"
          status-icon
          :rules="registerRules"
          ref="registerForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名：" prop="username">
            <el-input v-model="registerForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="用户账号：" prop="userAccount">
            <el-input v-model="registerForm.userAccount" auto-complete="off" placeholder="请输入手机号或者邮箱"></el-input>
          </el-form-item>
          <el-form-item  label="用户类型：" prop="userType">
            <el-select v-model="registerForm.userType" placeholder="请选择用户类型" class="register-select">
              <el-option label="教师类型" value="0"></el-option>
              <el-option label="学生类型" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPassword">
            <el-input type="password" v-model="registerForm.checkPassword" auto-complete="off" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleRegister()" style="width:100%;">注册</el-button>
            <p class="login" @click="gotoLogin">已有账号？立即登录</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import {register} from '@/api/register'
  export default {
    name: "Register",
    data: function () {
      return {
        registerForm: {
          username: "",
          userAccount: "",
          userType: "",
          password: "",
          checkPassword: "",
        },
        registerRules: {
          username: [{required: true, trigger: 'blur', message: '用户名不能为空'}],
          userAccount: [{required: true, trigger: 'blur', message: '用户账号不能为空'}],
          userType: [{required: true, trigger: 'blur', message: '用户类型不能为空'}],
          password: [{required: true, trigger: 'blur', message: '密码不能为空'}],
          checkPassword: [{required: true, trigger: 'blur', message: '确认密码不能为空'}]
        },

      }
    },
    methods: {
      gotoLogin() {
        this.$router.push({
          path: "/login"
        });
      },
      handleRegister() {
        //判断用户输入的是邮箱还是手机号码
        let phoneReg = /^1[3-9][0-9]{9}$/;  //以1开头第二位数字为3-9 的11位数字
        let emailReg= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        var registerParam = {
          username: "",
          email: "",
          mobile: "",
          userType: "",
          password: "",
        };
        if (this.registerForm.password != this.registerForm.checkPassword){
          this.$message.error("两个密码不一致");
          return
        }
        registerParam.password = this.registerForm.password;
        registerParam.username = this.registerForm.username;
        if (this.registerForm.userType == null|| this.registerForm.userType == ''){
          this.$message.error("请选择用户类型");
          return
        }
        registerParam.userType = this.registerForm.userType;
        if (phoneReg.test(this.registerForm.userAccount)){
          registerParam.mobile = this.registerForm.userAccount
        }else if (emailReg.test(this.registerForm.userAccount)){
          registerParam.email = this.registerForm.userAccount
        }else {
          this.$message.error("账号格式输入有误");
          return
        }
        register(registerParam).then(response => {
          if (response.data.success) {
            this.$message({
              message: '注册成功',
              type: 'success'
            });
            //切换页面
            this.$router.push({
              path: '/login'
            })
          }else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          // 当请求错误时，提示错误信息
          this.$message(error)
        })
      }
    }

  }
</script>

<style scoped>
  .loading-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #aedff8;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .register-wrapper img {
    position: absolute;
    z-index: 1;
  }
  #register {
    max-width: 450px;
    margin: 60px auto;
    background: #fff;
    padding: 20px 40px;
    border-radius: 10px;
    position: relative;
    z-index: 9;
    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)*/
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .register-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  .title {
    font-size: 26px;
    line-height: 50px;
    font-weight: bold;
    margin: 10px;
    text-align: center;
  }
  .el-form-item {
    text-align: center;
  }
  .login {
    margin-top: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #1ab2ff;
    cursor: pointer;
    text-align: left;
    text-indent: 8px;
    width: 160px;
  }
  .login:hover {
    color: #2c2fd6;
  }
  .code >>> .el-form-item__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .code button {
    margin-left: 20px;
    width: 140px;
    text-align: center;
  }
  .el-button--primary:focus {
    background: #409EFF;
    border-color: #409EFF;
    color: #fff;
  }
  .register-select{
    margin-left: -130px;
  }
</style>
