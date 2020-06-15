<template>
  <div>
    <el-menu :default-openeds="['1', '3']"
             unique-opened="true"
             background-color="#545c64"
             text-color="#fff"
             @open="handleOpen"
             @close="handleClose"
             active-text-color="#ffd04b">
      <template>
        <el-menu-item index="2" :hidden="isHidden" @click="handleJoinTemplate('/admin/bashboard')">
          <i class="el-icon-s-platform"></i>
          <span slot="title">管理面板</span>
        </el-menu-item>
        <template v-for="item in menuList">
          <el-submenu :index="item.component">
            <template slot="title"><i :class="item.icon"></i>{{item.menuName}}</template>
            <template v-if=" 'subMenus' in item"
                      v-for="child in item.subMenus">
              <el-menu-item :index="child.component" @click="handleJoinTemplate(child.component)">{{child.menuName}}</el-menu-item>
            </template>

          </el-submenu>
        </template>
      </template>


    </el-menu>
  </div>
</template>

<script>
  import bus from '../../../components/common/bus';
  export default {
    name: 'adminAside',
    inject:['reload'],
    data () {
      return {
        menuList: [],
        isHidden:true,
        msg:''
      }
    },
    created () {
      var menus = JSON.parse(localStorage.getItem("menus"));
      var roleId = JSON.parse(localStorage.getItem("roleId"));
      this.menuList = menus
      if (roleId == 101){
        this.isHidden = false
      }

    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleJoinTemplate(url){
        this.$router.push({
          path: url
        })
        bus.$emit('fullpath', this.msg);
        // this.reload();
      }
    }
  }
</script>

<style scoped>
  .el-menu{
    text-align: left !important;
    height: 100% !important;
  }
  .el-aside {
    color: #333;
  }
  .el-submenu__title{
    padding: 0 21px 0 20px !important;
  }
</style>
