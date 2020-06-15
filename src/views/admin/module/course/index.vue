<template>
  <div class="container">
    <div class="handle-box">
      <el-select style="width: 120px" v-model="courseQueryParam.category"  placeholder="请选择分类">
        <el-option v-for="item in categoryItem" :key="item" :label="item.categoryName" :value="item.categoryId"></el-option>
      </el-select>
      <el-input  placeholder="课程名称" v-model="courseQueryParam.courseName" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
    </div>
    <div class="conten-list">
      <div class="Recommend">
        <div class="content" >
          <div class="recom-item" v-for="item in baseCourse.datas">
            <p>
              <img v-if="item.courseImageUrl != null || item.courseImageUrl != ''" :src="item.courseImageUrl" width="100%" alt="">
              <img height="150px" v-if="item.courseImageUrl == null || item.courseImageUrl == ''" src="../../../../assets/upload.png" width="100%" alt="">
              <span class="lab">HOT</span>
            </p>
            <ul>
              <li>{{item.courseName}}</li>
              <li><span>{{item.grade}}课程</span> <em> · </em>{{item.status == '0' ? "已发布":""}}{{item.status == '1' || item.status == '2'? "未发布":""}}{{item.status == '3' ? "已下线":""}}</li>
            </ul>
            <div style="margin-bottom:15px;margin-left: 18%">
              <el-button size="mini" @click="handleCourseDetail(item.courseId)" type="primary">查看详情</el-button>
              <el-button size="mini" @click="handleChangeNext(item.status,item.courseId)">
                <span v-if="item.status == '0'">已完成</span>
                <span v-if="item.status == '1'">下一步</span>
                <span v-if="item.status == '2'">下一步</span>
                <span v-if="item.status == '3'">上线</span>
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="clearfix"></div>
    <!--分页栏-->
    <div class="personal-page">
      <el-row>
        <el-col span="24">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="baseCourse.pageNum"
              :page-sizes="[5,10,15,20,25]"
              :page-size="baseCourse.pageSize"
              background="true"
              layout="total, sizes, prev, pager, next, jumper"
              :total="baseCourse.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {queryCourse} from '@/api/courselist'
  import {queryCourseCategory} from '../../../../api/courseAdd'
  export default {
    name: 'courseList',
    data(){
      return{
        courseQueryParam:{
          courseName:'',
          teacherId:JSON.parse(localStorage.getItem("userId")),
          category:'',
          pageNum:'1',
          pageSize:'10'
        },
        baseCourse:{},
        categoryItem:[],
      }
    },
    created () {
      this.handleQueryCourseCategory();
      this.handleQueryCourse();
    },
    methods:{
      handleSizeChange(val) {
        this.courseQueryParam.pageSize = val
        this.handleQueryCourse();
      },
      handleCurrentChange(val) {
        this.courseQueryParam.pageNum = val
        this.handleQueryCourse();
      },
      handleQueryCourseCategory(){
        queryCourseCategory().then(response => {
          this.categoryItem = response.data.data;
        }).catch(error => {
          this.$message(error)
        })
      },
      handleQueryCourse(){
        queryCourse(this.courseQueryParam).then(response => {
          this.baseCourse = response.data.data
        }).catch(error => {
          this.$message(error)
        })
      },
      handleSearch(){
        this.handleQueryCourse();
      },
      handleChangeNext(status,courseId){
        if (status == '1'){
          this.$router.push({
            path:'/admin/course/upload',
            query:{
              courseId:courseId
            }
          })
        }else if (status == '2'){
          this.$router.push({
            path:'/admin/course/add/teachplan',
            query:{
              courseId:courseId
            }
          })
        }
      },
      handleCourseDetail(courseId){
        this.$router.push({
          path:'/admin/course/detail',
          query:{
            courseId:courseId
          }
        })
      }
    }
  }
</script>

