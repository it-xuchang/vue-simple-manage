<template>
  <div class="index_main">
    <navbar></navbar>
    <!--课程详情头部-->
    <div class="article-banner">
        <div class="teacher-avatar">
          <img  height="220px" style="margin: 10px" :src="allCourseDetail.courseBaseResult.courseImageUrl">
        </div>
        <div class="article-detail">
          <div class="article-detail-title">
            {{allCourseDetail.courseBaseResult.courseName}}
          </div>
          <div class="article-detail-content">
            <strong>难度等级：</strong>{{allCourseDetail.courseBaseResult.grade}}
            <el-divider direction="vertical"></el-divider>
            <strong>课程时长：</strong>{{allCourseDetail.courseCountTime}}分钟
            <el-divider direction="vertical"></el-divider>
            <strong>评分：</strong>{{allCourseDetail.courseAssessmentGrade}}<!--<el-rate v-model="allCourseDetail.courseAssessmentGrade"  disabled  show-score  text-color="#ff9900" score-template="{value}"></el-rate>-->
            <br>
            <br>
            <strong>授课模式：</strong>{{allCourseDetail.courseBaseResult.studymodel}}
            <el-divider direction="vertical"></el-divider>
            <strong>授课教师：</strong>{{allCourseDetail.teacherResult.teacherName}}
            <el-divider direction="vertical"></el-divider>
            <strong>课程分类：</strong>{{allCourseDetail.categoryResult.categoryName}}
            <br>
            <br>
            <el-button type="primary" round @click="handleVideoPlay()">马上学习</el-button>
<!--            <el-button type="primary" round :hidden="allCourseDetail.learning">继续学习</el-button>-->
            <el-button type="warning" round :hidden="!allCourseDetail.learning" @click="handleJoinCourse()">加入课堂</el-button>
            <el-button type="warning" round  @click="handleJoinFavoriteCourse()">加入收藏</el-button>
          </div>
        </div>
    </div>
    <!--课程详情头部 end-->
    <!--课程介绍-->
    <div class="article-main">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-tabs type="border-card">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 课程介绍</span>
                <!--适用人群-->
                <div class="course-for-user" style="text-align: left">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span ><strong>适用人群</strong></span>
                    </div>
                    <div class="text item">
                      {{allCourseDetail.courseBaseResult.users}}
                    </div>
                  </el-card>

                </div>
                <!--适用人群 end-->
                <!--教师介绍-->
                <div class="article-main-teacher-detail">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span><strong>讲师介绍</strong></span>
                      <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
                    </div>
                    <div  class="content">
                      <h3>教学方：{{allCourseDetail.teacherResult.teacherName}}</h3>
                      {{allCourseDetail.teacherResult.description}}
                    </div>
                  </el-card>
                </div>
                <!--教师介绍 end-->
                <!--课程介绍-->
                <div class="course-introduction">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span><strong>课程介绍</strong></span>
                    </div>
                    <div  class="content">
                      {{allCourseDetail.courseBaseResult.description}}
                    </div>
                  </el-card>
                </div>
                <!--课程介绍 end-->
                <!--常见问题-->
                <div class="course-question">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span><strong>常见问题</strong></span>
                    </div>
                    <div  class="content">
                      <el-collapse v-model="activeNames" @change="handleChange">
                        <div v-for="frequentlyAskedQuestion in allCourseDetail.frequentlyAskedQuestionResults"  key="frequentlyAskedQuestion">
                          <el-collapse-item :title="frequentlyAskedQuestion.frequentlyAskedQuestionTitle" name="1">
                            <div>{{frequentlyAskedQuestion.frequentlyAskedQuestionContent}}</div>
                          </el-collapse-item>
                        </div>

                      </el-collapse>
                    </div>
                  </el-card>
                </div>
                <!--常见问题end-->
              </el-tab-pane>
              <!--课程目录-->
              <el-tab-pane label="课程目录">
                <div class="course-catalogue">

<!--                  <el-input-->
<!--                    placeholder="输入关键字进行过滤"-->
<!--                    v-model="filterText">-->
<!--                  </el-input>-->

