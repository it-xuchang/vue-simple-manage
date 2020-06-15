<template>
  <div class="login">
    <div class="login-head">
      <img src="../../../static/images/logo.png">
    </div>
    <div class="login-main">
      <div class="login-info">
        <h2>禅城区电子政务区块链基础平台</h2>
        <p>基于国密算法的区块链系统</p>
        <p>支持合约部署、合约升级</p>
        <p>支持数据存储、修改、查询</p>
        <p>禅城区电子政务各业务系统的通用信息化基础设施</p>
        <p>率先打造的区县级电子政务区块链平台</p>
        <p>全国区块链电子政务平台建设示范平台</p>
      </div>
      <div class="login-form">
        <p>欢迎登录</p>
        <el-form ref="loginRules" :model="loginForm" :rules="loginRules">
          <el-form-item prop="loginName">
            <el-input v-model.trim="loginForm.loginName" placeholder="请输入您的用户名">
              <i slot="prefix" class="el-input__icon icon-user" />
            </el-input>
          </el-form-item>
          <el-form-item prop="loginPass">
            <el-input v-model.trim="loginForm.loginPass" type="password" placeholder="请输入您的密码">
              <i slot="prefix" class="el-input__icon icon-pass" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <div ref="dragDiv" class="drag">
              <div class="drag_bg" />
              <div class="drag_text">{{ confirmWords }}</div>
              <div ref="moveDiv" :class="{'handler_ok_bg':confirmSuccess}" class="handler handler_bg" style="position: absolute;top: 0px;left: 0px;" @mousedown="mousedownFn($event)" />
            </div>
          </el-form-item>
          <el-form-item>
            <div class="select-checkbox">
              <el-checkbox v-model.trim="checked" /><span style="padding-left:10px">记住用户名</span>
            </div>
          </el-form-item>
          <div class="confirm-button">
            <el-button v-btn-rules:login="'loginRules'">登 录</el-button>
            <!-- <el-button @click="login">登 录</el-button> -->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SHA from 'js-sha256'
