<template>
    <div style="width:600px">
        <div class="container">
            <div class="form-box">
                <el-form ref="teacherForm"
                         :model="teacherForm"
                         status-icon
                         :rules="teacherRules" label-width="100px">
                  <el-form-item label="教师名称：" prop="teacherName">
                    <el-input v-model="teacherForm.teacherName" auto-complete="off" placeholder="请输入教师名"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱：" prop="email">
                    <el-input v-model="teacherForm.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号：" prop="mobile">
                    <el-input v-model="teacherForm.mobile" auto-complete="off" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                  <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="teacherForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-form-item label="性别：" >
                      <el-select  v-model="teacherForm.sex" placeholder="请选择性别">
                          <el-option  label="女" value="0"></el-option>
                          <el-option  label="男" value="1"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item   label="角色：" >
                    <el-select v-model="teacherForm.roleId"  placeholder="请选择角色">
                      <el-option  v-for="item in roleItem" :key="item" :label="item.roleName" :value="item.roleId"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="教师描述" prop="description">
                      <el-input type="textarea" v-model="teacherForm.description" rows="5" ></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="handleAddTeacher()">添加</el-button>
                      <el-button type="info" @click="handleConnel()">取消</el-button>
                  </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
  import {addTeacher} from '@/api/teacherAdd'
  import {queryRole} from '@/api/teacherAdd'
export default {
    name: 'teacherAdd',
    data() {
        return {
          teacherForm: {
            teacherName: "",
            email: "",
            mobile: "",
            sex: "",
            password: "",
            description: "",
            roleId: "",
          },
          teacherRules: {
            teacherName: [{required: true, trigger: 'blur', message: '教师名不能为空'}],
            email: [{required: true, trigger: 'blur', message: '邮箱不能为空'}],
            mobile: [{required: true, trigger: 'blur', message: '手机号不能为空'}],
            password: [{required: true, trigger: 'blur', message: '密码不能为空'}],
            description: [{required: true, trigger: 'blur', message: '描述不能为空'}],
          },
          roleItem:[]
        };
    },
  created () {
      this.handleQueryRole();
  },
  methods: {
      handleAddTeacher() {
        addTeacher(this.teacherForm).then(reponse => {
          if (reponse.data.success){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$refs['teacherForm'].resetFields()
          }else {
            this.$message.error(reponse.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })

      },
      handleQueryRole(){
        queryRole().then(response => {
          this.roleItem = response.data.data
        }).catch(error => {
          this.$message(error)
        })
      },
    handleConnel(){
      this.$refs['teacherForm'].resetFields()
    }
    }
};
</script>
