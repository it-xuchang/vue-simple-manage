<template>
  <div>
    <div>
      <el-steps :active="3" simple>
        <el-step title="填写课程信息" icon="el-icon-edit"></el-step>
        <el-step title="上传课程图片" icon="el-icon-upload"></el-step>
        <el-step title="添加教学计划" icon="el-icon-s-order"></el-step>
        <el-step title="发布课程" icon="el-icon-success"></el-step>
      </el-steps>
    </div>
    <div style="width: 55%;margin-top: 20px">
      <el-form :model="teachplanForm" :rules="teachplanRules" ref="teachplanForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="课程名称：" >
          <el-input disabled v-model="courseItem.courseName"></el-input>
        </el-form-item>
        <el-form-item label="教学计划名称：" prop="teachplanName">
          <el-input v-model="teachplanForm.teachplanName"></el-input>
        </el-form-item>
        <el-form-item label="教学时长：" prop="timeLength">
          <el-input v-model="teachplanForm.timeLength"></el-input>
        </el-form-item>
        <el-form-item label="教学计划级别" prop="category">
          <el-select v-model="teachplanForm.parentId" placeholder="请选择教学计划级别">
            <el-option  label="一级目录" value=""></el-option>
            <el-option v-for="item in teachplanItem" :key="item" :label="item.teachplanName" :value="item.teachplanId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教学计划描述" prop="description">
          <el-input type="textarea" rows="5" v-model="teachplanForm.description"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleAddTeachplan()">立即添加</el-button>
          <el-button @click="handleConnel()">重置</el-button>

        </el-form-item>
        <el-form-item label="上传视频或文档" v-show="isShow">
          <el-upload
            class="upload-demo"
            drag
            name="mediaFile"
            ref="teachplanUpload"
            :data="uploadParam"
            :auto-upload="false"
            :on-success="handleImageSuccess"
            action="http://localhost:40001/file/record/upload/media"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">
              <el-button type="primary" @click="handleUpload()">上传</el-button>
              <el-button @click="handleNextStep()">下一步</el-button>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  import {changeStatus, queryCourse, queryCourseCategory} from '../../../../api/courseAdd'
  import {queryTeachplan} from '../../../../api/courseAdd'
  import {addTeachplan} from '../../../../api/courseAdd'
  export default {
    name: 'courseTeachplan',
    data(){
      return{
        teachplanForm: {
          teacherId: JSON.parse(localStorage.getItem("userId")),
          teachplanName: '',
          courseId: this.$route.query.courseId,
          parentId: '',
          timeLength: '',
          description: '',
        },
        courseItem :{},
        teachplanItem :[],
        uploadParam:{
          userId: JSON.parse(localStorage.getItem("userId")),
          courseId: this.$route.query.courseId,
          fromSystemId: ''
        },
        teachplanRules: {
          teachplanName: [
            { required: true, message: '请输入教学计划名称', trigger: 'blur' }
          ],
          timeLength: [
            { required: true, message: '请输入教学时长', trigger: 'blur' }
          ],
          description: [
            {  required: true, message: '请输入描述', trigger: 'blur' }
          ]
        },
        isShow:false,
        teachplanId:''
      }
    },
    created () {
      this.handleQueryCourse();
      this.handleQueryTeachplan();
    },
    methods:{
      handleImageSuccess(res, file) {
        console.log(res)
        console.log(file)
      },
      handleUpload(){

        this.$refs.teachplanUpload.submit()
      },
      handleQueryCourse(){
        var param = {
          courseId:''
        }
        param.courseId = this.$route.query.courseId
        queryCourse(param).then(response => {
          this.courseItem = response.data.data[0]

        }).catch(error => {
          this.$message(error)
        })
      },
      handleQueryTeachplan(){
        var param = {
          courseId:''
        }
        param.courseId = this.$route.query.courseId
        queryTeachplan(param).then(response => {

          let teachplans = []
          response.data.data[0].teachPlans.forEach(item => {
            if (item.parentId == null || item.parentId == ''){
              teachplans.push(item)
            }
          })
          this.teachplanItem = teachplans

        }).catch(error => {
          this.$message(error)
        })
      },
      handleNextStep(){
        this.$router.push({
          path:'/admin/course/add/success',
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
      },
      handleAddTeachplan(){
        addTeachplan(this.teachplanForm).then(response => {
          if (response.data.success) {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.uploadParam.fromSystemId = response.data.data.teachplanId
            this.isShow = true
            this.handleConnel();
            this.handleQueryTeachplan();
          } else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })
      },
      handleConnel(){
        this.$refs['teachplanForm'].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
