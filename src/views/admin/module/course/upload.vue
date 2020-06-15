<template>
  <div>
    <div>
      <el-steps :active="2" simple>
        <el-step title="填写课程信息" icon="el-icon-edit"></el-step>
        <el-step title="上传课程图片" icon="el-icon-upload"></el-step>
        <el-step title="添加教学计划" icon="el-icon-s-order"></el-step>
        <el-step title="发布课程" icon="el-icon-success"></el-step>
      </el-steps>
    </div>
    <h3 style="margin: 10px 0">课程名称：{{courseItem.courseName}}</h3>
    <div style="width: 55%;margin-top: 20px">
<!--      <el-upload-->
<!--        class="upload-demo"-->
<!--        drag-->
<!--        name="file"-->
<!--        ref="courseUpload"-->
<!--        :data="uploadParam"-->
<!--        :auto-upload="false"-->
<!--        action-->
<!--        :http-request="uploadImg"-->
<!--        multiple>-->
        <el-upload
          class="upload-demo"
          drag
          name="file"
          ref="courseUpload"
          :data="uploadParam"
          :auto-upload="false"
          :on-success="handleImageSuccess"
          action="http://localhost:40001/file/record/upload"
          multiple>
        <!--        action="http://localhost:10001/fms/file/record/upload"-->
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
      </el-upload>
      <img v-show="isHidden" width="200px" height="200px" v-if="fileAbsolutePath != '' || fileAbsolutePath != null" :src="fileAbsolutePath" class="avatar">
    </div>
    <el-button v-show="!isHidden" @click="handleUpload" style="margin-top: 12px;" type="primary">上传</el-button>
    <el-button v-show="isHidden"  style="margin-top: 12px;" @click="handleNextStep">下一步</el-button>

  </div>
</template>

<script>
  import {queryCourse} from '../../../../api/courseAdd'
  import {changeStatus} from '../../../../api/courseAdd'
  import {uploadImagesAndDocument} from '../../../../api/upload'
  export default {
    name: 'courseUpload',
    data(){
      return{
        courseItem :{},
        isHidden:false,
        uploadParam:{
          userId: JSON.parse(localStorage.getItem("userId")),
          fromSystemId: this.$route.query.courseId,
          fileType:'0'
        },
        fileAbsolutePath:''
      }
    },
    created () {
      this.handleQueryCourse();
    },
    methods:{
      handleImageSuccess(res, file) {
        console.log(res)
        console.log(file)
        // this.fileAbsolutePath = res.data.fileAbsolutePath;
        if (res.success) {
          this.isHidden = true;
          this.fileAbsolutePath = res.data.fileAbsolutePath;
          this.handleChangeStatus()
        }
      },
      handleQueryCourse(){
        var param = {
          courseId:''
        }
        param.courseId = this.$route.query.courseId
        queryCourse(param).then(response => {
          this.courseItem = response.data.data[0]
          this.fileAbsolutePath = response.data.data[0].courseImageUrl
          if (response.data.data[0].courseImageUrl != null || response.data.data[0].courseImageUrl != ''){
            this.isHidden = true;
          }
        }).catch(error => {
          this.$message(error)
        })
      },
      handleUpload(){

        this.$refs.courseUpload.submit()
      },
      handleNextStep(){
        this.$router.push({
          path:'/admin/course/add/teachplan',
          query:{courseId : this.$route.query.courseId}
        })
      },
      handleChangeStatus(){
        var param = {
          courseId: this.$route.query.courseId,
          status:'2'
        }
        changeStatus(param).then(response => {
          if (response.data.success) {
            this.$message({
              message: '上传成功',
              type: 'success'
            });
          } else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