<!--                  <el-tree-->
<!--                    class="filter-tree"-->
<!--                    :data="allCourseDetail.teachPlans"-->
<!--                    :props="defaultProps"-->
<!--                    default-expand-all-->
<!--                    :filter-node-method="filterNode"-->
<!--                    ref="tree">-->
<!--                  </el-tree>-->
                  <el-table
                    :data="allCourseDetail.teachPlans"
                    style="width: 100%;margin: 20px 0;"
                    row-key="teachplanId"
                    :tree-props="{children: 'subTeachPlanResult'}">
                    <el-table-column
                      prop="teachplanName"
                      label="教学计划名称">
                    </el-table-column>
                    <el-table-column
                      prop="timeLength"
                      label="时长">
                    </el-table-column>
                    <el-table-column
                      prop="description"
                      label="描述">
                    </el-table-column>
                    <el-table-column label=""  align="center">
                      <template slot-scope="scope">
                        <el-link @click="handleLookVideoPlay(scope.row)" type="primary">学习</el-link>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <!--课程目录 end-->
              <!--课程问答-->
              <el-tab-pane label="课程问答">
                <div class="course-question-pane">
                  <div class="block">
                    <el-timeline>
                      <div v-for="item in allCourseDetail.courseQuziResults"  key="item">
                        <el-timeline-item :timestamp="item.createTime" placement="top">
                          <el-card>
                            <h4>{{item.courseQuziTitle}}</h4>
                            <p>{{item.courseQuziContent}}</p>
                          </el-card>
                        </el-timeline-item>
                      </div>

                    </el-timeline>
                  </div>
                </div>
              </el-tab-pane>
              <!--课程问答end-->
              <!--课程评价-->
              <el-tab-pane label="课程评价">
                <div class="course-evaluate" v-for="courseQuzi in courseQuziItem" key="courseQuzi">
                  <div class="course-evaluate-image">
                      <img v-if="courseQuzi.userResult != null " :src="courseQuzi.userResult.userImageUrl" width="150px" height="150px">
                    <img v-if="courseQuzi.userResult == null " src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" width="150px" height="150px" />
                  </div>
                  <h3>{{courseQuzi.courseAssessmentTitle}}</h3>
                  {{courseQuzi.courseAssessmentContent}}
                  <div class="course-evaluate-user-conten">
                    <strong>课程评分：</strong>
                    <el-rate v-model="courseQuzi.courseAssessmentGrade"  disabled  show-score  text-color="#ff9900" score-template="{value}"></el-rate>
                  </div>
                </div>
              </el-tab-pane>
              <!--课程评价end-->
            </el-tabs>
          </div>
        </el-col>
        <!--课程推荐-->
        <el-col :span="8">
          <div class="course-recommended-top">
            <p>
              <span>好评度</span>
              <el-divider direction="vertical"></el-divider>
              <span>课程数</span>
              <el-divider direction="vertical"></el-divider>
              <span>学生数</span>
            </p>
            <p>
              <span>93%</span>
              <el-divider direction="vertical"></el-divider>
              <span>39</span>
              <el-divider direction="vertical"></el-divider>
              <span>36万</span>
            </p>
          </div>
          <div class="grid-content bg-purple">
            <!--课程推荐-->
            <div class="course-recommended">
              <h3>课程推荐</h3>
              <el-carousel trigger="click" height="150px">
                <el-carousel-item v-for="item in imagesItem" :key="item">
                  <img :src="item" width="100%" height="100%">
                </el-carousel-item>
              </el-carousel>
            </div>

            <!--课程推荐-->
          </div>
          <div class="course-advance">
            <h3>课堂进阶</h3>
            <div class="course-advance-content">
              <img  src="http://134.175.30.90/group1/M00/00/00/rBAADV4JpOqACX1iAAII29NlvBA681_big.jpg" width="50px" height="50px">
              <p >Java实战-高级</p>
            </div>
          </div>
        </el-col>
        <!--课程推荐end-->
      </el-row>
      <br>

    </div>
    <!--课程介绍 end-->
    <footerbar></footerbar>
  </div>

</template>

