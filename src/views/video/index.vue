<template>
  <div class="index_main">
    <navbar></navbar>
    <h3 style="text-align: left;margin: 20px 0">正在播放：{{teachPlanDetail.teachplanName}}</h3>
    <div class="video-play">

      <video :src="mediaUrl" width="1060px" height="600px" controls="controls">
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <div class="video-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="课程详情" name="first">
          <div class="course-detail">
            <div class="course-image">
              <img :src="courseBaseResult.courseImageUrl" style="margin: 20px 0" width="200px" height="160px">
            </div>
            <div class="course-detail-content">
              <h3 style="margin: 20px 0 10px 0">{{courseBaseResult.courseName}}</h3>
              <strong>难度等级：</strong>{{courseBaseResult.grade}}
              <el-divider direction="vertical"></el-divider>
              <strong>课程时长：</strong>{{allCourseDetail.courseCountTime}}分钟
              <el-divider direction="vertical"></el-divider>
              <strong>评分：</strong>{{allCourseDetail.courseAssessmentGrade}}<!--<el-rate v-model="allCourseDetail.courseAssessmentGrade"  disabled  show-score  text-color="#ff9900" score-template="{value}"></el-rate>-->
              <br>
              <br>
              <strong>授课模式：</strong>{{courseBaseResult.studymodel}}
              <el-divider direction="vertical"></el-divider>
              <strong>授课教师：</strong>{{allCourseDetail.teacherResult.teacherName}}
              <el-divider direction="vertical"></el-divider>
              <strong>课程分类：</strong>{{allCourseDetail.categoryResult.categoryName}}
            </div>

          </div>
          <div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size: 20px">课程介绍</span>
              </div>
              <div  class="text item" style="padding: 10px;font-size: 16px">
                {{allCourseDetail.courseBaseResult.description}}
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="课程目录" name="second">
          <div class="course-teachplan">
            <el-table
              :data="teachplanItem"
              style="width: 100%;margin: 20px 0;"
              row-key="teachplanId"
              :tree-props="{children: 'subTeachPlanResult'}">
              <el-table-column
                prop="teachplanName"
                label="教学计划名称"
                width="300">
              </el-table-column>
              <el-table-column
                prop="timeLength"
                label="时长"
                sortable
                width="100">
              </el-table-column>
              <el-table-column
                prop="description"
                label="描述"
                width="500">
              </el-table-column>
              <el-table-column label=""  align="center">
                <template slot-scope="scope">
                  <el-link @click="handleLookVideoPlay(scope.row)" type="primary">学习</el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="课程评价" name="three">
          <div>
            <el-form :model="courseAssessmentForm" :rules="courseAssessmentRules" ref="courseAssessmentForm" label-width="100px" class="demo-ruleForm">
              <el-form-item  label="标题" prop="courseAssessmentTitle">
                <el-input v-model="courseAssessmentForm.courseAssessmentTitle"></el-input>
              </el-form-item>
              <el-form-item label="评分" prop="courseAssessmentGrade">
                <div class="block" style="float: left;margin-top: 10px;">
                  <el-rate v-model="courseAssessmentForm.courseAssessmentGrade"></el-rate>
                </div>
<!--                <el-input v-model="courseAssessmentForm.courseAssessmentGrade"></el-input>-->
              </el-form-item>
              <el-form-item label="内容" prop="courseAssessmentContent">
                <el-input type="textarea" row="5" v-model="courseAssessmentForm.courseAssessmentContent"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('courseAssessmentForm')">评论</el-button>
                <el-button @click="resetForm('courseAssessmentForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
    <div class="video-course-assessment"></div>

  <footerbar></footerbar>
  </div>
</template>

