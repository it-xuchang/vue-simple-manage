<template>
<div class="index_main" id="index_header">
  <!--头部-->
  <navbar></navbar>
  <!--头部 end-->
  <!--轮播图-->
  <div class="index_nav">
    <el-carousel :interval="10000" type="card" >
      <el-carousel-item v-for="item in navItem" :key="item">
        <a :href="item.systemNavUrl" target="_blank">
          <img :src="item.systemNavUrl" width="100%" height="100%">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
  <!--轮播图 end-->
  <!--精品推荐-->
  <div class="conten-list">
    <div class="Recommend">
      <div class="title">精品推荐<a href="#" class="queryall">查看全部</a></div>
      <div class="content" >
        <div class="recom-item" v-for="item in recommendedCourse" :key="item">
          <a  @click="handleRouterQueryRecommendedCourse(item.courseId)">
            <p><img :src="item.courseImageUrl" width="100%" alt=""><span class="lab">HOT</span></p>
            <ul>
              <li>{{item.courseName}} </li>
              <li><span>{{item.courseGrdle}}</span> <em> · </em> {{item.learningUser}}人在学习</li>
            </ul>
          </a>
        </div>
      </div>
    </div>
    <!--精品推荐 end-->
    <!--精品推荐 Java工程师 PHP工程师-->
    <div class="course-box" v-for="item in recommendedCourseDirection" key="recommendedCourseDirection">
      <div class="title">
        {{item.courseDirectionName}}
        <div class="course-nav" >
          <span class="active">热门课程</span>
          <span class="active">基础课程</span>
          <span class="active">高级课程</span>
        </div>
        <a class="queryall" href="#">查看全部</a>
      </div>
      <div class="content">
        <div class="cont-left">
          <!--<img :src="item.leftImageUrl" width="100%" alt="">-->
          <img src="http://134.175.30.90/group1/M00/00/00/rBAADV4JsK-AC4uaAAFA06l-mUI178_big.png" width="100%" alt="">
        </div>
        <div class="cont-right">
<!--          <div><img :src="item.headerImageUrl" width="100%" alt=""></div>-->
          <div><img src="http://134.175.30.90/group1/M00/00/00/rBAADV4JsIKATV_kAAFQiFsKYYI690_big.png" width="100%" alt=""></div>
          <div class="recom-item" v-for="subCourse in item.courseItem">
            <a @click="handleRouterQueryRecommendedCourse(subCourse.courseId)">
              <p><img :src="subCourse.courseImageUrl" width="100%" alt=""></p>
              <ul>
                <li>{{subCourse.courseName}} </li>
                <li><span>{{subCourse.courseGrdle}}</span> <em> · </em> {{subCourse.learningUser}}人在学习</li>
              </ul>
            </a>
          </div>

        </div>
      </div>
    </div>
    <!--精品推荐 Java工程师 PHP工程师 end-->
    <div class="container">
      <div class="teacher-list text-center">
        <div class="title"> 名师大咖
          <a class="queryall" href="#">申请加入</a>
        </div>
        <div class="first-box">
          <div class="teach-item" v-for="item in recommendedTeacher" :key="recommendedTeacher">
            <a @click="handleRouterQueryRecommendedTeacher(item.teacherId)">
              <img :src="item.teacherImageUrl" width="230px" height="230px" alt="">
              <span class="lab">{{item.learningUser}}人学习过</span>
              <ul class="teach-info">
                <li>{{item.teacherName}} <span>{{item.courseName}}</span></li>
              </ul>
            </a>
          </div>
          <div class="clearfix"></div>
        </div>

      </div>
    </div>

  </div>
  <!--尾部-->
<footerbar></footerbar>

  <!--返回顶部-->
  <el-backtop target="#index_header">返回</el-backtop>
</div>

