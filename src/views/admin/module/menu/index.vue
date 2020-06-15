<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-select style="width: 100px" v-model="queryParam.type" placeholder="请选择">
          <el-option label="所有" value="" onselect="this"></el-option>
          <el-option label="菜单" value="0"></el-option>
          <el-option label="按钮" value="1"></el-option>
        </el-select>
        <el-input  placeholder="资源名称" v-model="queryParam.menuName" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
      </div>
      <el-table
        :data="menuItems"
        style="width: 100%;margin-bottom: 20px;"
        row-key="menuId"
        border
        :tree-props="{children: 'subMenus'}">
        <el-table-column
          prop="menuName"
          label="菜单名称"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          prop="path"
          label="请求路径"
          sortable
          width="300">
        </el-table-column>
        <el-table-column
          prop="component"
          label="路由"
          sortable
          width="300">
        </el-table-column>
        <el-table-column
          width="60"
          label="图标">
          <template slot-scope="scope">
            <i v-if="scope.row.icon != null || scope.row.icon != ''" :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          sortable
          width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.type==0">菜单</span>
            <span v-if="scope.row.type==1">按钮</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="修改时间">
        </el-table-column>
        <el-table-column label="操作栏"  align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button type="primary" @click="handleMenu(scope.row)" icon="el-icon-edit" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDeleteMenu(scope.row)" circle></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>


    </div>
    <el-dialog title="编辑菜单" :visible.sync="dialogFormVisible" width="40%">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditMenu()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {tree} from '../../../../api/menulist'
  import {editMenu} from '../../../../api/menulist'
  import {deleteMenu} from '../../../../api/menulist'

  export default {
    name: 'menuList',
    data() {
      return {
        queryParam:{
          menuName:'',
          type:''
        },
        menuItems:[],
        dialogFormVisible: false,
        menuFrom: {
          menuId: '',
          parentId: '',
          menuName: '',
          path: '',
          type: '',
          component: '',
          icon: ''
        },
        menuRules: {
          menuName: [{required: true, trigger: 'blur', message: '菜单名不能为空'}],
        },
      };
    },
    created() {
      this.handleQueryMenu();
    },
    mounted () {

    },
    methods: {
      handleSearch(){
        this.handleQueryMenu();
      },
      handleQueryMenu(){

        tree(this.queryParam).then(response => {
          this.menuItems = response.data.data;
        }).catch(error => {
          this.$message(error)
        })
      },
      handleMenu(row){
        this.dialogFormVisible = true
        this.menuFrom.component = row.component
        this.menuFrom.menuId = row.menuId
        this.menuFrom.menuName = row.menuName
        this.menuFrom.icon = row.icon
        this.menuFrom.parentId = row.parentId
        this.menuFrom.path = row.path
        this.menuFrom.type = row.type
      },
      handleEditMenu(){
        editMenu(this.menuFrom).then(response => {
          if (response.data.success){
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.handleQueryMenu();
            this.dialogFormVisible = false;

          }else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })
      },
      handleDeleteMenu(row){
        this.$confirm('删除菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            menuIds:[]
          }
          param.menuIds.push(row.menuId)
          deleteMenu(param).then(reponse => {
            if (reponse.data.success){
              this.handleQueryMenu();
            }else {
              this.$message.error(reponse.data.returnMsg);
            }
          }).catch(error => {
            this.$message(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  };
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .table {
    width: 100%;
    font-size: 14px;
  }
  .red {
    color: #ff0000;
  }
  .mr10 {
    margin-right: 10px;
  }
  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>
