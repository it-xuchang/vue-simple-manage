<template>
  <div>
    <div class="personal-header" >
    </div>
    <div class="container">
      <personal-nav></personal-nav>
      <div class="personal-content pull-right">
        <div class="personal-cont">
          <div class="top">
            <div class="tit"><span>我的收藏</span></div>

            <div class="top-cont">
              <div class="conten-list">
                <div class="Recommend">
                  <div class="content" >
                    <div class="recom-item" v-for="item in favoriteCourse.datas">
                      <p><img :src="item.courseBase.courseImageUrl" width="100%" alt=""><span class="lab">HOT</span></p>
                      <ul>
                        <li>{{item.courseBase.courseName}}</li>
                        <li><span>{{item.courseBase.grade}}</span> <em> · </em>{{item.courseBase.studymodel}}</li>
                      </ul>
                      <p class="course-consel"><i class="el-icon-delete" @click="deleteFavoriteCourse(item.courseFavoriteId)"></i></p>

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
                        :current-page="favoriteCourse.pageNum"
                        :page-sizes="[4, 8, 12, 16]"
                        :page-size="favoriteCourse.pageSize"
                        background="true"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="favoriteCourse.total">
                      </el-pagination>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footerbar></footerbar>
  </div>


</template>

<script>
  import { mapGetters } from 'vuex'
  import personalNav from '../../components/personalNav'
  import footerbar from '../../../../components/footerbar'
  import {queryCourseFavorite} from '@/api/favorite'
  import {deleteCourseFavorite} from '@/api/favorite'

  export default {
    name: 'perosonalFavorite',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    components:{
      personalNav,
      footerbar
    },
    created () {
      this.handleQueryCourseFavorite();
    },
    data() {
      return{
        favoriteQueryParam:{
          userId:'',
          pageNum:'1',
          pageSize:'4'
        },
        favoriteCourse:{}
      }
    },
    methods:{
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        // this.favoriteQueryParam.pageSize = val
        // this.favoriteCourse = handleQueryCourseFavorite()
        var userId = JSON.parse(localStorage.getItem("userId"));
        var param = {
          userId:'',
          pageNum:'',
          pageSize:''
        }
        param.userId = userId;
        param.pageNum = this.favoriteQueryParam.pageNum
        param.pageSize = val
        queryCourseFavorite(param).then(response => {
          this.favoriteCourse = response.data.data;
        }).catch(error => {
          this.$message(error)
        })
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        // this.favoriteQueryParam.pageNum = val
        // this.favoriteCourse = handleQueryCourseFavorite()
        var userId = JSON.parse(localStorage.getItem("userId"));
        var param = {
          userId:'',
          pageNum:'',
          pageSize:''
        }
        param.userId = userId;
        param.pageNum = val
        param.pageSize = this.favoriteQueryParam.pageSize
        queryCourseFavorite(param).then(response => {
          this.favoriteCourse = response.data.data;
        }).catch(error => {
          this.$message(error)
        })
      },
      handleQueryCourseFavorite(){
        var userId = JSON.parse(localStorage.getItem("userId"));
        var param = {
          userId:'',
          pageNum:'',
          pageSize:''
        }
        param.userId = userId;
        param.pageNum = this.favoriteQueryParam.pageNum
        param.pageSize = this.favoriteQueryParam.pageSize
        queryCourseFavorite(param).then(response => {
          this.favoriteCourse = response.data.data;
        }).catch(error => {
          this.$message(error)
        })
      },
      deleteFavoriteCourse(id){

        this.$confirm('是否取消收藏课程！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            courseFavoriteId:''
          }
          param.courseFavoriteId = id
          deleteCourseFavorite(param).then(response => {
            if (response.data.success){
              this.$message({
                message:'取消课程收藏成功',
                type: 'success'
              });
              var userId = JSON.parse(localStorage.getItem("userId"));
              var param = {
                userId:'',
                pageNum:'',
                pageSize:''
              }
              param.userId = userId;
              param.pageNum = this.favoriteQueryParam.pageNum
              param.pageSize = this.favoriteQueryParam.pageSize
              queryCourseFavorite(param).then(response => {
                this.favoriteCourse = response.data.data;
              }).catch(error => {
                this.$message(error)
              })
            }else {
              this.$message.error(response.data.returnMsg);
            }
          }).catch(error => {
            this.$message(error)
          })
        }).catch(() => {

        });

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/css/normalize.css";
  @import "../../../../assets/bootstrap/dist/css/bootstrap.css";
  html, body {
    min-height: 100%;
    height: 100%;
    min-width: 1000px;
    background: #f3f5f7;
  }