</template>
<script>
import { querySystemNav } from '@/api/home'
import { queryCourseRecommendation } from '@/api/home'
import { queryRecommendationTeacher } from '@/api/home'
import { queryRecommendedCourseDirection } from '@/api/home'
import { queryCourseCategory } from '@/api/home'
import navbar from '../../components/navbar'
import footerbar from '../../components/footerbar'
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        //轮播图
        navItem:[],
        //课程分类
        categoryItem:[],
        //精品推荐
        recommendedCourse:[],
        //课程方向
        recommendedCourseDirection:[],
        //名师大咖
        recommendedTeacher:[],
        isHidden: false,
        isLogin: false
      };
    },
    components:{
      navbar,
      footerbar
    },
    created () {
      // this.handleQueryCourseCategory();
      this.handleQuerySystemNav();
      this.handleQueryCourseRecommendation();
      this.handleQueryRecommendationTeacher();
      this.handleQueryRecommendedCourseDirection();
      this.handleNavMenu();
    },
    mounted() {
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      //查询课程分类
      handleQueryCourseCategory(){
        queryCourseCategory().then(response => {
          if (response.data.success) {
            this.categoryItem = response.data.data
          }
        }).catch(error => {
          // 当请求错误时，提示错误信息
          this.$message(error)
        })
      },
      //处理轮播图
      handleQuerySystemNav(){
        querySystemNav().then(response => {
          if (response.data.success) {
            this.navItem = response.data.data
          }
        }).catch(error => {
          // 当请求错误时，提示错误信息
          this.$message(error)
        })
      },
      //处理精品推荐
      handleQueryCourseRecommendation(){
        queryCourseRecommendation({size: 5}).then(response => {
          if (response.data.success) {
            this.recommendedCourse = response.data.data
          }
        }).catch(error => {
          // 当请求错误时，提示错误信息
          this.$message(error)
        })
      },
      //课程方向
      handleQueryRecommendedCourseDirection(){
        queryRecommendedCourseDirection({size: 4}).then(response => {
          if (response.data.success) {
            this.recommendedCourseDirection = response.data.data
          }
        }).catch(error => {
          // 当请求错误时，提示错误信息
          this.$message(error)
        })
      },
      //名师大咖
      handleQueryRecommendationTeacher(){
        queryRecommendationTeacher({size: 5}).then(response => {
          if (response.data.success) {
            this.recommendedTeacher = response.data.data
          }
        }).catch(error => {
          // 当请求错误时，提示错误信息
          this.$message(error)
        })
      },
      handleNavMenu(){
        // console.log(JSON.stringify(this.$store.state.userId))
      },
      handleRouterQueryRecommendedCourse(id){
        let routeData = this.$router.resolve({
          path: '/course/detail',
          query: {  courseId: id }
        });
        window.open(routeData.href, '_blank');
      },
      handleRouterQueryRecommendedTeacher(id){
        let routeData = this.$router.resolve({
          path: '/teacher/detail',
          query: {  teacherId: id }
        });
        window.open(routeData.href, '_blank');
      }
    }
  }
</script>
<style scoped>
  /*页面布局*/
  .index_main{
    width:78%;
    height:100%;
    background:#ffffff;
    margin:0 auto;
  }
  a{ text-decoration:none}
  /*头部菜单*/
  /*.index_header{*/
  /*  max-width: 1497.6px;*/
  /*}*/
  .el-select .el-input {
    width: 50px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  /*轮播图*/
  .index_nav{
    margin-top: 20px;
  }
  .index_nav .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.5;
    line-height: 300px;
    margin: 0;
    height: 400px;
  }

  .index_nav .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .index_nav .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  /*精品推荐 Java工程师 PHP工程师*/
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

    display: flex;
    justify-content: space-around;
  }

  .conten-list .Recommend .content div:nth-child(5n+1) {
    margin-left: 0px;
  }

  .conten-list .Recommend .content .recom-item {
    background: #fff;
    margin: 10px 0;
    width: 18.8%;
    max-width: 270px;
    /*margin-left: 1.5%;*/
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
    background: url(../../assets/img/widget-hotIco.png) no-repeat;
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

  .conten-list .Recommend .content .recom-item:hover {
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
    background: url(../../assets/img/widget-hotIco.png) no-repeat;
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
  /*精品推荐 Java工程师 PHP工程师 end*/

  /*名师大咖*/
  .teacher-list {
    position: relative;
    overflow: hidden;
  }

  .teacher-list ul, .teacher-list li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .teacher-list .teach-item-adv {
    float: left;
  }

  .teacher-list .title {
    margin-bottom: 15px;
    position: relative;
    font-size: 20px;
    text-align: left;
  }

  .teacher-list .teach-item {
    position: relative;
    width: 18.8%;
    margin-left: 1.5%;
    float: left;
  }

  .teacher-list .teach-item .lab {
    position: absolute;
    background: url(../../assets/img/widget-learNumIco.png) no-repeat;
    width: 84px;
    line-height: 22px;
    height: 24px;
    color: #ff7c2d;
    font-size: 12px;
    padding: 0 5px;
    top: 210px;
    right: -1px;
    z-index: 9;
  }

  .teacher-list .teach-item .teach-info {
    text-align: left;
    padding: 10px;
    color: #fff;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    bottom: 0px;
    width: 100%;
    height: 52px;
  }
  .teacher-list .title .queryall {
    position: absolute;
    font-size: 14px;
    color: #787d82;
    top: 10px;
    right: 20px;
  }
  .teacher-list .first-box div:nth-child(1) {
    margin-left: 0;
  }

  .teacher-list .two-box {
    margin-top: 30px;
  }

  .teacher-list .two-box div:nth-child(1) {
    width: 39.1%;
  }
  /*名师大咖 end*/
  /*尾部*/
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
