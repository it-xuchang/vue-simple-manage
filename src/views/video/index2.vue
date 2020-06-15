<template>
  <div class="index_main">
    <navbar></navbar>
    <h3 style="text-align: left">正在播放：{{teachPlanDetail.teachplanName}}</h3>
    <div class="video-play">
      <video ref="viodeRef" id="myVideo"
             class="video-js vjs-default-skin vjs-big-play-centered"
             controls
             preload="auto"
             width="1060px"
             height="600px"
             poster="http://static.qiakr.com/app/full_res.jpg">
        <source :src="mediaUrl" type="video/mp4" >
        <p class="vjs-no-js">不支持播放</p>
      </video>
    </div>
    <div class="video-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="课程详情" name="first">
          <div class="course-detail">
            <div class="course-image">
              <img :src="allCourseDetail.courseBaseResult.courseImageUrl" style="margin: 20px 0" width="200px" height="160px">
            </div>
            <div class="course-detail-content">
              <h3>{{allCourseDetail.courseBaseResult.courseName}}</h3>
              <strong>难度等级：</strong>{{allCourseDetail.courseBaseResult.grade}}
              <el-divider direction="vertical"></el-divider>
              <strong>课程时长：</strong>{{allCourseDetail.courseCountTime}}分钟
              <el-divider direction="vertical"></el-divider>
              <strong>评分：</strong><el-rate v-model="allCourseDetail.courseAssessmentGrade"  disabled  show-score  text-color="#ff9900" score-template="{value}"></el-rate>
              <br>
              <br>
              <strong>授课模式：</strong>{{allCourseDetail.courseBaseResult.studymodel}}
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
        teachplanItem:[]
      }
    },
    beforeCreate () {
    },
  created () {
    this.handleQueryTeachplan();
    this.handleQueryCourseAllDetail();
    this.handleQueryTeachplan()
    // this.initVideo();
    },
    beforeMount () {
    },
    mounted() {
      // const _this = this;
      // _this.myPlayer = videojs('myVideo',_this.playOptions,function () {
      //   this.load();
      //   this.play();
      //   //this.pause();//暂停
      //   //------events    绑定事件用on    移除事件用off
      //   this.on('loadstart',function () {
      //     console.log('loadstart------------')
      //   });
      //   this.on('loadedmetadata',function () {
      //     console.log('loadedmetadata---视频源数据加载完成----')
      //   });
      //   this.on('loadeddata',function () {
      //     console.log('loadeddata---渲染播放画面----');//autoPlay必须为false
      //   });
      //   this.on('progress',function () {
      //     console.log('progress-------加载过程----')
      //   });
      //   this.on('timeupdate',function () {
      //     const curTime = this.currentTime();
      //     // let timer = setInterval(() => {
      //     //   const endTime = this.currentTime();
      //     //   if ((endTime-curTime)%10 )
      //     //   clearInterval(timer);
      //     //
      //     // }, 1000)
      //
      //     console.log('timeupdate-------------',curTime);
      //   })
      //   this.off('timeupdate',function () {
      //     console.log('off----------')
      //   })
      //   this.on('ended',function() {
      //     console.log('播放结束了')
      //   })
      // });
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleQueryTeachplan(){
        var param = {
          courseId:'',
          teachplanId: ''
        }
        param.courseId = this.$route.query.courseId;
        param.teachplanId = this.$route.query.teachplanId;
        queryTeachplan(param).then(response => {
          this.teachPlanDetail = response.data.data[0].teachPlans[0]
          this.mediaUrl = response.data.data[0].teachPlans[0].teachPlanMediaResults[0].mediaUrl;
          this.playOptions.source[0].src = response.data.data[0].teachPlans[0].teachPlanMediaResults[0].mediaUrl;
          console.log(response.data.data[0].teachPlans[0].teachPlanMediaResults[0].mediaUrl)
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
      initVideo(){
        const _this = this;
        _this.myPlayer = videojs('myVideo',_this.playOptions,function () {
          this.load();
          this.play();
          //this.pause();//暂停
          //------events    绑定事件用on    移除事件用off
          this.on('loadstart',function () {
            console.log('loadstart------------')
          });
          this.on('loadedmetadata',function () {
            console.log('loadedmetadata---视频源数据加载完成----')
          });
          this.on('loadeddata',function () {
            console.log('loadeddata---渲染播放画面----');//autoPlay必须为false
          });
          this.on('progress',function () {
            console.log('progress-------加载过程----')
          });
          this.on('timeupdate',function () {
            const curTime = this.currentTime();
            // let timer = setInterval(() => {
            //   const endTime = this.currentTime();
            //   if ((endTime-curTime)%10 )
            //   clearInterval(timer);
            //
            // }, 1000)

            console.log('timeupdate-------------',curTime);
          })
          this.off('timeupdate',function () {
            console.log('off----------')
          })
          this.on('ended',function() {
            console.log('播放结束了')
          })
        });
      },

    },
    components:{
      navbar,
      footerbar
    },
    beforeDestroy:function(){
      const videoDom = this.$refs.viodeRef;  //不能用document 获取节点
      videojs(videoDom).dispose();  //销毁video实例，避免出现节点不存在 但是flash一直在执行，报 this.el.......is not function
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