import { setStorage, getStorage } from '@/assets/cookie.js'
export default {
  data() {
    return {
      loginForm: {
        loginName: '',
        loginPass: ''
      },
      loginRules: {
        loginName: [{ required: true, message: '请输入您的用户名', trigger: 'blur' }],
        loginPass: [{ required: true, message: '请输入您的密码', trigger: 'blur' }]
      },
      checked: false,
      menuList: [],
      beginClientX: 0, /* 距离屏幕左端距离*/
      mouseMoveStata: false, /* 触发拖动状态  判断*/
      maxwidth: '', /* 拖动最大宽度，依据滑块宽度算出来的*/
      confirmWords: '请将滑块拖动到右边', /* 滑块文字*/
      confirmSuccess: false /* 验证成功判断*/
    }
  },
  mounted() {
    if (getStorage('loginName') && getStorage('loginPass')) {
      this.loginForm.loginName = getStorage('loginName')
      this.loginForm.loginPass = getStorage('loginPass')
      this.checked = true
    }
    // this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth
    this.maxwidth = 322
    document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveFn)
    document.getElementsByTagName('html')[0].addEventListener('mouseup', this.moseUpFn)
  },
  methods: {
    getOffset(box, direction) {
      var setDirection = (direction === 'top') ? 'offsetTop' : 'offsetLeft'
      var offset = box[setDirection]
      var parentBox = box.offsetParent
      while (parentBox) {
        offset += parentBox[setDirection]
        parentBox = parentBox.offsetParent
      }
      parentBox = null
      return parseInt(offset)
    },
    mousedownFn: function(e) {
      this.$refs.loginRules.validate((valid) => {
        if (valid) {
          if (!this.confirmSuccess) {
            e.preventDefault && e.preventDefault() // 阻止文字选中等 浏览器默认事件
            this.mouseMoveStata = true
            this.beginClientX = e.clientX
          }
        } else {
          this.$message({ type: 'error', message: '滑动前请填写完整信息' })
          return
        }
      })
    }, // mousedoen 事件
    successFunction() {
      this.confirmSuccess = true
      this.confirmWords = '验证通过'
      if (window.addEventListener) {
        document.getElementsByTagName('html')[0].removeEventListener('mousemove', this.mouseMoveFn)
        document.getElementsByTagName('html')[0].removeEventListener('mouseup', this.moseUpFn)
      } else {
        document.getElementsByTagName('html')[0].removeEventListener('mouseup', () => {})
      }
      document.getElementsByClassName('drag_text')[0].style.color = '#fff'
      document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px'
      document.getElementsByClassName('drag_bg')[0].style.width = this.maxwidth + 'px'
    }, // 验证成功函数
    mouseMoveFn(e) {
      if (this.mouseMoveStata) {
        const width = e.clientX - this.beginClientX
        if (width > 0 && width <= this.maxwidth) {
          document.getElementsByClassName('handler')[0].style.left = width + 'px'
          document.getElementsByClassName('drag_bg')[0].style.width = width + 'px'
        } else if (width > this.maxwidth) {
          this.successFunction()
        }
      }
    }, // mousemove事件
    moseUpFn(e) {
      this.mouseMoveStata = false
      var width = e.clientX - this.beginClientX
      if (width < this.maxwidth) {
        document.getElementsByClassName('handler')[0].style.left = 0 + 'px'
        document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px'
      }
    },
    login(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (this.confirmSuccess === false) {
            this.$alert('请先完成滑动验证')
            return
          }
          const params = {
            loginName: this.loginForm.loginName,
            // password: this.loginForm.loginPass
            password: SHA.sha256('iData' + this.loginForm.loginPass),
            applicationId: '611270830508371968'
            // password: SHA.sha256('888888' + this.loginForm.loginPass)
          }
          // this.$api.user.operateLogin(params)
          //   .then(data => {
          //     if (data.success) {
          //       if (this.checked === true) {
          //         setStorage('loginName', this.loginForm.loginName)
          //         setStorage('loginPass', this.loginForm.loginPass)
          //       }
          //       this.$store.commit('setUserInfo', data)
          //       return this.getMenuList(data.userId)
          //     } else {
          //       this.$message.error(data.returnMsg)
          //       return
          //     }
          //   })
          //   .catch(res => { console.log(res) })
        } else {
          this.$message.error('请检查信息再提交！')
          return
        }
      })
    }/*,
    getMenuList(userInfo) {
      const params = {
        'applicationId': '611270830508371968',
        'userId': userInfo
      }
      this.$store.commit('login', '611270830508371968')
      return this.$api.user.resourceQuery(params)
        .then(data => {
          if (data.success) {
            data.data.forEach((item) => {
              if (item.parentId === '') {
                item.children = []
                this.menuList.push(item)
              }
            })
            this.menuList.forEach((menu) => {
              data.data.forEach((list) => {
                if (menu.id === list.parentId) {
                  menu.children.push(list)
                }
              })
            })
            // sessionStorage.setItem('MENUS', JSON.stringify(this.menuList))
            this.$store.commit('menuList', this.menuList)
            this.$router.push('/index')
          } else {
            this.$message.error('获取权限资源失败，请联系管理员或稍后重试')
            return
          }
        })
        .catch(res => { console.log(res) })
    }*/
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.login{
  width:100%;
	height:100%;
	min-width:1200px;
	min-height:960px;
	background:url(../../../static/images/login_back.png) no-repeat;
	background-size: cover;
	position:absolute;
    .login-head{
        width:360px;
        height:35px;
        margin-top:45px;
        margin-left: 3.5%;
        img{
            width:100%;
            height:100%;
        }
    }
    .login-main{
        width:1200px;
        padding:100px 49px;
        margin: 0 auto;
        .login-info{
            float:left;
            padding:160px 75px 40px 0;
            h2{
                font-size:34px;
                font-weight:bold;
                color:rgba(255,255,255,1);
                line-height:60px;
                margin-bottom: 40px;
            }
            p{
                font-size:18px;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:40px;
            }
        }
        .login-form{
            float:left;
            width:550px;
            height:660px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 3px 0px rgba(25,22,23,0.39);
            border-radius:5px;
            padding:50px 90px;
            p{
                font-size:30px;
                font-weight:500;
                color:rgba(51,51,51,1);
            }
            .el-form{
                margin-top: 55px;
                .el-form-item{
                  margin-bottom: 45px;
                  .drag{
                    position: relative;
                    background-color: #e8e8e8;
                    width: 370px;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    border-radius:6px;
                  }
                  .handler{
                    width: 50px;
                    height: 50px;
                    border: 1px solid #ccc;
                    cursor: pointer;
                  }
                  .handler_bg{
                    border-radius:6px;
                    background: #fff;
                    /*background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;*/
                  }
                  .handler_ok_bg{
                    border-radius:0 6px 6px 0;
                    background: #fff;
                    /*background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;*/
                  }
                  .drag_bg{
                    border-radius:6px 0 0 6px;
                    background-color: #7ac23c;
                    height: 50px;
                    width: 0px;
                  }
                  .drag_text{
                    position: absolute;
                    top: 0px;
                    color:rgba(204,204,204,1);
                    width: 100%;text-align: center;
                    -moz-user-select: none;
                    -webkit-user-select: none;
                    user-select: none;
                    -o-user-select:none;
                    -ms-user-select:none;
                  }
                }
                i{
                    display:inline-block;
                    margin: 15px 10px;
                    vertical-align:middle;
                }
                .icon-user{
                    width: 20px;
                    height: 20px;
                    background:url(../../../static/img/login_icon1.png) no-repeat 0 0;
                }
                .icon-pass{
                    width: 20px;
                    height: 20px;
                    background:url(../../../static/img/login_icon2.png) no-repeat 0 0;
                }
                .select-checkbox{
                  span{
                    font-size:20px;
                    font-weight:400;
                    color:rgba(154,152,152,1);
                  }
                }
            }
        }
    }
}
</style>
