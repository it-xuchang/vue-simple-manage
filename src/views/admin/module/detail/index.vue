<template>
<div>
  <div>
    <el-button type="text" style="text-align: left;float: left" @click="dialogVisible = true">修改头像</el-button>
    <el-button type="text" style="text-align: left;float: left" @click="dialogFormVisible = true">修改信息</el-button>
  </div>
  <br>
  <el-divider></el-divider>
  <el-dialog
    id="updateDialog"
    title="修改头像"
    :visible.sync="dialogVisible"
    width="30%"
  ><!--:before-close="handleClose"-->
    <div>
      <el-upload
        class="upload-demo"
        drag
        name="file"
        ref="userImgUpload"
        :data="uploadParam"
        :auto-upload="false"
        :on-success="handleImageSuccess"
        action="http://localhost:40001/file/record/upload"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
      </el-upload>
    </div>
    <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleUpload()">确 定</el-button>
                </span>
  </el-dialog>

  <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible" width="40%">
    <el-form
      :model="userForm"
      status-icon
      :rules="userRules"
      ref="userForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="userForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="userForm.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item  label="性别：" prop="sex">
        <el-select v-model="userForm.sex" style="float: left" placeholder="请选择性别" >
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
          <el-option label="保密" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input  v-model="userForm.email" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" rows="5" v-model="userForm.desc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleQueryUserSettingDetail()">取 消</el-button>
      <el-button type="primary" @click="handleEditUserDetail()">确 定</el-button>
    </div>
  </el-dialog>

  <div class="user-detail">
    <p style="margin-bottom: 20px">
      <strong>姓名：</strong>{{userForm.username}}
      <el-divider direction="vertical"></el-divider>
      <strong>性别：</strong><span v-if="userForm.sex==0">男</span><span v-if="userForm.sex==1">女</span><span v-if="userForm.sex==2">保密</span>
      <el-divider direction="vertical"></el-divider>
      <strong>邮箱：</strong>{{userForm.email}}
    </p>
    <p style="margin-bottom: 20px">
      <strong>手机号：</strong>{{userForm.phone}}
      <el-divider direction="vertical"></el-divider>
      <strong>上次登录时间：</strong>{{userForm.lastLoginTime}}
    </p>

    <div class="user-desc">
      {{userForm.desc}}
    </div>
  </div>
</div>
</template>

<script>
  import {queryTeacherDetail} from '@/api/setting'
  import {queryUserDetail} from '@/api/setting'
  import {editTeacherDetail} from '@/api/setting'
  import {editUserDetail} from '@/api/setting'
  export default {
    name: 'personalDetail',
    inject:['reload'],
    data(){
      return{
        dialogVisible: false,
        dialogFormVisible: false,
        userForm: {
          username: "",
          phone: "",
          email: "",
          sex: "",
          desc: "",
          lastLoginTime:''
        },
        userRules: {
          username: [{required: true, trigger: 'blur', message: '用户名不能为空'}],
          phone: [{required: true, trigger: 'blur', message: '手机号不能为空'}],
          email: [{required: true, trigger: 'blur', message: '邮箱不能为空'}],
          sex: [{required: true, trigger: 'blur', message: '性别不能为空'}],
          desc: [{required: true, trigger: 'blur', message: '描述不能为空'}]
        },
        formLabelWidth: '100px',
        uploadParam:{
          userId: JSON.parse(localStorage.getItem("userId")),
          fromSystemId: JSON.parse(localStorage.getItem("userId")),
          fileType:'4'
        }
      }
    },
    created () {
      this.handleQueryUserSettingDetail();
    },
    methods: {
      handleUpload () {

        this.$refs.userImgUpload.submit()
      },
      handleImageSuccess (res, file) {
        console.log(res)
        console.log(file)
        if (res.success) {
          this.dialogVisible = false
          this.reload();
        }
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      handleQueryUserSettingDetail () {
        var id = JSON.parse(localStorage.getItem("userId"));
        var userType = JSON.parse(localStorage.getItem("userType"));
        if (userType == '0') {//教师类型
          var teacherParam = {
            teacherId: id
          }
          queryTeacherDetail(teacherParam).then(response => {

            this.userForm.username = response.data.data[0].teacherName;
            this.userForm.phone = response.data.data[0].mobile;
            this.userForm.email = response.data.data[0].email;
            this.userForm.sex = response.data.data[0].ssex;
            this.userForm.desc = response.data.data[0].description;
            this.userForm.lastLoginTime = response.data.data[0].lastLoginTime;
            this.dialogFormVisible = false
          }).catch(error => {
            this.$message(error)
          })

        } else if (userType == '1') {//学生类型
          var userParam = {
            userId: id
          }
          queryUserDetail(userParam).then(response => {

            this.userForm.username = response.data.data[0].username;
            this.userForm.phone = response.data.data[0].mobile;
            this.userForm.email = response.data.data[0].email;
            this.userForm.sex = response.data.data[0].ssex;
            this.userForm.desc = response.data.data[0].description;
            this.userForm.lastLoginTime = response.data.data[0].lastLoginTime;
            this.dialogFormVisible = false
          }).catch(error => {
            this.$message(error)
          })
        }
      },
      handleEditUserDetail () {
        var id = JSON.parse(localStorage.getItem("userId"));
        var userType = JSON.parse(localStorage.getItem("userType"));
        if (userType == '1') {//学生类型
          var param = {
            userId: '',
            username: '',
            email: '',
            mobile: '',
            sex: '',
            description: ''
          }
          param.userId = id
          param.username = this.userForm.username
          param.email = this.userForm.email
          param.mobile = this.userForm.phone
          param.sex = this.userForm.sex
          param.description = this.userForm.desc

          editUserDetail(param).then(response => {
            if (response.data.success) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              // this.userForm.username = param.username;
              // this.userForm.phone = param.mobile;
              // this.userForm.email = param.email;
              // this.userForm.sex = param.sex;
              // this.userForm.desc = param.description;
              this.reload();
              this.dialogFormVisible = false
            } else {
              this.$message.error(response.data.returnMsg);
            }
          }).catch(error => {
            this.$message(error)
          })

        } else if (userType == '0') {//教师类型
          var param = {
            teacherId: '',
            teacherName: '',
            email: '',
            mobile: '',
            sex: '',
            description: ''
          }
          param.teacherId = id
          param.teacherName = this.userForm.username
          param.email = this.userForm.email
          param.mobile = this.userForm.phone
          param.sex = this.userForm.sex
          param.description = this.userForm.desc

          editTeacherDetail(param).then(response => {
            if (response.data.success) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              // this.userForm.username = param.teacherName;
              // this.userForm.phone = param.mobile;
              // this.userForm.email = param.email;
              // this.userForm.sex = param.sex;
              // this.userForm.desc = param.description;
              this.reload();
              this.dialogFormVisible = false
            } else {
              this.$message.error(response.data.returnMsg);
            }
          }).catch(error => {
            this.$message(error)
          })

        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*用户信息*/
  .user-detail{
    text-align: left;
  }
  .user-desc{
    width: 80%;
    margin-right: 20%;
    height: 300px;
  }
</style>