<script>
  import navbar from '../../../../components/navbar'
  import {queryCourseAllDetail} from '@/api/courseDetail'
  import {addFavoriteCourse} from '@/api/courseDetail'
  import {addLearningCourse} from '@/api/courseDetail'
  import {joinLearningCourse} from '@/api/courseDetail'
  import footerbar from '../../../../components/footerbar'
  export default {
    name: 'CourseDetail',
    data() {
      return {
        allCourseDetail:{},
        //常见问题
        activeNames: ['1'],
        //课程评价
        value: 3.7,
        courseQuziItem:[],
        //课程目录
        filterText: '',
        defaultProps: {
          children: 'subTeachPlanResult',
          label: 'teachplanName',
          id:'teachplanId'
        },
        imagesItem:[
          "http://134.175.30.90/group1/M00/00/00/rBAADV4JpOqACX1iAAII29NlvBA681_big.jpg",
          "https://img.mukewang.com/5e683fad000185c518720764.jpg"
        ]
      }
    },
    created () {
      this.handleQueryCourseAllDetail();
    },
    //课程目录
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    components:{
      navbar,
      footerbar
    },
    methods: {
      //课程目录
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleQueryCourseAllDetail(){
        var params = {
          couresId: '',
          userId:''
        }
        params.couresId =this.$route.query.courseId;
        params.userId = JSON.parse(localStorage.getItem("userId"));
        queryCourseAllDetail(params).then(response => {
          this.allCourseDetail = response.data.data;
          this.courseQuziItem = response.data.data.courseAssessmentResults;
        }).catch(error => {
          this.$message.error(error)
        })
      },
      handleJoinCourse(){
        var learningCourseParam = {
          courseId:'',
          userId:''
        }
        learningCourseParam.courseId =this.$route.query.courseId;
        learningCourseParam.userId = JSON.parse(localStorage.getItem("userId"));

        addLearningCourse(learningCourseParam).then(response => {
          if (response.data.success){
            this.$message({
              message:'课程加入成功',
              type: 'success'
            });
          }else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          this.$message.error(error)
        })
      },
      handleJoinFavoriteCourse(){
        var favCourseParam = {
          courseId:'',
          userId:''
        }
        favCourseParam.courseId =this.$route.query.courseId;
        favCourseParam.userId = JSON.parse(localStorage.getItem("userId"));
        //用户未登录
        if (favCourseParam.userId == null || favCourseParam.userId == ''){
          this.$confirm('是否登录', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              path: '/login'
            })
          }).catch(() => {

          });
        }
        addFavoriteCourse(favCourseParam).then(response => {
          if (response.data.success){
            this.$message({
              message:'课程收藏成功',
              type: 'success'
            });
          }else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })
      },
      handleVideoPlay(){
        let routeData = this.$router.resolve({
          path: '/video/play',
          query: {  courseId: this.$route.query.courseId ,teachplanId:''}
        });
        window.open(routeData.href, '_blank');
      },
      handleLookVideoPlay(row){
        var param = {
          teachplanId:'',
          userId:'',
          courseId:'',
          status:'0'
        }
        param.teachplanId = row.teachplanId
        param.courseId = this.$route.query.courseId
        param.userId = JSON.parse(localStorage.getItem("userId"))
        joinLearningCourse(param).then(response => {
          if (response.data.success){
            let routeData = this.$router.resolve({
              path: '/video/play',
              query: {  courseId: this.$route.query.courseId ,teachplanId: row.teachplanId}
            });
            window.open(routeData.href, '_blank');
          }else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })

      }
    },
  }
</script>

