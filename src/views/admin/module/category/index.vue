<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input  placeholder="分类名" v-model="queryParam.categoryName" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="categoryItems.datas"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column width="300" label="分类名称" align="center">
          <template slot-scope="scope">
            {{scope.row.categoryName}}
          </template>
        </el-table-column>
        <el-table-column width="300" label="描述" align="center">
          <template slot-scope="scope">{{scope.row.label}}</template>
        </el-table-column>
        <el-table-column width="300" label="是否显示首页栏" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isShow==0">是</span>
            <span v-if="scope.row.isShow==1">否</span>
          </template>
        </el-table-column>
        <el-table-column label="操作栏"  align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button type="primary" @click="handleCategory(scope.row)" icon="el-icon-edit" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)" circle></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" style="margin-top: 20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="categoryItems.pageNum"
          :page-sizes="[4, 8, 16, 20]"
          :page-size="categoryItems.pageSize"
          background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="categoryItems.total">
        </el-pagination>
      </div>

      <el-dialog title="编辑分类" :visible.sync="dialogFormVisible" width="40%">
        <el-form :model="categoryForm" :rules="categoryRules" ref="categoryForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="分类名称" prop="categoryName">
            <el-input v-model="categoryForm.categoryName"></el-input>
          </el-form-item>
          <el-form-item label="是否显示首页" prop="isShow">
            <el-select v-model="categoryForm.isShow" placeholder="请选择">
              <el-option label="是" value="0"></el-option>
              <el-option label="否" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="label">
            <el-input type="textarea" v-model="categoryForm.label"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditCategory()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import {page} from '../../../../api/categorylist'
  import {deleteCategory} from '../../../../api/categorylist'
  import {editCategory} from '../../../../api/categorylist'

  export default {
    name: 'categoryList',
    data() {
      return {
        queryParam:{
          pageNum:1,
          pageSize:4,
          categoryName:''
        },
        categoryItems:{},
        categoryForm: {
          categoryId: '',
          categoryName: '',
          label: '',
          isShow: ''
        },
        categoryRules: {
          categoryName: [{required: true, trigger: 'blur', message: '分类名不能为空'}],
          label: [{required: true, trigger: 'blur', message: '分类描述不能为空'}]
        },
        dialogFormVisible: false
      };
    },
    created() {
      this.handleQueryCategory();
    },
    mounted () {

    },
    methods: {
      handleQueryCategory(){
        page(this.queryParam).then(response => {
          this.categoryItems = response.data.data;

        }).catch(error => {
          this.$message(error)
        })
      },
      handleSizeChange(val) {
        this.queryParam.pageSize = val
        this.handleQueryCategory();
      },
      handleCurrentChange(val) {
        this.queryParam.pageNum = val
        this.handleQueryCategory();
      },
      // 触发搜索按钮
      handleSearch() {
        this.handleQueryCategory();
      },
      // 删除操作
      handleDelete(row) {
        this.$confirm('删除分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            categoryId:''
          }
          param.categoryId = row.categoryId
          deleteCategory(param).then(reponse => {
            if (reponse.data.success){
              this.handleQueryCategory();
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

      },
      handleCategory(row){
        this.dialogFormVisible = true;
        this.categoryForm.label = row.label
        this.categoryForm.categoryName = row.categoryName
        this.categoryForm.isShow = row.isShow
        this.categoryForm.categoryId = row.categoryId
      },
      // 编辑操作
      handleEditCategory() {
        editCategory(this.categoryForm).then(reponse => {
          if (reponse.data.success){
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.handleQueryCategory();
            this.dialogFormVisible = false;

          }else {
            this.$message.error(reponse.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })
      },
      // 多选操作
      handleSelectionChange(val) {

      },
      delAllSelection() {

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
