<template>
  <div>
    <div>
      <el-steps :active="4" simple>
        <el-step title="填写课程信息" icon="el-icon-edit"></el-step>
        <el-step title="上传课程图片" icon="el-icon-upload"></el-step>
        <el-step title="添加教学计划" icon="el-icon-s-order"></el-step>
        <el-step title="发布课程" icon="el-icon-success"></el-step>
      </el-steps>
    </div>
    <h3 style="margin: 10px 0">课程名称：{{courseItem.courseName}}</h3>


  </div>
</template>

<script>
  import {queryCourse} from '../../../../api/courseAdd'
  export default {
    name: 'courseSucces',
    data(){
      return{
        courseItem :{}
      }
    },
    created () {
      this.handleQueryCourse();
    },
    methods:{
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
      handleUpload(){

      }
    }
  }
</script>

<style scoped>

</style>
