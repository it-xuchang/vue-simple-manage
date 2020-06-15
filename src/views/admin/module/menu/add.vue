<template>
    <div style="width:600px">
        <div class="container">
            <div class="form-box">
              <el-form :model="menuFrom" :rules="menuRules" ref="menuFrom" label-width="100px" class="demo-ruleForm">
              <el-form-item label="菜单名称" prop="menuName">
                <el-input v-model="menuFrom.menuName"></el-input>
              </el-form-item>
              <el-form-item label="选择级别">
                <el-select v-model="menuFrom.parentId" placeholder="请选择">
                  <el-option label="一级" value=""></el-option>
                  <el-option v-for="item in menuItems" :key="item" :label="item.menuName" :value="item.menuId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择类型">
                <el-select v-model="menuFrom.type" placeholder="请选择">
                  <el-option label="菜单" value="0"></el-option>
                  <el-option label="按钮" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="请求路径" prop="path">
                <el-input v-model="menuFrom.path"></el-input>
              </el-form-item>
              <el-form-item label="路由" prop="component">
                <el-input v-model="menuFrom.component"></el-input>
              </el-form-item>
              <el-form-item label="图标" prop="icon">
                <el-input v-model="menuFrom.icon"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleAddMenu()">添加</el-button>
                <el-button type="info" @click="handleConnel()">取消</el-button>
              </el-form-item>
            </el-form>
            </div>
        </div>
    </div>
</template>

<script>
  import {addMenu, editMenu, tree} from '../../../../api/menulist'
export default {
    name: 'menuAdd',
    data() {
        return {
          menuFrom: {
            parentId: '',
            menuName: '',
            path: '',
            type: '',
            component: '',
            icon: ''
          },
          menuItems:[],
          menuRules: {
            menuName: [{required: true, trigger: 'blur', message: '菜单名不能为空'}],
          },
        };
    },
  created () {
    this.handleQueryMenu();
  },
  methods: {
      handleConnel(){
        this.$refs['menuFrom'].resetFields()
      },
      handleQueryMenu(){

        tree(this.queryParam).then(response => {
          this.menuItems = response.data.data;
        }).catch(error => {
          this.$message(error)
        })
      },
      handleAddMenu(){
        addMenu(this.menuFrom).then(response => {
          if (response.data.success){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$refs['menuFrom'].resetFields()
          }else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })
      }
    }
};
</script>
<style scoped>

</style>
