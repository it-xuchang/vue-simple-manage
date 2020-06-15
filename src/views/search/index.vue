<template>
  <div class="index_main">
    <!--头部-->
    <!--头部 end-->
    <navbar></navbar>
    <div class="course-search-container">

      <!--分类-->
      <div class="learing-list">
        <div class="list-box">
          <ul>
            <li>一级分类：</li>
            <li class="all">全部</li>
            <ol>
              <li v-for="item in categoryItem" @click="handleQueryCategory(item.categoryId)" :key="item">{{item.categoryName}}</li>
            </ol>
          </ul>
          <ul>
            <li>难度等级：</li>
            <li  class="all" @click="handleQueryGradle('')" >全部</li>
            <ol>
              <li v-for="item in gradleItem"  @click="handleQueryGradle(item)" :key="item">{{item}}</li>
            </ol>
          </ul>
        </div>
      </div>
      <!--分类end-->
      <!--课程列表-->
      <div class="course-list-main">
        <div class="course-list">
          <el-row >
            <el-col :span="18">
              <div class="conten-list">
                <div class="Recommend">
                  <div class="content" >
                    <div class="recom-item" v-for="item in courseSearch.datas" :key="item">
                      <a @click="handleCourseDetail(item.courseId)" target="_blank">
                        <p><img :src="item.courseImageUrl" width="100%" alt=""><span class="lab">HOT</span></p>
                        <ul>
                          <li>{{item.courseName}} </li>
                          <li><span>{{item.grade}}</span> <em> · </em> {{item.users}}可以学习</li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!--课程列表end-->
              <!--尾部分页-->
              <!--分页栏-->
              <div class="course-search-page">
                <el-row>
                  <el-col span="24">
                    <div class="block">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="courseSearch.pageNum"
                        :page-sizes="[8, 16, 24, 32]"
                        :page-size="courseSearch.pageSize"
                        background="true"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="courseSearch.total">
                      </el-pagination>
                    </div>
                  </el-col>
                </el-row>
              </div>

            </el-col>

            <el-col :span="6">
              <!--热门推荐-->
              <div class="course-search-right">
                <!--精品推荐-->
                <div class="course-search-right-recommend">
                  <h3>热点</h3>
                  <div class="course-recommend-card">
                    <div class="card-image">
                      <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
                    </div>
                    <div class="card-content">
                      <h4>ThinkPHP</h4>
                      通过对ThinkPHP框架基础，带领大家由浅入深轻松掌握ThinkPHP的理论基础，更加全面的掌握ThinkPHP框架运行机制…
                    </div>
                  </div>
                  <div class="course-recommend-card">
                    <div class="card-image">
                      <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
                    </div>
                    <div class="card-content">
                      <h4>ThinkPHP</h4>
                      通过对ThinkPHP框架基础，带领大家由浅入深轻松掌握ThinkPHP的理论基础，更加全面的掌握ThinkPHP框架运行机制…
                    </div>
                  </div>
                  <div class="course-recommend-card">
                    <div class="card-image">
                      <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
                    </div>
                    <div class="card-content">
                      <h4>ThinkPHP</h4>
                      通过对ThinkPHP框架基础，带领大家由浅入深轻松掌握ThinkPHP的理论基础，更加全面的掌握ThinkPHP框架运行机制…
                    </div>
                  </div>
                </div>
                <!--精品推荐end-->
              </div>
            </el-col>
          </el-row>
        </div>

      </div>


    </div>
    <footerbar></footerbar>
  </div>

</template>

<script>
  import { queryCourseCategory } from '@/api/search'
  import { pageCourse } from '@/api/search'
  import navbar from '../../components/navbar'
  import footerbar from '../../components/footerbar'
  import bus from '../../components/common/bus'
