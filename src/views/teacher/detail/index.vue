<template>
<div class="index_main">
  <navbar></navbar>
  <div class="teacher-header">
    <div class="teacher-header-left">
      <img :src="teacherDetail.teacherImageUrl" width="200px" height="200px">
    </div>
    <div class="teacher-header-right">
      <div  class="teacher-header-content">
        <div class="teacher-detail-title">
          {{teacherDetail.teacherName}}
        </div>
        <div class="teacher-detail-content">
          <strong>课程总数：</strong>10
          <el-divider direction="vertical"></el-divider>
          <strong>课程总时长：</strong>2小时
          <el-divider direction="vertical"></el-divider>
          <strong>学生数：</strong>50人
        </div>

        <h3>教师描述：</h3>
        <div class="teacher-detail-desc">
          {{teacherDetail.description}}
        </div>
      </div>
    </div>
  </div>
  <el-divider></el-divider>
  <div class="teacher-content">
    <h3>教师课堂</h3>

  </div>
</div>
</template>

<script>

  import navbar from '../../../components/navbar'
  import {queryTeacher} from '../../../api/teacherDetail'
  export default {
    name: 'teacherDetail',
    data(){
      return {
        activeName: 'first',
        teacherDetail:{}
      }
    },
    created () {
      this.handleQueryTeacherDetail()
    },
    components:{
      navbar
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleQueryTeacherDetail(){
        var param ={
          teacherId:''
        }
        param.teacherId = this.$route.query.teacherId
        queryTeacher(param).then(response => {
          this.teacherDetail = response.data.data[0]
        }).catch(error => {
          this.$message(error)
        })
      }
    }
  }
</script>

<style scoped>
  .index_main{
    width:78%;
    height:100%;
    background:#ffffff;
    margin:0 auto;
  }
  /*头部*/
  .teacher-header{
    width: 100%;
    max-width: 1497.6px;
    height: 200px;
    margin: 20px 0;
    /*border-radius: 4px;*/
    /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
  }
  .teacher-header-left{
    width: 20%;
    height: 200px;
    float: left;
  }
  .teacher-header-right{
    width: 78%;
    height: 200px;
    float: left;
  }
  .teacher-header-content{
    float: left;
    text-align: left;
  }
  .teacher-detail-title{
    font-size: 30px;
  }
  .teacher-detail-content{
    font-size: 18px;
    margin: 10px 0;
  }
  .teacher-detail-desc{
    padding-right: 200px;
    /*background-color: #00a4ff;*/
    /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
    height: 60px;
    font-size: 15px;
  }
  .teacher-content{
    text-align: left;
  }

</style>