<style scoped>
  .handle-box{
    margin-bottom: 20px;
  }
  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .mr10 {
    margin-right: 10px;
  }
  .course-consel{
    margin-top: -20px;
  }
  .conten-list {
    width: 100%;
  }
  .conten-list .Recommend .title {
    position: relative;
    font-size: 20px;
    text-align: left;
  }

  .conten-list .Recommend .title .queryall {
    position: absolute;
    font-size: 12px;
    color: #787d82;
    top: 10px;
    right: 20px;
  }

  .conten-list .Recommend .title-class {
    margin-top: 30px;
    margin-bottom: 15px;
    position: relative;
    font-size: 20px;
    text-align: left;
  }

  .conten-list .Recommend .title-class .course-nav {
    display: inline-block;
    max-width: 385px;
    font-size: 16px;
    position: relative;
    left: 50%;
    color: #787d82;
    transform: translateX(-70%);
  }

  .conten-list .Recommend .title-class .course-nav span {

    display: inline-block;
    padding: 0 30px;
  }
  .conten-list .Recommend .title-class .course-nav a {
    display: inline-block;
    padding: 0 30px;
    color: #00a0e9;
  }

  .conten-list .Recommend .title-class a {
    position: absolute;
    font-size: 12px;
    color: #787d82;
    top: 10px;
    right: 20px;
  }

  .conten-list .Recommend .content {
    overflow: hidden;
    padding: 3px;
    /*display: flex;
    justify-content: space-around;*/
  }

  .conten-list .Recommend .content div:nth-child(5n+1) {
    margin-left: 0px;
  }

  .conten-list .Recommend .content .recom-item {
    background: #fff;
    margin: 10px 0;
    width: 17%;
    height-max: 390px;
    margin-right: 35px;
    float: left;
  }

  .conten-list .Recommend .content .recom-item p {
    position: relative;
  }

  .conten-list .Recommend .content .recom-item p .lab {
    font-size: 12px;
    text-align: center;
    width: 41px;
    height: 24px;
    line-height: 22px;
    color: #f07700;
    position: absolute;
    right: -5px;
    top: 10px;
    background: url(../../../../assets/img/widget-hotIco.png) no-repeat;
  }

  .conten-list .Recommend .content .recom-item ul {
    padding: 25px;
    font-size: 14px;
  }

  .conten-list .Recommend .content .recom-item ul li {
    list-style: none;
    /*超过的部分隐藏*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .conten-list .Recommend .content .recom-item ul li:nth-child(2) {
    margin-top: 20px;
    color: #999;
  }

  .conten-list .Recommend .content .recom-item ul li:nth-child(2) span {
    color: #ff7c2d;
  }

  .conten-list .Recommend .content .recom-item ul li:nth-child(2) em {
    font-weight: bold;
  }

  .conten-list .Recommend .content .recom-item a {
    color: #050505;
    text-decoration: none;
  }

  .conten-list .Recommend .content .recom-item{
    box-shadow: 0px 0px 4px #999;
  }

  .conten-list .course-box {
    overflow: hidden;
    margin-top: 20px;
  }

  .conten-list .course-box .title {
    margin-bottom: 15px;
    position: relative;
    font-size: 20px;
    text-align: left;
  }
  .conten-list .course-box .title .queryall {
    position: absolute;
    font-size: 14px;
    color: #787d82;
    top: 10px;
    right: 20px;
  }
  .conten-list .course-box .title .course-nav {
    display: inline-block;
    max-width: 385px;
    font-size: 16px;
    position: relative;
    left: 50%;
    color: #787d82;
    transform: translateX(-70%);
  }
  .conten-list .course-box .title .course-nav a{
    color: #787d82;
  }
  .conten-list .course-box .title .course-nav span {
    display: inline-block;
    padding: 0 30px;
  }

  /*.conten-list .course-box .title a {*/
  /*  position: absolute;*/
  /*  font-size: 12px;*/
  /*  color: #787d82;*/
  /*  top: 10px;*/
  /*  right: 20px;*/
  /*}*/

  .conten-list .course-box .content .cont-left {
    width: 20%;
    /*max-width: 228px;*/
    float: left;
  }

  .conten-list .course-box .content .cont-right {
    width: 78%;
    /*max-width: 890px;*/
    float: right;
  }

  .conten-list .course-box .content .cont-right div:nth-child(2) {
    margin-left: 0;
  }

  .conten-list .course-box .content .cont-right .recom-item {
    background: #fff;
    margin: 15px 0;
    width: 23.5%;
    margin-left: 2%;
    float: left;
  }

  .conten-list .course-box .content .cont-right .recom-item p {
    position: relative;
  }

  .conten-list .course-box .content .cont-right .recom-item p .lab {
    font-size: 12px;
    text-align: center;
    width: 41px;
    height: 24px;
    line-height: 22px;
    color: #f07700;
    position: absolute;
    right: -5px;
    top: 10px;
    background: url(../../../../assets/img/widget-hotIco.png) no-repeat;
  }

  .conten-list .course-box .content .cont-right .recom-item ul {
    padding: 25px;
    font-size: 14px;
  }

  .conten-list .course-box .content .cont-right .recom-item ul li {
    list-style: none;
  }

  .conten-list .course-box .content .cont-right .recom-item ul li:nth-child(2) {
    margin-top: 20px;
    color: #999;
  }

  .conten-list .course-box .content .cont-right .recom-item ul li:nth-child(2) span {
    color: #ff7c2d;
  }

  .conten-list .course-box .content .cont-right .recom-item ul li:nth-child(2) em {
    font-weight: bold;
  }

  .conten-list .course-box .content .cont-right .recom-item a {
    color: #050505;
    text-decoration: none;
  }

  .conten-list .active {
    color: #00a4ff;
  }

</style>
