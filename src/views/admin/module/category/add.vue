<template>
    <div style="width:600px">
        <div class="container">
            <div class="form-box">
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
                <el-form-item>
                  <el-button type="primary" @click="handleAddCategory()">添加</el-button>
                  <el-button type="info" @click="handleConnel()">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
        </div>
    </div>
</template>

<script>
  import {addCategory} from '@/api/category'
export default {
    name: 'categoryAdd',
    data() {
        return {
          categoryForm: {
            categoryId: '',
            categoryName: '',
            label: '',
            isShow: ''
          },
          categoryRules: {
            categoryName: [{required: true, trigger: 'blur', message: '分类名不能为空'}],
            label: [{required: true, trigger: 'blur', message: '分类描述不能为空'}]
          }
        };
    },
  created () {
  },
  methods: {
    handleAddCategory () {
      addCategory(this.categoryForm).then(reponse => {
        if (reponse.data.success) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.$refs['categoryForm'].resetFields()
        } else {
          this.$message.error(reponse.data.returnMsg);
        }
      }).catch(error => {
        this.$message(error)
      })
    },
    handleConnel(){
      this.$refs['categoryForm'].resetFields()
    }
  }
};
</script>
