<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">忘记密码</p>
        <el-form
          :model="registerForm"
          status-icon
          :rules="registerRules"
          ref="registerForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户账号：" prop="userAccount">
            <el-input v-model="registerForm.userAccount" auto-complete="off" placeholder="请输入手机号或者邮箱"></el-input>
          </el-form-item>
          <el-form-item  label="用户类型：" prop="userType">
            <el-select v-model="registerForm.userType" placeholder="请选择用户类型" class="register-select" >
              <el-option label="学生类型" value="0"></el-option>
              <el-option label="教师类型" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="验证码："  prop="smscode" class="code">
            <el-input v-model="registerForm.smscode" placeholder="验证码"></el-input>
            <el-button type="danger" :disabled='isDisabled' @click="handleGetCode">{{buttonText}}</el-button>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPassword">
            <el-input type="password" v-model="registerForm.checkPassword" auto-complete="off" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="handleChangePassword()" style="width:100%;">提交</el-button>
            <p class="login" @click="gotoLogin">重新登录</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import {register} from '@/api/register'
  import {forgetPassword} from '@/api/forget'
  import {getCode} from '@/api/forget'
  export default {
    name: "Forget",
    data: function () {
      return {
        registerForm: {
          smscode: "",
          userAccount: "",
          userType: "",
          password: "",
          checkPassword: "",
        },
        registerRules: {
          smscode: [{required: true, trigger: 'blur', message: '验证码不能为空'}],
          userAccount: [{required: true, trigger: 'blur', message: '用户账号不能为空'}],
          userType: [{required: true, trigger: 'blur', message: '用户类型不能为空'}],
          password: [{required: true, trigger: 'blur', message: '密码不能为空'}],
          checkPassword: [{required: true, trigger: 'blur', message: '确认密码不能为空'}]
        },
        buttonText: '发送验证码',
        isDisabled: false, // 是否禁止点击发送验证码按钮
        flag: true,
        code: ''
      }
    },
    methods: {
      gotoLogin() {
        this.$router.push({
          path: "/login"
        });
      },
      handleGetCode() {
        var codeParam = {
          userAccount: "",
          userType: ""
        };
        if (this.registerForm.userAccount == null || this.registerForm.userAccount == ''){
          this.$message.error("请输入账号");
          return
        }
        codeParam.userType = this.registerForm.userType
        codeParam.userAccount = this.registerForm.userAccount

        let time = 60
        this.buttonText = '已发送'
        this.isDisabled = true
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + ' 秒'
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = '重新获取'
              this.isDisabled = false
              this.flag = true;
            }
          }, 1000)
        }

        getCode(codeParam).then(response => {
          if (response.data.success) {
            this.$message({
              message: '发送成功',
              type: 'success'
            });
            this.code = response.data.data;
            this.registerForm.smscode = response.data.data;
          }else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          // 当请求错误时，提示错误信息
          this.$message(error)
        })
      },
      handleChangePassword() {
        //判断用户输入的是邮箱还是手机号码
        let phoneReg = /^1[3-9][0-9]{9}$/;  //以1开头第二位数字为3-9 的11位数字
        let emailReg= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        var changeParam = {
          userType: "",
          userAccount: "",
          userAccountType: "",
          password: "",
          code: "",
        };
        if (this.registerForm.password != this.registerForm.checkPassword){
          this.$message.error("两个密码不一致");
          return
        }
        changeParam.password = this.registerForm.password;
        if (this.registerForm.userType == null|| this.registerForm.userType == ''){
          this.$message.error("请选择用户类型");
          return
        }
        changeParam.userType = this.registerForm.userType;
        if (phoneReg.test(this.registerForm.userAccount)){
          changeParam.userAccount = this.registerForm.userAccount
          changeParam.userAccountType = '0';
        }else if (emailReg.test(this.registerForm.userAccount)){
          changeParam.userAccount = this.registerForm.userAccount
          changeParam.userAccountType = '1';
        }else {
          this.$message.error("账号格式输入有误");
          return
        }
        if (this.registerForm.smscode != this.code){
          this.$message.error("验证码输入有误");
          return
        }
        changeParam.code = this.registerForm.smscode

        forgetPassword(changeParam).then(response => {
          if (response.data.success) {

            this.$confirm('修改成功, 是否登录?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              //切换页面
              this.$router.push({
                path: '/login'
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消'
              });
            });

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
