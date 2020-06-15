<template>
  <div>
    <div class="personal-header" >
    </div>
    <div class="container">
      <personal-nav></personal-nav>
      <div class="personal-content pull-right">
        <div class="personal-cont">
          <div class="top">
            <div class="tit"><span>我的信息</span></div>

            <div class="top-cont">
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
          </div>
        </div>
      </div>
    </div>
    <footerbar></footerbar>
  </div>


</template>

<script>
  import personalNav from '../../components/personalNav'
  import footerbar from '../../../../components/footerbar'
  import {queryTeacherDetail} from '@/api/setting'
  import {queryUserDetail} from '@/api/setting'
  import {editTeacherDetail} from '@/api/setting'
  import {editUserDetail} from '@/api/setting'
  export default {
    name: 'perosonalSetting',
    inject:['reload'],
    data() {
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
    components:{
      personalNav,
      footerbar
    },
    created () {
      this.handleQueryUserSettingDetail();
    },
    methods: {
      handleUpload(){

        this.$refs.userImgUpload.submit()
      },
      handleImageSuccess(res, file) {
        console.log(res)
        console.log(file)
        if (res.success) {
          this.dialogVisible = false
          this.reload();
        }
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleQueryUserSettingDetail() {
        var id = JSON.parse(localStorage.getItem("userId"));
        var userType = JSON.parse(localStorage.getItem("userType"));
        if (userType == '0'){//教师类型
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

        }else if (userType == '1'){//学生类型
          var userParam = {
            userId : id
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
      handleEditUserDetail(){
        var id = JSON.parse(localStorage.getItem("userId"));
        var userType = JSON.parse(localStorage.getItem("userType"));
        if (userType == '1') {//学生类型
          var param = {
            userId:'',
            username:'',
            email:'',
            mobile:'',
            sex:'',
            description:''
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
            }else {
              this.$message.error(response.data.returnMsg);
            }
          }).catch(error => {
            this.$message(error)
          })

        }else if (userType == '0') {//教师类型
          var param = {
            teacherId:'',
            teacherName:'',
            email:'',
            mobile:'',
            sex:'',
            description:''
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
            }else {
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
@import "../../../../assets/css/normalize.css";
@import "../../../../assets/bootstrap/dist/css/bootstrap.css";
html, body {
  min-height: 100%;
  height: 100%;
  min-width: 1000px;
  background: #f3f5f7;
}
/*用户信息*/
.user-detail{
  text-align: left;
}
.user-desc{
  width: 80%;
  margin-right: 20%;
  height: 300px;
}
/*用户信息*/

/*修改图片*/


.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/*修改图片*/

a {
  color: #2da1e7;
}

a:hover {
  color: #2da1e7;
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6, p {
  padding: 0px;
  margin: 0;
  line-height: 200%;
}

em, i {
  font-style: normal;
}

.cr-pd-mr {
  padding: 0px;
  margin: 0px;
}

.cl-red {
  color: red !important;
}

.cl-orange {
  color: #ff5a2c !important;
}

.ft-cen {
  text-align: center;
}

.more {
  color: #2da1e7;
}

.cl-basics {
  color: #00a4ff;
}

.hv-poin:hover {
  cursor: pointer;
}

.pd-left {
  padding-left: 15px;
}

.pd-rit {
  padding-right: 15px;
}

.btn-primary {
  background: #00a4ff;
  border: none;
}

.cl-boder {
  border: none;
}

.hide {
  display: none;
}

.show {
  display: block;
}

/****
* icon 图标 common
****/
.i-chevron-top {
  display: inline-block;
  width: 13px;
  height: 10px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -83px 2px;
}

.i-chevron-bot {
  display: inline-block;
  width: 13px;
  height: 10px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -83px -6px;
}

.i-heart {
  display: inline-block;
  width: 20px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -104px 0px;
}

.i-star {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -57px 0px;
}

.i-weixin {
  display: inline-block;
  width: 18px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 0px 1px;
}

.i-qq {
  display: inline-block;
  width: 18px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -26px 0px;
}

.i-answer {
  display: inline-block;
  width: 16px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -133px 0px;
}

.i-browse {
  display: inline-block;
  width: 15px;
  height: 12px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 0px -20px;
}

.i-problem {
  display: inline-block;
  width: 23px;
  height: 19px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -133px -21px;
}

.i-node {
  display: inline-block;
  width: 23px;
  height: 19px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -102px -21px;
}

.i-edt {
  display: inline-block;
  width: 16px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -22px -19px;
}

.i-del {
  display: inline-block;
  width: 15px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -43px -19px;
}

.i-laud {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -64px -19px;
}

.i-coll {
  display: inline-block;
  width: 15px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 1px -35px;
}

.i-play {
  display: inline-block;
  width: 14px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -22px -35px;
  margin-right: 8px;
}

/*
 * colors variables
 */
header {
  width: 100%;
  background: #fff;
}

header a {
  color: #333;
}

header a:hover {
  color: #ff7c2d;
  text-decoration: none;
}

header .navbar {
  min-width: 1024px;
  margin: 0 auto;
  border-radius: 0px;
  overflow: hidden;
}

header .navbar .logo {
  width: 195px;
  float: left;
  min-width: 110px;
  margin-right: 2%;
}

header .navbar .starch {
  float: right;
  min-width: 326px;
  margin-right: 5%;
}

header .navbar .sign-in {
  float: right;
}

header .navbar .sign-in a {
  color: #14191f;
}

header .navbar .sign-in span {
  color: #787d82;
}

header .navbar .sign-in .personal {
  color: #787d82;
}

header .navbar .sign-in .personal .personalIco::before {
  content: ' ● ';
  color: red;
  font-weight: bold;
  right: 1px;
  top: -8px;
  position: absolute;
}

header .navbar .sign-in .personal span {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  top: 6px;
  margin-left: 8px;
  background: url(../../../../assets/img/asset-personalIco.png) no-repeat;
}

header .navbar .sign-in .myInfo {
  color: #787d82;
}

header .navbar .sign-in .myInfo img {
  display: inline-block;
  margin: 0 5px;
  position: relative;
  top: -2px;
  width: 25px;
  height: 25px;
  border-radius: 25px;
}

header .navbar-nav {
  font-size: 18px;
  margin: 0 20px;
  font-weight: bold;
  color: #333;
}

header .navbar-nav li a {
  padding: 9px 15px !important;
}

header .active {
  border-bottom: solid 2px #00a4ff;
}

header .sign-in {
  margin-top: 12px;
  margin-right: 0px;
}

header .sign-in a {
  color: #00a4ff;
}

header .learingHeader {
  max-width: 1366px;
  margin: 0 auto;
  background: #fff;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
}

header input {
  height: 35px;
  margin-top: 7px;
}

header .input-search {
  border: solid 2px #00a4ff;
  width: 280px;
  padding-left: 10px;
}

header .search-buttom {
  border: solid 2px #00a4ff;
  background: #00a4ff;
  color: #fff;
  font-weight: bold;
  width: 14%;
  max-width: 80px;
  border-radius: 0;
  position: relative;
  top: -1px;
}
.personal-page{
  margin: 15px 0;
}

/*
 * colors variables
 */
footer {
  width: 100%;
  background: #fff;
  margin-top: 20px;
  padding: 40px 0;
  line-height: 260%;
}

footer .btn-primary {
  min-width: 100px;
  margin-top: 10px;
}

footer img {
  position: relative;
  top: -8px;
  left: 0px;
}

footer dt {
  margin-bottom: 20px;
}

footer dd {
  line-height: 200%;
}

/*
 * colors variables
 */
html, body {
  min-height: 100%;
  height: 100%;
  min-width: 1000px;
  background: #f3f5f7;
}

a {
  color: #2da1e7;
}

a:hover {
  color: #2da1e7;
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6, p {
  padding: 0px;
  margin: 0;
  line-height: 200%;
}

em, i {
  font-style: normal;
}

.cr-pd-mr {
  padding: 0px;
  margin: 0px;
}

.cl-red {
  color: red !important;
}

.cl-orange {
  color: #ff5a2c !important;
}

.ft-cen {
  text-align: center;
}

.more {
  color: #2da1e7;
}

.cl-basics {
  color: #00a4ff;
}

.hv-poin:hover {
  cursor: pointer;
}

.pd-left {
  padding-left: 15px;
}

.pd-rit {
  padding-right: 15px;
}

.btn-primary {
  background: #00a4ff;
  border: none;
}

.cl-boder {
  border: none;
}

.hide {
  display: none;
}

.show {
  display: block;
}

/****
* icon 图标 common
****/
.i-chevron-top {
  display: inline-block;
  width: 13px;
  height: 10px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -83px 2px;
}

.i-chevron-bot {
  display: inline-block;
  width: 13px;
  height: 10px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -83px -6px;
}

.i-heart {
  display: inline-block;
  width: 20px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -104px 0px;
}

.i-star {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -57px 0px;
}

.i-weixin {
  display: inline-block;
  width: 18px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 0px 1px;
}

.i-qq {
  display: inline-block;
  width: 18px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -26px 0px;
}

.i-answer {
  display: inline-block;
  width: 16px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -133px 0px;
}

.i-browse {
  display: inline-block;
  width: 15px;
  height: 12px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 0px -20px;
}

.i-problem {
  display: inline-block;
  width: 23px;
  height: 19px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -133px -21px;
}

.i-node {
  display: inline-block;
  width: 23px;
  height: 19px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -102px -21px;
}

.i-edt {
  display: inline-block;
  width: 16px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -22px -19px;
}

.i-del {
  display: inline-block;
  width: 15px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -43px -19px;
}

.i-laud {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -64px -19px;
}

.i-coll {
  display: inline-block;
  width: 15px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 1px -35px;
}

.i-play {
  display: inline-block;
  width: 14px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -22px -35px;
  margin-right: 8px;
}

.personal-header {
  background: top center no-repeat #26abe7;
  background-size: cover;
  position: relative;
  top: -10px;
  padding: 20px 0;
  height: 200px;
}

.personal-header .personal-info {
  width: 1170px;
  margin: 0 auto;
  padding-left: 250px;
  padding-top: 40px;
  color: #fff;
}

/*
 * colors variables
 */
html, body {
  min-height: 100%;
  height: 100%;
  min-width: 1000px;
  background: #f3f5f7;
}

a {
  color: #2da1e7;
}

a:hover {
  color: #2da1e7;
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6, p {
  padding: 0px;
  margin: 0;
  line-height: 200%;
}

em, i {
  font-style: normal;
}

.cr-pd-mr {
  padding: 0px;
  margin: 0px;
}

.cl-red {
  color: red !important;
}

.cl-orange {
  color: #ff5a2c !important;
}

.ft-cen {
  text-align: center;
}

.more {
  color: #2da1e7;
}

.cl-basics {
  color: #00a4ff;
}

.hv-poin:hover {
  cursor: pointer;
}

.pd-left {
  padding-left: 15px;
}

.pd-rit {
  padding-right: 15px;
}

.btn-primary {
  background: #00a4ff;
  border: none;
}

.cl-boder {
  border: none;
}

.hide {
  display: none;
}

.show {
  display: block;
}

/****
* icon 图标 common
****/
.i-chevron-top {
  display: inline-block;
  width: 13px;
  height: 10px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -83px 2px;
}

.i-chevron-bot {
  display: inline-block;
  width: 13px;
  height: 10px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -83px -6px;
}

.i-heart {
  display: inline-block;
  width: 20px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -104px 0px;
}

.i-star {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -57px 0px;
}

.i-weixin {
  display: inline-block;
  width: 18px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 0px 1px;
}

.i-qq {
  display: inline-block;
  width: 18px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -26px 0px;
}

.i-answer {
  display: inline-block;
  width: 16px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -133px 0px;
}

.i-browse {
  display: inline-block;
  width: 15px;
  height: 12px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 0px -20px;
}

.i-problem {
  display: inline-block;
  width: 23px;
  height: 19px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -133px -21px;
}

.i-node {
  display: inline-block;
  width: 23px;
  height: 19px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -102px -21px;
}

.i-edt {
  display: inline-block;
  width: 16px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -22px -19px;
}

.i-del {
  display: inline-block;
  width: 15px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -43px -19px;
}

.i-laud {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -64px -19px;
}

.i-coll {
  display: inline-block;
  width: 15px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 1px -35px;
}

.i-play {
  display: inline-block;
  width: 14px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -22px -35px;
  margin-right: 8px;
}

.personal-nav {
  height: 550px;
  width: 200px;
  position: relative;
  z-index: 11;
  top: -70px;
  padding: 0px !important;
  background: #fff;
}

.personal-nav .title {
  font-size: 18px;
  text-align: center;
  line-height: 60px;
  font-weight: bold;
  color: #00a4ff;
}

.personal-nav .my-ico {
  width: 100%;
  text-align: center;
}

.personal-nav .my-ico img {
  box-shadow: 2px 2px 4px #000;
  width: 70%;
  margin: 0px auto;
  border-radius: 50%;
}

.personal-nav .my-ico p {
  text-align: center;
  line-height: 50px;
}

.personal-nav .active a {
  color: #00a4ff;
}

.personal-nav li a:hover, .personal-nav li a:active {
  color: #00a4ff;
}

.personal-nav li {
  color: #333;
}

.personal-nav a {
  padding-top: 5px !important;
  color: #333;
  font-size: 14px;
  line-height: 32px;
  border-bottom: dashed 1px #f4f4f4;
}

.personal-nav a:before {
  position: relative;
  top: 0px;
  font-size: 12px;
}

.personal-nav .item {
  background: #fff;
  padding: 20px 15px;
  padding-top: 0px;
}

.personal-nav .item a {
  display: block;
  text-decoration: none;
}

/*
 * colors variables
 */
html, body {
  min-height: 100%;
  height: 100%;
  min-width: 1000px;
  background: #f3f5f7;
}

a {
  color: #2da1e7;
}

a:hover {
  color: #2da1e7;
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6, p {
  padding: 0px;
  margin: 0;
  line-height: 200%;
}

em, i {
  font-style: normal;
}

.cr-pd-mr {
  padding: 0px;
  margin: 0px;
}

.cl-red {
  color: red !important;
}

.cl-orange {
  color: #ff5a2c !important;
}

.ft-cen {
  text-align: center;
}

.more {
  color: #2da1e7;
}

.cl-basics {
  color: #00a4ff;
}

.hv-poin:hover {
  cursor: pointer;
}

.pd-left {
  padding-left: 15px;
}

.pd-rit {
  padding-right: 15px;
}

.btn-primary {
  background: #00a4ff;
  border: none;
}

.cl-boder {
  border: none;
}

.hide {
  display: none;
}

.show {
  display: block;
}

/****
* icon 图标 common
****/
.i-chevron-top {
  display: inline-block;
  width: 13px;
  height: 10px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -83px 2px;
}

.i-chevron-bot {
  display: inline-block;
  width: 13px;
  height: 10px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -83px -6px;
}

.i-heart {
  display: inline-block;
  width: 20px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -104px 0px;
}

.i-star {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -57px 0px;
}

.i-weixin {
  display: inline-block;
  width: 18px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 0px 1px;
}

.i-qq {
  display: inline-block;
  width: 18px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -26px 0px;
}

.i-answer {
  display: inline-block;
  width: 16px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -133px 0px;
}

.i-browse {
  display: inline-block;
  width: 15px;
  height: 12px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 0px -20px;
}

.i-problem {
  display: inline-block;
  width: 23px;
  height: 19px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -133px -21px;
}

.i-node {
  display: inline-block;
  width: 23px;
  height: 19px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -102px -21px;
}

.i-edt {
  display: inline-block;
  width: 16px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -22px -19px;
}

.i-del {
  display: inline-block;
  width: 15px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -43px -19px;
}

.i-laud {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -64px -19px;
}

.i-coll {
  display: inline-block;
  width: 15px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 1px -35px;
}

.i-play {
  display: inline-block;
  width: 14px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -22px -35px;
  margin-right: 8px;
}

.personal-cont {
  padding: 0px 10px 10px 25px;
}

.personal-cont .top .tit {
  padding: 10px 0;
  font-size: 18px;
  line-height: 45px;
  font-weight: bold;
  color: #00a4ff;
}

.personal-cont .top .top-cont {
  position: relative;
  padding: 15px 15px 15px 51px;
  background: #fff;
}

.personal-cont .top .top-cont .imgIco {
  position: absolute;
  left: -55px;
  top: 10px;
}

.personal-cont .top .top-cont .title {
  font-size: 26px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.personal-cont .top .top-cont .title .lab {
  position: relative;
  top: -3px;
  margin-right: 10px;
  font-size: 18px;
  color: #333;
}

.personal-cont .top .top-cont .title .status {
  margin-left: 10px;
  border: solid 1px #ff7c2d;
  display: inline-block;
  position: relative;
  top: -3px;
  padding: 3px 10px;
  color: #ff7c2d;
  font-size: 15px;
}

.personal-cont .top .top-cont .about {
  font-size: 18px;
  color: #00a4ff;
}

.personal-cont .top .top-cont .about .lab {
  font-size: 16px;
}

.personal-cont .top .top-cont .about .data {
  font-size: 18px;
  color: #999;
}

.personal-cont .top .top-cont .about::before {
  content: ' ';
  display: inline-block;
  position: relative;
  margin-right: 10px;
  top: 2px;
  width: 16px;
  height: 16px;
  /*background: url(../../../../assets/img/asset-play.png) center center no-repeat;*/
}

.personal-cont .top .top-cont .rate {
  margin-top: 20px;
  margin-bottom: 20px;
}

.personal-cont .top .top-cont .rate li {
  display: inline-block;
  list-style: none;
  width: 15px;
  height: 15px;
  margin-right: 10px;
  border-radius: 50%;
  border: solid 1px rgba(0, 164, 255, 0.5);
}

.personal-cont .top .top-cont .rate .active {
  background: rgba(0, 164, 255, 0.5);
  border: solid 0px rgba(0, 164, 255, 0.5);
}

.personal-cont .top .top-cont .goLear {
  display: inline-block;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;
  width: 160px;
  line-height: 36px;
  color: #fff;
  background: #ff7c2d;
  border: solid 1px #ff7c2d;
}

.personal-cont .top .top-cont .evalu {
  display: inline-block;
  font-weight: bold;
  text-align: center;
  width: 160px;
  color: #ff7c2d !important;
  line-height: 36px;
  color: #000;
  background: #fff;
  border: solid 1px #ff7c2d;
}

.personal-cont .top .top-cont .division {
  width: 2px;
  height: 180px;
  position: absolute;
  top: 0px;
  right: 33%;
  background: #f3f5f7;
}

.personal-cont .top .top-cont .division::after, .personal-cont .top .top-cont .division::before {
  content: ' ';
  display: inline-block;
  position: relative;
  top: -10px;
  left: -5px;
  background: #f3f5f7;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.personal-cont .top .top-cont .division::after {
  top: 154px;
}

.personal-cont .top .top-cont .text-right {
  text-align: center;
}

.personal-cont .top .top-cont .btn-primary {
  position: relative;
  top: 50px;
}

.personal-cont .my-course {
  padding: 0px;
}

.personal-cont .my-course .title {
  padding: 10px 0;
  font-size: 18px;
  line-height: 45px;
  font-weight: bold;
}

.personal-cont .my-course .title .lab-title {
  font-size: 18px;
  color: #00a4ff;
}

.personal-cont .my-course .title .tit-Item {
  background: #fff;
  padding: 0 10px;
  line-height: 15px;
  color: #333;
}

.personal-cont .my-course .title .tit-Item span {
  padding: 10px 0;
  display: inline-block;
  font-size: 14px;
}

.personal-cont .my-course .title .tit-Item span em {
  display: inline-block;
  padding: 0 20px;
  border-right: solid 1px #999;
}

.personal-cont .my-course .title .tit-Item span em:last-child {
  border: none;
}

.personal-cont .my-course .title .tit-Item span:last-child {
  float: right;
}

.personal-cont .my-course .title .tit-Item .active {
  color: #00a4ff;
}

.personal-cont .my-course .cont .col-lg-6 {
  padding: 0px;
}

.personal-cont .my-course .cont .item {
  background: #fff;
  position: relative;
  padding-bottom: 10px;
}

.personal-cont .my-course .cont .item .imgIco {
  position: absolute;
  left: -4px;
  top: 30px;
}

.personal-cont .my-course .cont .item .title {
  font-size: 22px;
  color: #000;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 20px;
  line-height: 14px;
  padding: 30px 0px 0 70px;
}

.personal-cont .my-course .cont .item .title .lab {
  position: relative;
  top: -2px;
  margin-right: 10px;
  font-size: 16px;
  color: #333;
}

.personal-cont .my-course .cont .item .title .status {
  margin-left: 10px;
  border: solid 1px #ff7c2d;
  display: inline-block;
  position: relative;
  top: -3px;
  padding: 3px 10px;
  color: #ff7c2d;
  font-size: 15px;
}

.personal-cont .my-course .cont .item .title .out {
  color: #999;
  border-color: #999;
}

.personal-cont .my-course .cont .item .title .outst {
  color: #50b400;
  border-color: #50b400;
}

.personal-cont .my-course .cont .item .about {
  font-size: 18px;
  padding: 10px 10px 10px 70px;
  color: #00a4ff;
}

.personal-cont .my-course .cont .item .about .lab {
  font-size: 16px;
}

.personal-cont .my-course .cont .item .about::before {
  content: ' ';
  display: inline-block;
  position: relative;
  margin-right: 10px;
  top: 2px;
  width: 16px;
  height: 16px;
  /*background: url(../../../../assets/img/asset-play.png) center center no-repeat;*/
}

.personal-cont .my-course .cont .item .time {
  padding: 0px 10px 10px 70px;
  font-size: 14px;
  font-weight: 300;
  color: #333;
}

.personal-cont .my-course .cont .item .rate {
  margin-top: 10px;
  padding: 0px 15px 15px 70px;
}

.personal-cont .my-course .cont .item .rate li {
  display: inline-block;
  list-style: none;
  width: 15px;
  height: 15px;
  margin-right: 10px;
  border-radius: 50%;
  border: solid 1px rgba(0, 164, 255, 0.5);
}

.personal-cont .my-course .cont .item .rate .active {
  background: rgba(0, 164, 255, 0.5);
  border: solid 0px rgba(0, 164, 255, 0.5);
}

.personal-cont .my-course .cont .item .rate span {
  position: relative;
  top: -2px;
  color: #333;
}

.personal-cont .my-course .cont .item .rate span em {
  margin-left: 10px;
}

.personal-cont .my-course .cont .col-lg-6:nth-child(2n+1) .item {
  margin: 0px 5px 0px 0;
}

.personal-cont .my-course .cont .col-lg-6:nth-child(2n) .item {
  margin: 0px 0px 0px 5px;
}

.personal-cont .my-course .cont .comment {
  width: 100%;
  padding-left: 70px;
  margin-top: 40px;
  margin-bottom: 20px;
  color: #333;
}

.personal-cont .my-course .cont .comment .star-show {
  width: 109px;
  height: 19px;
  margin-top: 0px;
  display: inline-block;
  background: url(../../../../assets/img/asset-star-show.png) no-repeat;
  background-size: contain;
}

.personal-cont .my-course .cont .comment .star-show .score {
  display: inline-block;
}

.personal-cont .my-course .cont .comment .star-show .score i {
  display: none;
}

.personal-cont .my-course .cont .comment .text {
  display: inline-block;
  margin: 0 10px;
}

.personal-cont .my-course .cont .comment .text em {
  color: #ff7c2d;
}

.personal-cont .my-course .cont .parting {
  width: 100%;
  height: 20px;
  position: relative;
  margin-top: 10px;
  border-top: solid 1px #f3f5f7;
}

.personal-cont .my-course .cont .parting::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  right: -5px;
  top: -5px;
  border-radius: 50%;
  background: #f3f5f7;
}

.personal-cont .my-course .cont .parting::before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  left: -5px;
  top: -5px;
  border-radius: 50%;
  background: #f3f5f7;
}

.personal-cont .my-course .cont .butItem {
  margin-bottom: 10px;
}

.personal-cont .my-course .cont .butItem a {
  margin: 0 15px;
  color: #999;
  font-weight: 300;
  padding: 4px 10px;
}

.personal-cont .my-course .cont .butItem .golearing {
  border: solid 1px #00a4ff;
  background: #00a4ff;
  color: #fff;
}

.personal-cont .my-course .cont .butItem .classcom {
  border: solid 1px #00a4ff;
  color: #00a4ff;
}

.personal-cont .help {
  margin-top: 10px;
  padding: 10px;
  font-size: 18px;
  background: #fff;
  color: #333;
}

.personal-cont .help span {
  margin-right: 40px;
}

.personal-cont .help span::before {
  position: relative;
  top: 2px;
  margin-right: 3px;
}

.personal-cont .aft {
  font-size: 15px;
  position: absolute;
  line-height: 10px;
  right: 10px;
  cursor: pointer;
  color: #999;
  top: 10px;
  font-weight: bold;
  text-align: right;
}

.personal-cont .aft ul {
  position: relative;
  top: 10px;
  padding: 15px;
  background: #fff;
}

.personal-cont .aft li {
  line-height: 34px;
  list-style: none;
}

.personal-cont .aft li a {
  color: #000;
}

.personal-cont .aft li:hover a {
  color: #00a4ff;
}

.personal-cont .ac {
  color: #00a4ff;
}

.personal-cont .ac ul {
  border: solid 1px #ddd;
}

.personal-cont #listcont {
  position: absolute;
  bottom: 9999px;
}

/*
 * colors variables
 */
html, body {
  min-height: 100%;
  height: 100%;
  min-width: 1000px;
  background: #f3f5f7;
}

a {
  color: #2da1e7;
}

a:hover {
  color: #2da1e7;
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6, p {
  padding: 0px;
  margin: 0;
  line-height: 200%;
}

em, i {
  font-style: normal;
}

.cr-pd-mr {
  padding: 0px;
  margin: 0px;
}

.cl-red {
  color: red !important;
}

.cl-orange {
  color: #ff5a2c !important;
}

.ft-cen {
  text-align: center;
}

.more {
  color: #2da1e7;
}

.cl-basics {
  color: #00a4ff;
}

.hv-poin:hover {
  cursor: pointer;
}

.pd-left {
  padding-left: 15px;
}

.pd-rit {
  padding-right: 15px;
}

.btn-primary {
  background: #00a4ff;
  border: none;
}

.cl-boder {
  border: none;
}

.hide {
  display: none;
}

.show {
  display: block;
}

/****
* icon 图标 common
****/
.i-chevron-top {
  display: inline-block;
  width: 13px;
  height: 10px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -83px 2px;
}

.i-chevron-bot {
  display: inline-block;
  width: 13px;
  height: 10px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -83px -6px;
}

.i-heart {
  display: inline-block;
  width: 20px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -104px 0px;
}

.i-star {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -57px 0px;
}

.i-weixin {
  display: inline-block;
  width: 18px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 0px 1px;
}

.i-qq {
  display: inline-block;
  width: 18px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -26px 0px;
}

.i-answer {
  display: inline-block;
  width: 16px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -133px 0px;
}

.i-browse {
  display: inline-block;
  width: 15px;
  height: 12px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 0px -20px;
}

.i-problem {
  display: inline-block;
  width: 23px;
  height: 19px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -133px -21px;
}

.i-node {
  display: inline-block;
  width: 23px;
  height: 19px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -102px -21px;
}

.i-edt {
  display: inline-block;
  width: 16px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -22px -19px;
}

.i-del {
  display: inline-block;
  width: 15px;
  height: 14px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -43px -19px;
}

.i-laud {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -64px -19px;
}

.i-coll {
  display: inline-block;
  width: 15px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: 1px -35px;
}

.i-play {
  display: inline-block;
  width: 14px;
  height: 13px;
  background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
  background-position: -22px -35px;
  margin-right: 8px;
}

.personal-content .go-problem-feedback {
  border-top: solid 2px #333;
  font-size: 24px;
  margin-top: 20px;
  padding: 20px 0;
}

.personal-content {
  width: 930px;
}
</style>
