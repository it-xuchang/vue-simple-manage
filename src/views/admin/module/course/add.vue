<template>
  <div>
    <div>
      <el-steps :active="1" simple>
        <el-step title="填写课程信息" icon="el-icon-edit"></el-step>
        <el-step title="上传课程图片" icon="el-icon-upload"></el-step>
        <el-step title="添加教学计划" icon="el-icon-s-order"></el-step>
        <el-step title="发布课程" icon="el-icon-success"></el-step>
      </el-steps>
    </div>
    <div style="width: 55%;margin-top: 20px">
      <el-form :model="courseForm" :rules="courseRules" ref="courseForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="课程名称：" prop="courseName">
          <el-input v-model="courseForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="适用群体：" prop="users">
          <el-input v-model="courseForm.users"></el-input>
        </el-form-item>
        <el-form-item label="课程分类" prop="category">
          <el-select v-model="courseForm.category" placeholder="请选择课程分类">
            <el-option v-for="item in categoryItem" :key="item" :label="item.categoryName" :value="item.categoryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程等级：" prop="grade">
          <el-input v-model="courseForm.grade"></el-input>
        </el-form-item>
        <el-form-item label="学习模式：" prop="studymodel">
          <el-input v-model="courseForm.studymodel"></el-input>
        </el-form-item>
        <el-form-item label="教学模式：" prop="teachmode">
          <el-input v-model="courseForm.teachmode"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" prop="description">
          <el-input type="textarea" rows="5" v-model="courseForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddCourse()">立即添加</el-button>
          <el-button @click="handleConnel()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  import {queryCourseCategory} from '../../../../api/courseAdd'
  import {addCourse} from '../../../../api/courseAdd'
  export default {
    name: 'courseList',
    data(){
      return{
        courseForm: {
          teacherId: JSON.parse(localStorage.getItem("userId")),
          courseName: '',
          users: '',
          category: '',
          grade: '',
          studymodel: '',
          teachmode: '',
          description: '',
        },
        courseRules: {
          courseName: [
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ],
          users: [
            { required: true, message: '请输入用户群体', trigger: 'blur' }
          ],
          studymodel: [
            {  required: true, message: '请输入学习模式', trigger: 'blur' }
          ],
          teachmode: [
            {  required: true, message: '请输入教学模式', trigger: 'blur' }
          ],
          description: [
            {  required: true, message: '请输入描述', trigger: 'blur' }
          ]
        },
        categoryItem:[]
      }
    },
    created () {
      this.handleQueryCourseCategory()
    },
    methods:{
      handleQueryCourseCategory(){
        queryCourseCategory().then(response => {
          this.categoryItem = response.data.data;
        }).catch(error => {
          this.$message(error)
        })
      },
      handleAddCourse(){
        addCourse(this.courseForm).then(response => {
          if (response.data.success) {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$refs['courseForm'].resetFields()
            this.$router.push({
              path:'/admin/course/upload',
              query:{courseId : response.data.data.courseId}
            })
          } else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })
      },
      handleConnel(){
        this.$refs['courseForm'].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
