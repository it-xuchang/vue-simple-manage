<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input  placeholder="角色名" v-model="queryParam.roleName" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="roleItems.datas"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column width="300" label="角色名称" align="center">
          <template slot-scope="scope">
            {{scope.row.roleName}}
          </template>
        </el-table-column>
        <el-table-column width="300" label="描述" align="center">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column width="200" prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作栏"  align="center">
          <template slot-scope="scope">
            <el-row>
<!--              <el-link @click="handleRoleDrawer(scope.row)">查看菜单<i class="el-icon-view el-icon&#45;&#45;right"></i> </el-link>-->
<!--              <el-link @click="handleRoleDrawer(scope.row)">查看按钮<i class="el-icon-view el-icon&#45;&#45;right"></i> </el-link>-->
              <el-button type="primary" @click="handleRoleDrawer(scope.row)" icon="el-icon-view" circle></el-button>
              <el-button type="primary" @click="handleUpdateDialog(scope.row)" icon="el-icon-edit" circle></el-button>
              <el-button type="danger" @click="handleDeleteRole(scope.row)" icon="el-icon-delete" circle></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" style="margin-top: 20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="roleItems.pageNum"
          :page-sizes="[4, 8, 16, 20]"
          :page-size="roleItems.pageSize"
          background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="roleItems.total">
        </el-pagination>
      </div>

    </div>
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="roleForm" :rules="roleRules" ref="roleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="角色名称" prop="categoryName">
        <el-input v-model="roleForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="label">
        <el-input type="textarea" v-model="roleForm.remark"></el-input>
      </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditRole">确 定</el-button>
      </div>
    </el-dialog>

    <el-drawer
      :title="drawerDialog.title"
      :visible.sync="drawerDialog.drawer"
      :direction="drawerDialog.direction"
      :before-close="handleClose">
      <div style="padding: 0 20px">
        <p>角色名称：<span>{{drawerDialog.roleName}}</span></p>
        <el-tree
          ref="tree"
          :data="menuItems"
          show-checkbox
          node-key="menuId"
          :default-checked-keys="checkMenuId"
          :props="defaultProps">
        </el-tree>
        <br>
        <el-button type="primary" >编辑</el-button>
        <el-button @click="drawerDialog.drawer = false" type="info" >取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import {addRole, page} from '../../../../api/rolelist'
  import {editRole} from '../../../../api/rolelist'
  import {deleteRole} from '../../../../api/rolelist'
  import {roleMenuTree} from '../../../../api/rolelist'
  import {queryRoleMenu} from '../../../../api/rolelist'

  export default {
    name: 'roleList',
    data() {
      return {
        queryParam:{
          pageNum:1,
          pageSize:4,
          roleName:''
        },
        roleItems:{},
        roleForm: {
          roleId: '',
          roleName: '',
          remark: '',
          menuIds: []
        },
        roleRules: {
          roleName: [{required: true, trigger: 'blur', message: '角色名不能为空'}],
          remark: [{required: true, trigger: 'blur', message: '描述不能为空'}]
        },
        dialogFormVisible: false,
        drawerDialog:{
          drawer: false,
          direction: 'rtl',
          title:'角色菜单',
          roleName:'',
          roleItems:[]
        },
        menuItems:[],
        defaultProps: {
          children: 'subMenus',
          label: 'menuName'
        },
        checkMenuId:[]
      };
    },
    created() {
      this.handleQueryRole();
    },
    mounted () {

    },
    methods: {
      handleQueryRole(){
        page(this.queryParam).then(response => {
          this.roleItems = response.data.data;

        }).catch(error => {
          this.$message(error)
        })
      },
      handleSizeChange(val) {
        this.queryParam.pageSize = val
        this.handleQueryRole();
      },
      handleCurrentChange(val) {
        this.queryParam.pageNum = val
        this.handleQueryRole();
      },
      // 触发搜索按钮
      handleSearch() {
        this.handleQueryRole();
      },
      // 删除操作
      handleDelete(index, row) {

      },
      handleUpdateDialog(row){
        this.dialogFormVisible = true;
        this.roleForm.roleName = row.roleName
        this.roleForm.remark = row.remark
        this.roleForm.roleId = row.roleId

      },
      handleEditRole(){
        editRole(this.roleForm).then(reponse => {
          if (reponse.data.success) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.handleQueryRole();
            this.dialogFormVisible = false;
          } else {
            this.$message.error(reponse.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })
      },
      handleDeleteRole(row){
        this.$confirm('删除角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            roleId:''
          }
          param.roleId = row.roleId
          deleteRole(param).then(reponse => {
            if (reponse.data.success) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.handleQueryRole();
            } else {
              this.$message.error(reponse.data.returnMsg);
            }
          }).catch(error => {
            this.$message(error)
          })
        }).catch(() => {
          this.handleQueryRole();
        });

      },
      handleRoleDrawer(row){
        this.drawerDialog.drawer = true;
        this.drawerDialog.roleName = row.roleName;

        var param = {
          roleId:''
        }
        param.roleId = row.roleId
        roleMenuTree(param).then(response => {
          var menus = []
          response.data.data.forEach(item => {
            menus.push(item.menuId)
          })
          this.checkMenuId = menus
          this.menuItems = response.data.data;
        }).catch(error => {
          this.$message(error)
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // 多选操作
      handleSelectionChange(val) {

      },
      delAllSelection() {

      },
      // 编辑操作
      handleEdit(index, row) {

      },
      // 分页导航
      handlePageChange(val) {
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
