<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input  placeholder="教师名" v-model="queryParam.teacherName" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="teacherItems.datas"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column  label="用户名" align="center">
          <template slot-scope="scope">
            {{scope.row.teacherName}}<span v-if="userId == scope.row.teacherId"><i class="el-icon-check"></i></span>
          </template>

        </el-table-column>
        <el-table-column label="头像(查看大图)" align="center">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.teacherImageUrl"
              :preview-src-list="[scope.row.teacherImageUrl]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="email" align="center">
          <template slot-scope="scope">{{scope.row.email}}</template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              @change="handleChangeSwitch(scope.row)"
              inactive-color="#ff4949"
              active-value="1"
              active-text="有效"
              inactive-text="锁定"
              inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="注册时间" align="center"></el-table-column>
        <el-table-column label="角色" align="center">
          <template slot-scope="scope">{{scope.row.roleResult.roleName}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
<!--            @click="handleEditTeacherRole(scope.$index, scope.row)"-->
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleTeacherDetailDialog(scope.row)"
            >编辑教师角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" style="margin-top: 20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="teacherItems.pageNum"
          :page-sizes="[4, 8, 16, 20]"
          :page-size="teacherItems.pageSize"
          background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="teacherItems.total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="编辑教师角色" :visible.sync="dialogFormVisible" width="40%">
      <el-form ref="teacherForm"
               :model="teacherForm"
               status-icon
               :rules="teacherRules" label-width="100px">
        <el-form-item label="教师名称：" prop="teacherName">
          <el-input disabled v-model="teacherForm.teacherName" auto-complete="off" placeholder="请输入教师名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input disabled v-model="teacherForm.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input disabled v-model="teacherForm.mobile" auto-complete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item   label="角色：" >
          <el-select v-model="teacherForm.roleId"  placeholder="请选择角色">
            <el-option  v-for="item in roleItem" :key="item" :label="item.roleName" :value="item.roleId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="教师描述" prop="description">
          <el-input disabled type="textarea" v-model="teacherForm.description" rows="5" ></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditTeacherRole()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {page} from '../../../../api/teacherlist'
  import {changeStatus} from '../../../../api/teacherlist'
  import {queryRole} from '../../../../api/teacherlist'
  import {editTeacherRole} from '../../../../api/teacherlist'

  export default {
    name: 'teacherList',
    data() {
      return {
        queryParam:{
          pageNum:1,
          pageSize:4,
          teacherName:''
        },
        teacherItems:{},
        teacherForm: {
          teacherId: "",
          teacherName: "",
          email: "",
          mobile: "",
          description: "",
          roleId: "",
        },
        teacherRules: {
          teacherName: [{required: true, trigger: 'blur', message: '教师名不能为空'}],
          email: [{required: true, trigger: 'blur', message: '邮箱不能为空'}],
          mobile: [{required: true, trigger: 'blur', message: '手机号不能为空'}],
          description: [{required: true, trigger: 'blur', message: '描述不能为空'}],
        },
        roleItem:[],
        dialogFormVisible:false,
        userId:JSON.parse(localStorage.getItem("userId"))
      };
    },
    created() {
      this.handleQueryUser();
    },
    mounted () {

    },
    methods: {
      handleQueryUser(){
        page(this.queryParam).then(response => {
          this.teacherItems = response.data.data;
          var teacherId = JSON.parse(localStorage.getItem("userId"))

        }).catch(error => {
          this.$message(error)
        })
      },
      handleSizeChange(val) {
        this.queryParam.pageSize = val
        this.handleQueryUser();
      },
      handleCurrentChange(val) {
        this.queryParam.pageNum = val
        this.handleQueryUser();
      },
      handleTeacherDetailDialog(row){
        this.handleQueryRole();
        this.teacherForm.teacherId = row.teacherId
        this.teacherForm.teacherName = row.teacherName
        this.teacherForm.sex = row.sex
        this.teacherForm.description = row.description
        this.teacherForm.mobile = row.mobile
        this.teacherForm.email = row.email
        this.teacherForm.roleId = row.roleResult.roleId
        this.dialogFormVisible = true
      },
      handleEditTeacherRole(){
        this.$confirm('切换用户角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            userId:'',
            roleId:''
          }
          param.userId=this.teacherForm.teacherId
          param.roleId=this.teacherForm.roleId
          editTeacherRole(param).then(response => {
            if (response.data.success){
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.handleQueryUser();
              this.dialogFormVisible = false
            }else {
              this.$message.error(response.data.returnMsg);
            }
          }).catch(error => {
            this.$message(error)
          })

        }).catch(() => {
          this.dialogFormVisible = false
          this.handleQueryUser();
        });
      },
      handleQueryRole(){
        queryRole().then(response => {
          this.roleItem = response.data.data
        }).catch(error => {
          this.$message(error)
        })
      },
      handleChangeSwitch(row){

        this.$confirm('切换用户状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            teacherId: '',
            status: ''
          }
          param.teacherId = row.teacherId
          param.status = row.status
          changeStatus(param).then(response => {
            if (response.data.success){
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.handleQueryUser();
            }else {
              this.$message.error(reponse.data.returnMsg);
            }
          }).catch(error => {
            this.$message(error)
          })

        }).catch(() => {
          this.handleQueryUser();
        });
      },
      // 触发搜索按钮
      handleSearch() {
        this.handleQueryUser();
      },
      // 删除操作
      handleDelete(index, row) {

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