<script>
  import videojs from  'video.js/dist/video.min'
  import 'video.js/dist/video-js.min.css'
  import 'videojs-flash/dist/videojs-flash';
  import navbar from '../../components/navbar'
  import footerbar from '../../components/footerbar'
  import {queryTeachplan} from '@/api/videoPlay'
  import {queryCourseAllDetail} from '@/api/videoPlay'
  import {addCourseAssessment} from '@/api/videoPlay'

  export default {
    name: 'Videojs',
    data:function () {
      return {
        playOptions:{
          autoplay: false, // 自动播放
          controls: true, // 是否显示控制栏
          notSupportedMessage: '此视频暂无法播放，检查相机状态是否正常或请查看是否安装flash',//无法播放时显示的信息
          techOrder: ['flash', 'html5'],// 兼容顺序
          sourceOrder: true,
          flash: {
            swf: '../../../static/VideoJS.swf'   //如果是本地视频  需要相应的videoJS.swf文件
          },
          source:[{
            type: 'video/mp4',
            src:'http://134.175.30.90/group1/M00/00/00/rBAADV4X6EmABK5eAeTlS8Utq0M81..mp4'
          }],
          poster:'', //播放器 默认图片
          controlBar: {                     // 配置控制栏
            timeDivider: false, // 时间分割线
            durationDisplay: false, // 总时间
            progressControl: true, // 进度条
            customControlSpacer: true, // 未知
            fullscreenToggle: true // 全屏
          },
        },
        myPlayer:'',
        activeName: 'first',
        teachPlanDetail:{},
        mediaUrl:'',
        allCourseDetail:{},
        courseBaseResult:{},
        teachplanItem:[],
        courseAssessmentForm: {
          courseAssessmentTitle: '',
          courseAssessmentContent: '',
          courseAssessmentGrade: '',
          courseId: this.$route.query.courseId,
          userId: JSON.parse(localStorage.getItem("userId"))
        },
        courseAssessmentRules: {
          courseAssessmentTitle: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          courseAssessmentContent: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          courseAssessmentGrade: [
            { required: true, message: '请填写分数', trigger: 'blur' }
          ]
        }
      }
    },
    beforeCreate () {
    },
  created () {
    this.handleQueryPlayTeachplan();
    this.handleQueryCourseAllDetail();
    this.handleQueryTeachplan();
    },
    beforeMount () {
    },
    mounted() {
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.hadleAddCourseAssessment();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      hadleAddCourseAssessment(){
        addCourseAssessment(this.courseAssessmentForm).then(response => {
          if (response.data.success) {
            this.$message({
              message: '评论成功',
              type: 'success'
            });
            this.resetForm('courseAssessmentForm');
          }
        }).catch(error => {
          this.$message(error)
        })
      },
      handleQueryPlayTeachplan(){
        var param = {
          courseId:'',
          teachplanId: ''
        }
        param.courseId = this.$route.query.courseId;
        param.teachplanId = this.$route.query.teachplanId;
        queryTeachplan(param).then(response => {
          this.teachPlanDetail = response.data.data[0].teachPlans[0]
          this.mediaUrl = this.teachPlanDetail.teachPlanMediaResults[0].mediaUrl
        }).catch(error => {
            this.$message(error)
        })
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
          this.courseBaseResult = response.data.data.courseBaseResult;
        }).catch(error => {
          this.$message.error(error)
        })
      },
      handleQueryTeachplan(){
        var param = {
          courseId:''
        }
        param.courseId = this.$route.query.courseId
        queryTeachplan(param).then(response => {
          this.teachplanItem = response.data.data[0].teachPlans

        }).catch(error => {
          this.$message(error)
        })
      },
      handleLookVideoPlay(row){
        this.mediaUrl = row.teachPlanMediaResults[0].mediaUrl
        this.teachPlanDetail = row
      }
    },
    components:{
      navbar,
      footerbar
    }
  }
</script>

<style scope>
  /*页面布局*/
  .index_main{
    width:78%;
    height:100%;
    background:#ffffff;
    margin:0 auto;
  }
  .video-js {
    width: 1060px !important;
    height: 600px !important;
  }
  .video-play{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #myVideo{
    margin: 0 auto;
  }
  .video-content{
    width: 98%;
    margin: 30px 1%;
  }
  .course-detail{
    width: 100%;
    height: 200px;
  }
  .course-image{
    width: 200px;
    float: left;
    height: 200px;
  }
  .course-detail-content{
    width: 800px;
    height: 200px;
    float: left;
    padding: 10px;
    margin-left: 20px;
    text-align: left;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 99%;
    text-align: left;
  }
  .course-teachplan{
    width: 100%;
    height: 450px;
  }
</style>
