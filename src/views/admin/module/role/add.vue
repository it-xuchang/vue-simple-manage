<template>
    <div style="width:600px">
        <div class="container">
            <div class="form-box">
              <el-form :model="roleForm" :rules="roleRules" ref="roleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="角色名称：" prop="categoryName">
                  <el-input v-model="roleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="描述：" prop="label">
                  <el-input type="textarea" v-model="roleForm.remark"></el-input>
                </el-form-item>
                <el-form-item label="角色资源：" prop="label">
                  <el-tree
                    ref="tree"
                    :data="menuItems"
                    show-checkbox
                    node-key="menuId"
                    :default-checked-keys="checkMenuId"
                    :props="defaultProps">
                  </el-tree>

                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleAddRole()">添加</el-button>
                  <el-button type="info" @click="handleConnel()">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          <div></div>
        </div>
    </div>
</template>

<script>
  import {addRole} from '../../../../api/rolelist'
  import {treeMenu} from '../../../../api/rolelist'
  import {queryRoleMenu} from '../../../../api/rolelist'
export default {
    name: 'roleAdd',
    data() {
        return {
          roleForm: {
            roleName: '',
            remark: '',
            menuIds: []
          },
          roleRules: {
            roleName: [{required: true, trigger: 'blur', message: '角色名不能为空'}],
            remark: [{required: true, trigger: 'blur', message: '描述不能为空'}]
          },
          menuItems:[],
          defaultProps: {
            children: 'subMenus',
            label: 'menuName'
          },
          checkMenuId:[]
        };
    },
  created () {
      this.handleTreeRoleMenu();
  },
  methods: {
    handleAddRole() {
      let res = this.$refs.tree.getCheckedKeys()
      this.roleForm.menuIds = res
      addRole(this.roleForm).then(reponse => {
        if (reponse.data.success) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.$refs['roleForm'].resetFields()
        } else {
          this.$message.error(reponse.data.returnMsg);
        }
      }).catch(error => {
        this.$message(error)
      })
    },
    handleConnel(){
      this.$refs['roleForm'].resetFields()
    },
    handleTreeRoleMenu(){
      //配置菜单
      var  param = {
      }
      treeMenu(param).then(response => {
        if (response.data.success) {
          var menus = []
          response.data.data.forEach(item => {
            if (item.type == '1'){
              menus.push(item.menuId)
            }
          })
          this.checkMenuId = menus
          this.menuItems = response.data.data;

        } else {
          this.$message.error(response.data.returnMsg);
        }

      }).catch(error => {
        this.$message(error)
      })
    }
  }
};
</script>