export default {
  name: 'CourseSearch',
  computed: {

  },
  data(){
    return{
      activeName: 'second',
      //课程分类
      categoryItem:[],
      queryParam:{
        courseName:'',
        category:'',
        grade:'',
        pageNum:'1',
        pageSize:'8'
      },
      courseSearch:{},
      gradleItem:["初级","中级","高级"]
    };
  },
  components:{
    navbar,
    footerbar
  },
  created () {
    this.handleQueryCourseCategory();
    this.handleSearchCourse();
    bus.$on('searchCourse', courseName => {
      this.handleSearchCourse();
    });
  },
  mounted() {

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log('submit!');
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val
      this.handleSearchCourse();
    },
    handleCurrentChange(val) {
      this.queryParam.pageNum = val
      this.handleSearchCourse();
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
    handleSearchCourse(){
      this.queryParam.courseName = this.$route.query.courseName
      pageCourse(this.queryParam).then(response => {
        this.courseSearch = response.data.data
      }).catch(error => {
        this.$message(error)
      })
    },
    handleQueryGradle(item){
      this.queryParam.grade = item
      this.handleSearchCourse();
    },
    handleQueryCategory(item){
      this.queryParam.category = item
      this.handleSearchCourse();
    },
    handleCourseDetail(courseId){
      let routeData = this.$router.resolve({
        path: '/course/detail',
        query: {  courseId: courseId }
      });
      window.open(routeData.href, '_blank');
    }
  }
}
</script>

<style  scoped>
  .index_main{
    width:78%;
    height:100%;
    background:#ffffff;
    margin:0 auto;
  }
  .course-list{
    margin-top: 15px;
  }
  /*分页栏*/
  .course-search-page{
    margin: 20px 0;
  }
  /*分页栏end*/

  /*列表右侧*/
  .course-search-right{
    margin-top: 65px;
  }
  .course-search-right .course-search-right-recommend{
    margin-bottom: 15px;
  }
  .course-search-right .course-search-right-recommend .course-recommend-card{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 4px;
    width: 350px;
    height: 135px;
    padding: 5px;
    margin-bottom: 10px;

  }
  .course-search-right .course-search-right-recommend .course-recommend-card .card-image{
    width: 64px;
    height: 64px;
    float: left;

  }
  .course-search-right .course-search-right-recommend .course-recommend-card .card-image img{
    width: 60px;
    height: 60px;
    padding: 2px;
  }
  .course-search-right .course-search-right-recommend .course-recommend-card .card-content{
    padding: 5px;

  }
  /*列表右侧*/


  /*课程列表*/
  .course-list-main{
    width:100%;
    height:100%;
    /*background:#ffffff;*/
    margin:0 auto;
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

    /*display: flex;
    justify-content: space-around;*/
  }

  .conten-list .Recommend .content div:nth-child(5n+1) {
    margin-left: 0px;
  }

  .conten-list .Recommend .content .recom-item {
    background: #fff;
    margin: 10px 0;
    /*width: 18.8%;
    margin-left: 1.5%;
    */
    width: 21.8%;
    height: 300px;
    margin-right: 34px;
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
  /*课程列表end*/

  /*分类*/
  .learing-list {
    width: 100%;
    background: #fff;
  }
  .learing-list ul, .learing-list li {
    padding: 0px;
    margin: 0px;
    list-style: none;
  }
  .learing-list .list-box {
    /*max-width: 1170px;*/
    width:100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }
  .learing-list .list-box ul {
    overflow: hidden;
    padding: 20px 0;
    border-bottom: solid 1px #ccc;
  }
  .learing-list .list-box ul .all {
    padding: 1px 5px;
    color: #fff;
    background: #00a4ff;
  }
  .learing-list .list-box ul:last-child {
    border: none;
  }
  .learing-list .list-box li {
    padding: 1px 15px;
    margin: 0 3px;
    float: left;
  }
  .learing-list .active {
    color: #fff;
    background: #00a4ff;
  }
  .learing-list .more {
    position: absolute;
    text-decoration: none;
    right: 10px;
  }
  /*分类end*/

  /*课程列表end*/
</style>
