<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input  placeholder="用户名" v-model="queryParam.username" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="userItems.datas"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                  <template slot-scope="scope">
                    <el-image
                      :src="scope.row.userImageUrl"
                      :preview-src-list="[scope.row.userImageUrl]"
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
            </el-table>
            <div class="pagination" style="margin-top: 20px">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="userItems.pageNum"
                :page-sizes="[4, 8, 16, 20]"
                :page-size="userItems.pageSize"
                background="true"
                layout="total, sizes, prev, pager, next, jumper"
                :total="userItems.total">
              </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
  import {page} from '../../../../api/userlist'
  import {changeStatus} from '../../../../api/userlist'

  export default {
    name: 'userlist',
    data() {
        return {
          queryParam:{
            pageNum:1,
            pageSize:4,
            username:''
          },
          userItems:{}
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
          this.userItems = response.data.data;
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
      handleChangeSwitch(row){

        this.$confirm('切换用户状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            userId: '',
            status: ''
          }
          param.userId = row.userId
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