/*收藏课程开始*/
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
    height: 260px;
    margin-right: 22px;
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
/*收藏课程结束*/



  a {
    color: #2da1e7;
  }

  a:hover {
    color: #2da1e7;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6, p {
    padding: 0px;
    margin: 0;
    line-height: 200%;
  }

  em, i {
    font-style: normal;
  }

  .cr-pd-mr {
    padding: 0px;
    margin: 0px;
  }

  .cl-red {
    color: red !important;
  }

  .cl-orange {
    color: #ff5a2c !important;
  }

  .ft-cen {
    text-align: center;
  }

  .more {
    color: #2da1e7;
  }

  .cl-basics {
    color: #00a4ff;
  }

  .hv-poin:hover {
    cursor: pointer;
  }

  .pd-left {
    padding-left: 15px;
  }

  .pd-rit {
    padding-right: 15px;
  }

  .btn-primary {
    background: #00a4ff;
    border: none;
  }

  .cl-boder {
    border: none;
  }

  .hide {
    display: none;
  }

  .show {
    display: block;
  }

  /****
  * icon 图标 common
  ****/
  .i-chevron-top {
    display: inline-block;
    width: 13px;
    height: 10px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -83px 2px;
  }

  .i-chevron-bot {
    display: inline-block;
    width: 13px;
    height: 10px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -83px -6px;
  }

  .i-heart {
    display: inline-block;
    width: 20px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -104px 0px;
  }

  .i-star {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -57px 0px;
  }

  .i-weixin {
    display: inline-block;
    width: 18px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 0px 1px;
  }

  .i-qq {
    display: inline-block;
    width: 18px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -26px 0px;
  }

  .i-answer {
    display: inline-block;
    width: 16px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -133px 0px;
  }

  .i-browse {
    display: inline-block;
    width: 15px;
    height: 12px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 0px -20px;
  }

  .i-problem {
    display: inline-block;
    width: 23px;
    height: 19px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -133px -21px;
  }

  .i-node {
    display: inline-block;
    width: 23px;
    height: 19px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -102px -21px;
  }

  .i-edt {
    display: inline-block;
    width: 16px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -22px -19px;
  }

  .i-del {
    display: inline-block;
    width: 15px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -43px -19px;
  }

  .i-laud {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -64px -19px;
  }

  .i-coll {
    display: inline-block;
    width: 15px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 1px -35px;
  }

  .i-play {
    display: inline-block;
    width: 14px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -22px -35px;
    margin-right: 8px;
  }

  /*
   * colors variables
   */
  header {
    width: 100%;
    background: #fff;
  }

  header a {
    color: #333;
  }

  header a:hover {
    color: #ff7c2d;
    text-decoration: none;
  }

  header .navbar {
    min-width: 1024px;
    margin: 0 auto;
    border-radius: 0px;
    overflow: hidden;
  }

  header .navbar .logo {
    width: 195px;
    float: left;
    min-width: 110px;
    margin-right: 2%;
  }

  header .navbar .starch {
    float: right;
    min-width: 326px;
    margin-right: 5%;
  }

  header .navbar .sign-in {
    float: right;
  }

  header .navbar .sign-in a {
    color: #14191f;
  }

  header .navbar .sign-in span {
    color: #787d82;
  }

  header .navbar .sign-in .personal {
    color: #787d82;
  }

  header .navbar .sign-in .personal .personalIco::before {
    content: ' ● ';
    color: red;
    font-weight: bold;
    right: 1px;
    top: -8px;
    position: absolute;
  }

  header .navbar .sign-in .personal span {
    display: inline-block;
    width: 20px;
    height: 20px;
    position: relative;
    top: 6px;
    margin-left: 8px;
    background: url(../../../../assets/img/asset-personalIco.png) no-repeat;
  }

  header .navbar .sign-in .myInfo {
    color: #787d82;
  }

  header .navbar .sign-in .myInfo img {
    display: inline-block;
    margin: 0 5px;
    position: relative;
    top: -2px;
    width: 25px;
    height: 25px;
    border-radius: 25px;
  }

  header .navbar-nav {
    font-size: 18px;
    margin: 0 20px;
    font-weight: bold;
    color: #333;
  }

  header .navbar-nav li a {
    padding: 9px 15px !important;
  }

  header .active {
    border-bottom: solid 2px #00a4ff;
  }

  header .sign-in {
    margin-top: 12px;
    margin-right: 0px;
  }

  header .sign-in a {
    color: #00a4ff;
  }

  header .learingHeader {
    max-width: 1366px;
    margin: 0 auto;
    background: #fff;
    width: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  header input {
    height: 35px;
    margin-top: 7px;
  }

  header .input-search {
    border: solid 2px #00a4ff;
    width: 280px;
    padding-left: 10px;
  }

  header .search-buttom {
    border: solid 2px #00a4ff;
    background: #00a4ff;
    color: #fff;
    font-weight: bold;
    width: 14%;
    max-width: 80px;
    border-radius: 0;
    position: relative;
    top: -1px;
  }
  .personal-page{
    margin: 15px 0;
  }

  /*
   * colors variables
   */
  footer {
    width: 100%;
    background: #fff;
    margin-top: 20px;
    padding: 40px 0;
    line-height: 260%;
  }

  footer .btn-primary {
    min-width: 100px;
    margin-top: 10px;
  }

  footer img {
    position: relative;
    top: -8px;
    left: 0px;
  }

  footer dt {
    margin-bottom: 20px;
  }

  footer dd {
    line-height: 200%;
  }

  /*
   * colors variables
   */
  html, body {
    min-height: 100%;
    height: 100%;
    min-width: 1000px;
    background: #f3f5f7;
  }

  a {
    color: #2da1e7;
  }

  a:hover {
    color: #2da1e7;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6, p {
    padding: 0px;
    margin: 0;
    line-height: 200%;
  }

  em, i {
    font-style: normal;
  }

  .cr-pd-mr {
    padding: 0px;
    margin: 0px;
  }

  .cl-red {
    color: red !important;
  }

  .cl-orange {
    color: #ff5a2c !important;
  }

  .ft-cen {
    text-align: center;
  }

  .more {
    color: #2da1e7;
  }

  .cl-basics {
    color: #00a4ff;
  }

  .hv-poin:hover {
    cursor: pointer;
  }

  .pd-left {
    padding-left: 15px;
  }

  .pd-rit {
    padding-right: 15px;
  }

  .btn-primary {
    background: #00a4ff;
    border: none;
  }

  .cl-boder {
    border: none;
  }

  .hide {
    display: none;
  }

  .show {
    display: block;
  }

  /****
  * icon 图标 common
  ****/
  .i-chevron-top {
    display: inline-block;
    width: 13px;
    height: 10px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -83px 2px;
  }

  .i-chevron-bot {
    display: inline-block;
    width: 13px;
    height: 10px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -83px -6px;
  }

  .i-heart {
    display: inline-block;
    width: 20px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -104px 0px;
  }

  .i-star {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -57px 0px;
  }

  .i-weixin {
    display: inline-block;
    width: 18px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 0px 1px;
  }

  .i-qq {
    display: inline-block;
    width: 18px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -26px 0px;
  }

  .i-answer {
    display: inline-block;
    width: 16px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -133px 0px;
  }

  .i-browse {
    display: inline-block;
    width: 15px;
    height: 12px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 0px -20px;
  }

  .i-problem {
    display: inline-block;
    width: 23px;
    height: 19px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -133px -21px;
  }

  .i-node {
    display: inline-block;
    width: 23px;
    height: 19px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -102px -21px;
  }

  .i-edt {
    display: inline-block;
    width: 16px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -22px -19px;
  }

  .i-del {
    display: inline-block;
    width: 15px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -43px -19px;
  }

  .i-laud {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -64px -19px;
  }

  .i-coll {
    display: inline-block;
    width: 15px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 1px -35px;
  }

  .i-play {
    display: inline-block;
    width: 14px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -22px -35px;
    margin-right: 8px;
  }

  .personal-header {
    background: top center no-repeat #26abe7;
    background-size: cover;
    position: relative;
    top: -10px;
    padding: 20px 0;
    height: 200px;
  }

  .personal-header .personal-info {
    width: 1170px;
    margin: 0 auto;
    padding-left: 250px;
    padding-top: 40px;
    color: #fff;
  }

  /*
   * colors variables
   */
  html, body {
    min-height: 100%;
    height: 100%;
    min-width: 1000px;
    background: #f3f5f7;
  }

  a {
    color: #2da1e7;
  }

  a:hover {
    color: #2da1e7;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6, p {
    padding: 0px;
    margin: 0;
    line-height: 200%;
  }

  em, i {
    font-style: normal;
  }

  .cr-pd-mr {
    padding: 0px;
    margin: 0px;
  }

  .cl-red {
    color: red !important;
  }

  .cl-orange {
    color: #ff5a2c !important;
  }

  .ft-cen {
    text-align: center;
  }

  .more {
    color: #2da1e7;
  }

  .cl-basics {
    color: #00a4ff;
  }

  .hv-poin:hover {
    cursor: pointer;
  }

  .pd-left {
    padding-left: 15px;
  }

  .pd-rit {
    padding-right: 15px;
  }

  .btn-primary {
    background: #00a4ff;
    border: none;
  }

  .cl-boder {
    border: none;
  }

  .hide {
    display: none;
  }

  .show {
    display: block;
  }

  /****
  * icon 图标 common
  ****/
  .i-chevron-top {
    display: inline-block;
    width: 13px;
    height: 10px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -83px 2px;
  }

  .i-chevron-bot {
    display: inline-block;
    width: 13px;
    height: 10px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -83px -6px;
  }

  .i-heart {
    display: inline-block;
    width: 20px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -104px 0px;
  }

  .i-star {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -57px 0px;
  }

  .i-weixin {
    display: inline-block;
    width: 18px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 0px 1px;
  }

  .i-qq {
    display: inline-block;
    width: 18px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -26px 0px;
  }

  .i-answer {
    display: inline-block;
    width: 16px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -133px 0px;
  }

  .i-browse {
    display: inline-block;
    width: 15px;
    height: 12px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 0px -20px;
  }

  .i-problem {
    display: inline-block;
    width: 23px;
    height: 19px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -133px -21px;
  }

  .i-node {
    display: inline-block;
    width: 23px;
    height: 19px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -102px -21px;
  }

  .i-edt {
    display: inline-block;
    width: 16px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -22px -19px;
  }

  .i-del {
    display: inline-block;
    width: 15px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -43px -19px;
  }

  .i-laud {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -64px -19px;
  }

  .i-coll {
    display: inline-block;
    width: 15px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 1px -35px;
  }

  .i-play {
    display: inline-block;
    width: 14px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -22px -35px;
    margin-right: 8px;
  }

  .personal-nav {
    height: 550px;
    width: 200px;
    position: relative;
    z-index: 11;
    top: -70px;
    padding: 0px !important;
    background: #fff;
  }

  .personal-nav .title {
    font-size: 18px;
    text-align: center;
    line-height: 60px;
    font-weight: bold;
    color: #00a4ff;
  }

  .personal-nav .my-ico {
    width: 100%;
    text-align: center;
  }

  .personal-nav .my-ico img {
    box-shadow: 2px 2px 4px #000;
    width: 70%;
    margin: 0px auto;
    border-radius: 50%;
  }

  .personal-nav .my-ico p {
    text-align: center;
    line-height: 50px;
  }

  .personal-nav .active a {
    color: #00a4ff;
  }

  .personal-nav li a:hover, .personal-nav li a:active {
    color: #00a4ff;
  }

  .personal-nav li {
    color: #333;
  }

  .personal-nav a {
    padding-top: 5px !important;
    color: #333;
    font-size: 14px;
    line-height: 32px;
    border-bottom: dashed 1px #f4f4f4;
  }

  .personal-nav a:before {
    position: relative;
    top: 0px;
    font-size: 12px;
  }

  .personal-nav .item {
    background: #fff;
    padding: 20px 15px;
    padding-top: 0px;
  }

  .personal-nav .item a {
    display: block;
    text-decoration: none;
  }

  /*
   * colors variables
   */
  html, body {
    min-height: 100%;
    height: 100%;
    min-width: 1000px;
    background: #f3f5f7;
  }

  a {
    color: #2da1e7;
  }

  a:hover {
    color: #2da1e7;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6, p {
    padding: 0px;
    margin: 0;
    line-height: 200%;
  }

  em, i {
    font-style: normal;
  }

  .cr-pd-mr {
    padding: 0px;
    margin: 0px;
  }

  .cl-red {
    color: red !important;
  }

  .cl-orange {
    color: #ff5a2c !important;
  }

  .ft-cen {
    text-align: center;
  }

  .more {
    color: #2da1e7;
  }

  .cl-basics {
    color: #00a4ff;
  }

  .hv-poin:hover {
    cursor: pointer;
  }

  .pd-left {
    padding-left: 15px;
  }

  .pd-rit {
    padding-right: 15px;
  }

  .btn-primary {
    background: #00a4ff;
    border: none;
  }

  .cl-boder {
    border: none;
  }

  .hide {
    display: none;
  }

  .show {
    display: block;
  }

  /****
  * icon 图标 common
  ****/
  .i-chevron-top {
    display: inline-block;
    width: 13px;
    height: 10px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -83px 2px;
  }

  .i-chevron-bot {
    display: inline-block;
    width: 13px;
    height: 10px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -83px -6px;
  }

  .i-heart {
    display: inline-block;
    width: 20px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -104px 0px;
  }

  .i-star {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -57px 0px;
  }

  .i-weixin {
    display: inline-block;
    width: 18px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 0px 1px;
  }

  .i-qq {
    display: inline-block;
    width: 18px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -26px 0px;
  }

  .i-answer {
    display: inline-block;
    width: 16px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -133px 0px;
  }

  .i-browse {
    display: inline-block;
    width: 15px;
    height: 12px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 0px -20px;
  }

  .i-problem {
    display: inline-block;
    width: 23px;
    height: 19px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -133px -21px;
  }

  .i-node {
    display: inline-block;
    width: 23px;
    height: 19px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -102px -21px;
  }

  .i-edt {
    display: inline-block;
    width: 16px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -22px -19px;
  }

  .i-del {
    display: inline-block;
    width: 15px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -43px -19px;
  }

  .i-laud {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -64px -19px;
  }

  .i-coll {
    display: inline-block;
    width: 15px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 1px -35px;
  }

  .i-play {
    display: inline-block;
    width: 14px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -22px -35px;
    margin-right: 8px;
  }

  .personal-cont {
    padding: 0px 10px 10px 25px;
  }

  .personal-cont .top .tit {
    padding: 10px 0;
    font-size: 18px;
    line-height: 45px;
    font-weight: bold;
    color: #00a4ff;
  }

  .personal-cont .top .top-cont {
    position: relative;
    padding: 15px 15px 15px 51px;
    background: #fff;
  }

  .personal-cont .top .top-cont .imgIco {
    position: absolute;
    left: -55px;
    top: 10px;
  }

  .personal-cont .top .top-cont .title {
    font-size: 26px;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .personal-cont .top .top-cont .title .lab {
    position: relative;
    top: -3px;
    margin-right: 10px;
    font-size: 18px;
    color: #333;
  }

  .personal-cont .top .top-cont .title .status {
    margin-left: 10px;
    border: solid 1px #ff7c2d;
    display: inline-block;
    position: relative;
    top: -3px;
    padding: 3px 10px;
    color: #ff7c2d;
    font-size: 15px;
  }

  .personal-cont .top .top-cont .about {
    font-size: 18px;
    color: #00a4ff;
  }

  .personal-cont .top .top-cont .about .lab {
    font-size: 16px;
  }

  .personal-cont .top .top-cont .about .data {
    font-size: 18px;
    color: #999;
  }

  .personal-cont .top .top-cont .about::before {
    content: ' ';
    display: inline-block;
    position: relative;
    margin-right: 10px;
    top: 2px;
    width: 16px;
    height: 16px;
    /*background: url(../../../../assets/img/asset-play.png) center center no-repeat;*/
  }

  .personal-cont .top .top-cont .rate {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .personal-cont .top .top-cont .rate li {
    display: inline-block;
    list-style: none;
    width: 15px;
    height: 15px;
    margin-right: 10px;
    border-radius: 50%;
    border: solid 1px rgba(0, 164, 255, 0.5);
  }

  .personal-cont .top .top-cont .rate .active {
    background: rgba(0, 164, 255, 0.5);
    border: solid 0px rgba(0, 164, 255, 0.5);
  }

  .personal-cont .top .top-cont .goLear {
    display: inline-block;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 10px;
    text-align: center;
    width: 160px;
    line-height: 36px;
    color: #fff;
    background: #ff7c2d;
    border: solid 1px #ff7c2d;
  }

  .personal-cont .top .top-cont .evalu {
    display: inline-block;
    font-weight: bold;
    text-align: center;
    width: 160px;
    color: #ff7c2d !important;
    line-height: 36px;
    color: #000;
    background: #fff;
    border: solid 1px #ff7c2d;
  }

  .personal-cont .top .top-cont .division {
    width: 2px;
    height: 180px;
    position: absolute;
    top: 0px;
    right: 33%;
    background: #f3f5f7;
  }

  .personal-cont .top .top-cont .division::after, .personal-cont .top .top-cont .division::before {
    content: ' ';
    display: inline-block;
    position: relative;
    top: -10px;
    left: -5px;
    background: #f3f5f7;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .personal-cont .top .top-cont .division::after {
    top: 154px;
  }

  .personal-cont .top .top-cont .text-right {
    text-align: center;
  }

  .personal-cont .top .top-cont .btn-primary {
    position: relative;
    top: 50px;
  }

  .personal-cont .my-course {
    padding: 0px;
  }

  .personal-cont .my-course .title {
    padding: 10px 0;
    font-size: 18px;
    line-height: 45px;
    font-weight: bold;
  }

  .personal-cont .my-course .title .lab-title {
    font-size: 18px;
    color: #00a4ff;
  }

  .personal-cont .my-course .title .tit-Item {
    background: #fff;
    padding: 0 10px;
    line-height: 15px;
    color: #333;
  }

  .personal-cont .my-course .title .tit-Item span {
    padding: 10px 0;
    display: inline-block;
    font-size: 14px;
  }

  .personal-cont .my-course .title .tit-Item span em {
    display: inline-block;
    padding: 0 20px;
    border-right: solid 1px #999;
  }

  .personal-cont .my-course .title .tit-Item span em:last-child {
    border: none;
  }

  .personal-cont .my-course .title .tit-Item span:last-child {
    float: right;
  }

  .personal-cont .my-course .title .tit-Item .active {
    color: #00a4ff;
  }

  .personal-cont .my-course .cont .col-lg-6 {
    padding: 0px;
  }

  .personal-cont .my-course .cont .item {
    background: #fff;
    position: relative;
    padding-bottom: 10px;
  }

  .personal-cont .my-course .cont .item .imgIco {
    position: absolute;
    left: -4px;
    top: 30px;
  }

  .personal-cont .my-course .cont .item .title {
    font-size: 22px;
    color: #000;
    font-weight: 400;
    margin-top: 10px;
    margin-bottom: 20px;
    line-height: 14px;
    padding: 30px 0px 0 70px;
  }

  .personal-cont .my-course .cont .item .title .lab {
    position: relative;
    top: -2px;
    margin-right: 10px;
    font-size: 16px;
    color: #333;
  }

  .personal-cont .my-course .cont .item .title .status {
    margin-left: 10px;
    border: solid 1px #ff7c2d;
    display: inline-block;
    position: relative;
    top: -3px;
    padding: 3px 10px;
    color: #ff7c2d;
    font-size: 15px;
  }

  .personal-cont .my-course .cont .item .title .out {
    color: #999;
    border-color: #999;
  }

  .personal-cont .my-course .cont .item .title .outst {
    color: #50b400;
    border-color: #50b400;
  }

  .personal-cont .my-course .cont .item .about {
    font-size: 18px;
    padding: 10px 10px 10px 70px;
    color: #00a4ff;
  }

  .personal-cont .my-course .cont .item .about .lab {
    font-size: 16px;
  }

  .personal-cont .my-course .cont .item .about::before {
    content: ' ';
    display: inline-block;
    position: relative;
    margin-right: 10px;
    top: 2px;
    width: 16px;
    height: 16px;
    /*background: url(../../../../assets/img/asset-play.png) center center no-repeat;*/
  }

  .personal-cont .my-course .cont .item .time {
    padding: 0px 10px 10px 70px;
    font-size: 14px;
    font-weight: 300;
    color: #333;
  }

  .personal-cont .my-course .cont .item .rate {
    margin-top: 10px;
    padding: 0px 15px 15px 70px;
  }

  .personal-cont .my-course .cont .item .rate li {
    display: inline-block;
    list-style: none;
    width: 15px;
    height: 15px;
    margin-right: 10px;
    border-radius: 50%;
    border: solid 1px rgba(0, 164, 255, 0.5);
  }

  .personal-cont .my-course .cont .item .rate .active {
    background: rgba(0, 164, 255, 0.5);
    border: solid 0px rgba(0, 164, 255, 0.5);
  }

  .personal-cont .my-course .cont .item .rate span {
    position: relative;
    top: -2px;
    color: #333;
  }

  .personal-cont .my-course .cont .item .rate span em {
    margin-left: 10px;
  }

  .personal-cont .my-course .cont .col-lg-6:nth-child(2n+1) .item {
    margin: 0px 5px 0px 0;
  }

  .personal-cont .my-course .cont .col-lg-6:nth-child(2n) .item {
    margin: 0px 0px 0px 5px;
  }

  .personal-cont .my-course .cont .comment {
    width: 100%;
    padding-left: 70px;
    margin-top: 40px;
    margin-bottom: 20px;
    color: #333;
  }

  .personal-cont .my-course .cont .comment .star-show {
    width: 109px;
    height: 19px;
    margin-top: 0px;
    display: inline-block;
    background: url(../../../../assets/img/asset-star-show.png) no-repeat;
    background-size: contain;
  }

  .personal-cont .my-course .cont .comment .star-show .score {
    display: inline-block;
  }

  .personal-cont .my-course .cont .comment .star-show .score i {
    display: none;
  }

  .personal-cont .my-course .cont .comment .text {
    display: inline-block;
    margin: 0 10px;
  }

  .personal-cont .my-course .cont .comment .text em {
    color: #ff7c2d;
  }

  .personal-cont .my-course .cont .parting {
    width: 100%;
    height: 20px;
    position: relative;
    margin-top: 10px;
    border-top: solid 1px #f3f5f7;
  }

  .personal-cont .my-course .cont .parting::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    right: -5px;
    top: -5px;
    border-radius: 50%;
    background: #f3f5f7;
  }

  .personal-cont .my-course .cont .parting::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    left: -5px;
    top: -5px;
    border-radius: 50%;
    background: #f3f5f7;
  }

  .personal-cont .my-course .cont .butItem {
    margin-bottom: 10px;
  }

  .personal-cont .my-course .cont .butItem a {
    margin: 0 15px;
    color: #999;
    font-weight: 300;
    padding: 4px 10px;
  }

  .personal-cont .my-course .cont .butItem .golearing {
    border: solid 1px #00a4ff;
    background: #00a4ff;
    color: #fff;
  }

  .personal-cont .my-course .cont .butItem .classcom {
    border: solid 1px #00a4ff;
    color: #00a4ff;
  }

  .personal-cont .help {
    margin-top: 10px;
    padding: 10px;
    font-size: 18px;
    background: #fff;
    color: #333;
  }

  .personal-cont .help span {
    margin-right: 40px;
  }

  .personal-cont .help span::before {
    position: relative;
    top: 2px;
    margin-right: 3px;
  }

  .personal-cont .aft {
    font-size: 15px;
    position: absolute;
    line-height: 10px;
    right: 10px;
    cursor: pointer;
    color: #999;
    top: 10px;
    font-weight: bold;
    text-align: right;
  }

  .personal-cont .aft ul {
    position: relative;
    top: 10px;
    padding: 15px;
    background: #fff;
  }

  .personal-cont .aft li {
    line-height: 34px;
    list-style: none;
  }

  .personal-cont .aft li a {
    color: #000;
  }

  .personal-cont .aft li:hover a {
    color: #00a4ff;
  }

  .personal-cont .ac {
    color: #00a4ff;
  }

  .personal-cont .ac ul {
    border: solid 1px #ddd;
  }

  .personal-cont #listcont {
    position: absolute;
    bottom: 9999px;
  }

  /*
   * colors variables
   */
  html, body {
    min-height: 100%;
    height: 100%;
    min-width: 1000px;
    background: #f3f5f7;
  }

  a {
    color: #2da1e7;
  }

  a:hover {
    color: #2da1e7;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6, p {
    padding: 0px;
    margin: 0;
    line-height: 200%;
  }

  em, i {
    font-style: normal;
  }

  .cr-pd-mr {
    padding: 0px;
    margin: 0px;
  }

  .cl-red {
    color: red !important;
  }

  .cl-orange {
    color: #ff5a2c !important;
  }

  .ft-cen {
    text-align: center;
  }

  .more {
    color: #2da1e7;
  }

  .cl-basics {
    color: #00a4ff;
  }

  .hv-poin:hover {
    cursor: pointer;
  }

  .pd-left {
    padding-left: 15px;
  }

  .pd-rit {
    padding-right: 15px;
  }

  .btn-primary {
    background: #00a4ff;
    border: none;
  }

  .cl-boder {
    border: none;
  }

  .hide {
    display: none;
  }

  .show {
    display: block;
  }

  /****
  * icon 图标 common
  ****/
  .i-chevron-top {
    display: inline-block;
    width: 13px;
    height: 10px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -83px 2px;
  }

  .i-chevron-bot {
    display: inline-block;
    width: 13px;
    height: 10px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -83px -6px;
  }

  .i-heart {
    display: inline-block;
    width: 20px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -104px 0px;
  }

  .i-star {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -57px 0px;
  }

  .i-weixin {
    display: inline-block;
    width: 18px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 0px 1px;
  }

  .i-qq {
    display: inline-block;
    width: 18px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -26px 0px;
  }

  .i-answer {
    display: inline-block;
    width: 16px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -133px 0px;
  }

  .i-browse {
    display: inline-block;
    width: 15px;
    height: 12px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 0px -20px;
  }

  .i-problem {
    display: inline-block;
    width: 23px;
    height: 19px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -133px -21px;
  }

  .i-node {
    display: inline-block;
    width: 23px;
    height: 19px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -102px -21px;
  }

  .i-edt {
    display: inline-block;
    width: 16px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -22px -19px;
  }

  .i-del {
    display: inline-block;
    width: 15px;
    height: 14px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -43px -19px;
  }

  .i-laud {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -64px -19px;
  }

  .i-coll {
    display: inline-block;
    width: 15px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: 1px -35px;
  }

  .i-play {
    display: inline-block;
    width: 14px;
    height: 13px;
    background: url(../../../../assets/img/asset-icoGather.png) no-repeat;
    background-position: -22px -35px;
    margin-right: 8px;
  }

  .personal-content .go-problem-feedback {
    border-top: solid 2px #333;
    font-size: 24px;
    margin-top: 20px;
    padding: 20px 0;
  }

  .personal-content {
    width: 930px;
  }
</style>