<style scoped>
  .index_main{
    width:78%;
    height:100%;
    background:#ffffff;
    margin:0 auto;
  }
  /*课程推荐*/
  .course-recommended-top{
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin: 0 0 15px 0;
    padding: 15px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 15px;
  }
  .course-recommended{
    padding: 15px;
    text-align: left;
  }
  .course-advance{
    height: 300px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin: 20px 0;
    text-align: left;
    padding: 15px;
  }
  .course-advance-content{
    background-color: rgba(198, 228, 230, 0.23);
    height: 50px;
    padding: 5px;
  }
  .course-advance-content img{
    float: left
  }
  .course-advance-content p{
    margin-left: 20px;
    font-size: 15px;
    float: left;
    display: table-cell;
    vertical-align: middle;
    /*margin-top: -5px;*/
  }
  .course-question-pane{
    text-align: left;
  }
  /*课程评价*/
  .course-evaluate{
    width: 100%;
    height: 150px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin: 15px;
    padding: 15px;
    text-align: left;
  }
  .course-evaluate .course-evaluate-image{
    float: left;
    margin-right: 15px;
  }
  .course-evaluate .course-evaluate-user-conten{
    margin-top: 5px;
    margin-left: 15px;
  }
  /*课程评价end*/
  /*教师介绍*/
  .article-main-teacher-detail{
    margin: 30px 0;
    text-align: left;
  }
  .article-main-teacher-detail .text {
    font-size: 14px;
  }

 .article-main-teacher-detail .item {
    margin-bottom: 18px;
  }

  .article-main-teacher-detail .clearfix:before,
  .article-main-teacher-detail .clearfix:after {
    display: table;
    content: "";
  }
  .article-main-teacher-detail .clearfix:after {
    clear: both
  }

  .article-main-teacher-detail .box-card {
    width: 100%;
  }
  /*教师介绍 end */
  /*课程介绍*/
  .course-introduction{
    margin: 30px 0;
    text-align: left;
  }
  .course-introduction .content{
    margin: 10px;
    font-size: 16px;
  }
  /*常见问题*/
  .course-question{
    margin: 30px 0;
    text-align: left;
  }
  /*常见问题end*/
  .course-catalogue {
    width: 100%;
    height: 800px;
  }
  .course-tecchplan{
    width: 98%;
    margin: 5px 1%;
  }
  .course-catalogue el-tree{
    width: 100% !important;

    background-color: #00a4ff !important;
  }
  .el-tree-node__content{
    height: 37px !important;
  }

  /*课程详情头部*/
  .article-banner {
    margin: 10px 0;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    width: 100%;
    height: 240px;
  }
  .teacher-avatar{
    float: left;
    height: 240px;
    width: 20%;
    max-width: 250px;
  }
  .article-detail{
    float: left;
    height: 240px;
    width: 80%;
    text-align: left;
  }
  .article-detail-title{
    float: right;
    font-size: 32px;
    width: 85%;
    height: 50px;
    margin-top: 20px;
  }
  .article-detail-content{
    margin-top: 20px;
    margin-left: 15%;
    width: 85%;
    float: right;
    font-size: 16px;
  }

  .article-banner .banner-info .banner-left .info a {
    background: #00a4ff;
    color: #fff;
    font-size: 18px;
    display: inline-block;
    padding: 5px 20px;
    position: relative;
    top: -10px;
  }
  .article-banner .banner-info .banner-left .info span {
    display: inline-block;
    padding: 0px 20px;
    font-size: 18px;
    border-right: solid 1px #787d82;
  }
  .article-banner .banner-info .banner-left .info span em {
    font-size: 14px;
    display: block;
  }
  .article-banner .banner-info .banner-left .info span:last-child {
    border: none;
  }

  .article-banner .banner-info .banner-rit .vid-act i {
    margin: 0 5px;
    position: relative;
    top: 1px;
  }
  .article-banner .banner-info .banner-rit .vid-act span {
    display: inline-block;
    width: 49%;
    line-height: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .article-banner .banner-info .banner-rit .vid-act span:nth-child(1) {
    border-right: solid 1px #787d82;
  }
  .article-banner .banner-info .banner-rit .vid-act .active {
    color: #00a4ff;
  }
  /*课程详情头部 end*/
  .article-main{
    width:100%;
    height:100%;
    background:#ffffff;
    margin:0 auto;
    margin-top: 20px;
  }
  .article-main .el-row {
    margin-bottom: 20px;
    &:last-child {
       margin-bottom: 0;
     }
  }
  .article-main .el-col {
    border-radius: 4px;
  }

  .article-main .bg-purple {
    background: #c6e4e6;
  }

  .article-main .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .article-main .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
