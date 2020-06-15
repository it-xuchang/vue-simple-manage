<template>
  <div >
    <div class="teacher-header">
      <div class="teacher-header-left">
        <img :src="course.courseImageUrl" width="200px" height="200px">
      </div>
      <div class="teacher-header-right">
        <div  class="teacher-header-content">
          <div class="teacher-detail-title">
            {{course.courseName}}
          </div>

          <div class="teacher-detail-content">
            <strong>课程等级：</strong>{{course.grade}}
            <el-divider direction="vertical"></el-divider>
            <strong>课程状态：</strong>{{course.status == '0' ? "已发布":""}}{{course.status == '1' || course.status == '2'? "未发布":""}}{{course.status == '3' ? "已下线":""}}
            <el-divider direction="vertical"></el-divider>
            <strong>学习模式：</strong>{{course.studymodel}}
            <el-divider direction="vertical"></el-divider>
            <strong>适用群体：</strong>{{course.users}}
            <el-divider direction="vertical"></el-divider>
            <strong>教学模式：</strong>{{course.teachmode}}
          </div>

          <h3>描述：</h3>
          <div class="teacher-detail-desc">
            {{course.description}}
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 50px 0 20px 0;width: 100%">
      <el-card shadow="hover">
        <el-button size="small" @click="handleEditCourseDialogVisible()" type="primary" icon="el-icon-edit">编辑课程</el-button>
        <el-button size="small" @click="handleDeleteCourse()" type="danger" icon="el-icon-delete">删除课程</el-button>
        <el-button size="small" @click="handleAddTeachplan()">添加教学计划</el-button>
        <el-button size="small" @click="handleOpenAddQuesDialog()">添加常见问题</el-button>
        <el-button size="small" @click="handleAddCourseQuziDialog()">添加课程问答</el-button>
        <el-button size="small" @click="handlePubishCourse()">发布课程</el-button>
        <el-button size="small" @click="handleUpload()">上传课程图片</el-button>
      </el-card>
    </div>
<!--    编辑课程-->
    <el-dialog title="编辑课程" :visible.sync="editCourseDialogVisible">
      <el-form :model="courseForm" :rules="courseRules" ref="courseForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="课程名称：" prop="courseName">
          <el-input v-model="courseForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="适用群体：" prop="users">
          <el-input v-model="courseForm.users"></el-input>
        </el-form-item>
        <el-form-item label="课程分类" prop="category">
          <el-select v-model="courseForm.category" placeholder="请选择课程分类">
            <el-option v-for="item in categoryItem" :key="item" :label="item.categoryName" :value="item.categoryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程等级：" prop="grade">
          <el-input v-model="courseForm.grade"></el-input>
        </el-form-item>
        <el-form-item label="学习模式：" prop="studymodel">
          <el-input v-model="courseForm.studymodel"></el-input>
        </el-form-item>
        <el-form-item label="教学模式：" prop="teachmode">
          <el-input v-model="courseForm.teachmode"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" prop="description">
          <el-input type="textarea" rows="8" v-model="courseForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCourseDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditCourse()">确 定</el-button>
      </div>
    </el-dialog>

    <!--    常见问题-->
    <el-dialog title="添加常见问题" :visible.sync="addQuestionDialogVisible">
      <el-form :model="questionForm" :rules="questionRules" ref="questionForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题：" prop="frequentlyAskedQuestionTitle">
          <el-input v-model="questionForm.frequentlyAskedQuestionTitle"></el-input>
        </el-form-item>
        <el-form-item label="问题描述" prop="frequentlyAskedQuestionContent">
          <el-input type="textarea" rows="5" v-model="questionForm.frequentlyAskedQuestionContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addQuestionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddFreQuestion()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑常见问题" :visible.sync="editQuestionDialogVisible">
      <el-form :model="questionForm" :rules="questionRules" ref="questionForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题：" prop="frequentlyAskedQuestionTitle">
          <el-input v-model="questionForm.frequentlyAskedQuestionTitle"></el-input>
        </el-form-item>
        <el-form-item label="问题描述" prop="frequentlyAskedQuestionContent">
          <el-input type="textarea" rows="5" v-model="questionForm.frequentlyAskedQuestionContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editQuestionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditFreQuestion()">确 定</el-button>
      </div>
    </el-dialog>
    <!--    课堂问答-->
    <el-dialog title="添加课堂问答" :visible.sync="addCourseQuziDialogVisible">
      <el-form :model="courseQuziForm" :rules="courseQuziRules" ref="courseQuziForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题：" prop="courseQuziTitle">
          <el-input v-model="courseQuziForm.courseQuziTitle"></el-input>
        </el-form-item>
        <el-form-item label="是否顶置" >
          <el-select v-model="courseQuziForm.isOverHead" placeholder="请选择">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示" >
          <el-select v-model="courseQuziForm.isShow" placeholder="请选择">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题描述" prop="courseQuziContent">
          <el-input type="textarea" rows="5" v-model="courseQuziForm.courseQuziContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCourseQuziDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddCourseQuzi()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑课堂问答" :visible.sync="editCourseQuziDialogVisible">
      <el-form :model="courseQuziForm" :rules="courseQuziRules" ref="courseQuziForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题：" prop="courseQuziTitle">
          <el-input v-model="courseQuziForm.courseQuziTitle"></el-input>
        </el-form-item>
        <el-form-item label="是否顶置" >
          <el-select v-model="courseQuziForm.isOverHead" placeholder="请选择">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示" >
          <el-select v-model="courseQuziForm.isShow" placeholder="请选择">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题描述" prop="courseQuziContent">
          <el-input type="textarea" rows="5" v-model="courseQuziForm.courseQuziContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCourseQuziDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditCourseQuzi()">确 定</el-button>
      </div>
    </el-dialog>

    <!--    上传-->
    <el-dialog title="上传" :visible.sync="uploadDialogVisible" width="40%">
      <el-upload
        class="upload-demo"
        drag
        name="file"
        ref="courseUpload"
        :data="uploadParam"
        :auto-upload="false"
        :on-success="handleImageSuccess"
        action="http://localhost:40001/file/record/upload"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <div class="teacher-content">
      <h3>教学计划</h3>
      <el-table
        :data="teachplanItem"
        style="width: 100%;margin: 20px 0;"
        row-key="teachplanId"
        :tree-props="{children: 'subTeachPlanResult'}">
        <el-table-column
          prop="teachplanName"
          label="教学计划名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="timeLength"
          label="时长"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="500">
        </el-table-column>
        <el-table-column label="操作栏"  align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button type="primary" @click="handEditTeachplanDialog(scope.row)" icon="el-icon-edit" circle></el-button>
              <el-button type="primary" @click="handEditTeachplanDialog(scope.row)" icon="el-icon-upload" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handDeleteTeachplan(scope.row)" circle></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <!--    编辑教学计划-->
      <el-dialog title="编辑教学计划" :visible.sync="editTeachplanDialogVisible" width="40%">
        <el-form :model="teachplanForm" :rules="teachplanRules" ref="teachplanForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="教学计划名称：" prop="teachplanName">
            <el-input v-model="teachplanForm.teachplanName"></el-input>
          </el-form-item>
          <el-form-item label="教学时长：" prop="timeLength">
            <el-input v-model="teachplanForm.timeLength"></el-input>
          </el-form-item>
          <el-form-item label="教学计划级别" prop="category">
            <el-select v-model="teachplanForm.parentId" placeholder="请选择教学计划级别">
              <el-option  label="一级目录" value=""></el-option>
              <el-option v-for="item in teachplanItem" :key="item" :label="item.teachplanName" :value="item.teachplanId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="教学计划描述" prop="description">
            <el-input type="textarea" rows="5" v-model="teachplanForm.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editTeachplanDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditTeachplan()">确 定</el-button>
        </div>
      </el-dialog>


      <h3>常见问题</h3>
      <el-table
        :data="frequentlyAskedQuestionItem"
        style="width: 100%;margin: 20px 0;"
        row-key="frequentlyAskedQuestionId">
        <el-table-column
          prop="frequentlyAskedQuestionTitle"
          label="标题"
          width="400">
        </el-table-column>
        <el-table-column
          prop="frequentlyAskedQuestionContent"
          label="内容"
          width="400">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          sortable
          width="150">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="修改时间"
          width="150">
        </el-table-column>
        <el-table-column label="操作栏"  align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button type="primary" @click="handleEditFrequentlyAskedQuestion(scope.row)" icon="el-icon-edit" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDeleteFrequentlyAskedQuestion(scope.row)" circle></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <h3>课堂问答</h3>
      <el-table
        :data="courseQuziItem"
        style="width: 100%;margin: 20px 0;"
        row-key="courseQuziId">
        <el-table-column
          prop="courseQuziTitle"
          label="标题"
          width="300">
        </el-table-column>
        <el-table-column
          prop="isOverHead"
          label="是否顶置"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="isShow"
          label="是否显示"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="courseQuziContent"
          label="内容"
          width="500">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          sortable
          width="150">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="修改时间"
          width="150">
        </el-table-column>
        <el-table-column label="操作栏"  align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button type="primary" @click="handleEditCourseQuziDialog(scope.row)" icon="el-icon-edit" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDeleteCourseQuzi(scope.row)" circle></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {queryCourseCategory, queryTeachplan, editCourse, changeStatus,editTeachplan,deleteTeachplan} from '../../../../api/courseAdd'
  import {queryCourseDetail} from '@/api/courselist'
  import {queryFrequentlyAskedQuestion,addFrequentlyAskedQuestion,editFrequentlyAskedQuestion,deleteFrequentlyAskedQuestion} from '../../../../api/courselist'
  import {queryCourseQuzi,addCourseQuzi,editCourseQuzi,deleteCourseQuzi} from '@/api/courselist'
  import {deleteCourse} from '@/api/courselist'
  import {deleteCategory} from '../../../../api/categorylist'
  export default {
    name: 'teacherCourseDetail',
    data(){
      return {
        activeName: 'first',
        course:{},
        teachplanItem:[],
        frequentlyAskedQuestionItem:[],
        courseQuziItem:[],
        editCourseDialogVisible: false,
        courseForm: {
          teacherId: JSON.parse(localStorage.getItem("userId")),
          courseName: '',
          courseId: '',
          users: '',
          category: '',
          grade: '',
          studymodel: '',
          teachmode: '',
          description: '',
        },
        courseRules: {
          courseName: [
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ],
          users: [
            { required: true, message: '请输入用户群体', trigger: 'blur' }
          ],
          studymodel: [
            {  required: true, message: '请输入学习模式', trigger: 'blur' }
          ],
          teachmode: [
            {  required: true, message: '请输入教学模式', trigger: 'blur' }
          ],
          description: [
            {  required: true, message: '请输入描述', trigger: 'blur' }
          ]
        },
        categoryItem:[],
        addQuestionDialogVisible: false,
        editQuestionDialogVisible: false,
        questionForm: {
          frequentlyAskedQuestionId:'',
          frequentlyAskedQuestionTitle:'',
          frequentlyAskedQuestionContent: '',
          courseId: ''
        },
        questionRules: {
          frequentlyAskedQuestionTitle: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          frequentlyAskedQuestionContent: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
        },
        addCourseQuziDialogVisible: false,
        editCourseQuziDialogVisible: false,
        courseQuziForm: {
          courseQuziId:'',
          courseQuziTitle:'',
          courseQuziContent: '',
          isOverHead: '',
          courseId: this.$route.query.courseId,
          courseQuziType: '',
          isShow: ''
        },
        courseQuziRules: {
          courseQuziTitle: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          courseQuziContent: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
        },
        uploadDialogVisible: false,
        editTeachplanDialogVisible: false,
        uploadParam:{
          userId: JSON.parse(localStorage.getItem("userId")),
          fromSystemId: this.$route.query.courseId,
          fileType:'0'
        },
        teachplanForm: {
          teacherId: JSON.parse(localStorage.getItem("userId")),
          teachplanId: '',
          teachplanName: '',
          courseId: this.$route.query.courseId,
          parentId: '',
          timeLength: '',
          description: '',
        },
        teachplanRules: {
          teachplanName: [
            { required: true, message: '请输入教学计划名称', trigger: 'blur' }
          ],
          timeLength: [
            { required: true, message: '请输入教学时长', trigger: 'blur' }
          ],
          description: [
            {  required: true, message: '请输入描述', trigger: 'blur' }
          ]
        },
      }
    },
    created () {
      this.handQueryCourse();
      this.handleQueryTeachplan();
      this.handleQueryCourseQuzi();
      this.handleQueryFrequentlyAskedQuestion();
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handQueryCourse(){
        let param = {
          courseId:''
        }
        param.courseId = this.$route.query.courseId
        queryCourseDetail(param).then(response => {
          this.course = response.data.data[0]
        }).catch(error => {
          this.$message(error)
        })
      },
      handleQueryTeachplan(){
        var param = {
          courseId:''
        }
        param.courseId = this.$route.query.courseId
        queryTeachplan(param).then(response => {
          this.teachplanItem = response.data.data[0].teachPlans

        }).catch(error => {
          this.$message(error)
        })
      },
      handleQueryFrequentlyAskedQuestion(){
        let param = {
          pageNum:'1',
          pageSize:'100',
          courseId:''
        }
        param.courseId = this.$route.query.courseId
        queryFrequentlyAskedQuestion(param).then(response => {
          this.frequentlyAskedQuestionItem = response.data.data.datas
        }).catch(error => {
          this.$message(error)
        })
      },
      handleQueryCourseQuzi(){
        let param = {
          pageNum:'1',
          pageSize:'100',
          courseId:''
        }
        param.courseId = this.$route.query.courseId
        queryCourseQuzi(param).then(response => {
          this.courseQuziItem = response.data.data.datas
        }).catch(error => {
          this.$message(error)
        })
      },
      handleEditCourseDialogVisible(){
        this.handleQueryCourseCategory()
        this.courseForm.courseName = this.course.courseName
        this.courseForm.courseId = this.course.courseId
        this.courseForm.users = this.course.users
        this.courseForm.description = this.course.description
        this.courseForm.grade = this.course.grade
        this.courseForm.category = this.course.category
        this.courseForm.teachmode = this.course.teachmode
        this.courseForm.studymodel = this.course.studymodel
        this.editCourseDialogVisible = true
      },
      handleEditCourse(){
        editCourse(this.courseForm).then(response => {
          if (response.data.success) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.handQueryCourse();
            this.editCourseDialogVisible = false
          } else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })
      },
      handleQueryCourseCategory(){
        queryCourseCategory().then(response => {
          this.categoryItem = response.data.data;
        }).catch(error => {
          this.$message(error)
        })
      },
      handleDeleteCourse(){
        this.$confirm('删除课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            courseId:''
          }
          param.courseId = this.$route.query.courseId
          deleteCourse(param).then(response => {
            if (response.data.success){
              this.$router.push({
                path:'/admin/course/list'
              })
            }else {
              this.$message.error(response.data.returnMsg);
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
      handleAddTeachplan(){
        this.$router.push({
          path:'/admin/course/add/teachplan',
          query:{
            courseId: this.$route.query.courseId
          }
        })
      },
      handleOpenAddQuesDialog(){
        this.addQuestionDialogVisible = true
        this.questionForm.courseId = this.$route.query.courseId
        this.questionForm.frequentlyAskedQuestionId = ''
        this.questionForm.frequentlyAskedQuestionTitle = ''
        this.questionForm.frequentlyAskedQuestionContent = ''
      },
      handleAddFreQuestion(){
        addFrequentlyAskedQuestion(this.questionForm).then(response => {
          if (response.data.success){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.addQuestionDialogVisible = false
            this.handleQueryFrequentlyAskedQuestion();
          }else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })
      },
      handleEditFreQuestion(){
        editFrequentlyAskedQuestion(this.questionForm).then(response => {
          if (response.data.success){
            this.$message({
              message: '编辑成功',
              type: 'success'
            });
            this.editQuestionDialogVisible = false
            this.handleQueryFrequentlyAskedQuestion();
          }else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })
      },
      handleAddCourseQuziDialog(){
        this.addCourseQuziDialogVisible = true
        this.courseQuziForm.isShow = ''
        this.courseQuziForm.isOverHead = ''
        this.courseQuziForm.courseQuziId = ''
        this.courseQuziForm.courseQuziTitle = ''
        this.courseQuziForm.courseQuziContent = ''
      },
      handleAddCourseQuzi(){
        addCourseQuzi(this.courseQuziForm).then(response => {
          if (response.data.success){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.addCourseQuziDialogVisible = false
            this.handleQueryCourseQuzi();
          }else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })
      },
      handleUpload(){
        this.uploadDialogVisible = true;
      },
      handlePubishCourse(){
        this.$confirm('发布课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            courseId: this.$route.query.courseId,
            status:'0'
          }
          changeStatus(param).then(response => {
            if (response.data.success){
              this.$message({
                message: '发布成功',
                type: 'success'
              });
              this.handQueryCourse();
            }else {
              this.$message.error(response.data.returnMsg);
            }
          }).catch(error => {
            this.$message(error)
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          });
        });


      },
      handleConnel(){
        this.$refs['courseForm'].resetFields()
      },
      handleImageSuccess(res, file) {
        console.log(res)
        console.log(file)

      },
      handEditTeachplanDialog(row){
        this.editTeachplanDialogVisible = true
        this.teachplanForm.teachplanId = row.teachplanId
        this.teachplanForm.teachplanName = row.teachplanName
        this.teachplanForm.timeLength = row.timeLength
        this.teachplanForm.parentId = row.parentId
        this.teachplanForm.description = row.description
      },
      handleEditTeachplan(){
        editTeachplan(this.teachplanForm).then(response => {
          if (response.data.success){
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.handleQueryTeachplan()
            this.editTeachplanDialogVisible = false
          }else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })

      },
      handDeleteTeachplan(row){
        this.$confirm('删除课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            teachplanIds: [],
          }
          param.teachplanIds.push(row.teachplanId)
          deleteTeachplan(param).then(response => {
            if (response.data.success){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.handleQueryTeachplan()
            }else {
              this.$message.error(response.data.returnMsg);
            }
          }).catch(error => {
            this.$message(error)
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      handleEditFrequentlyAskedQuestion(row){
        this.editQuestionDialogVisible = true;
        this.questionForm.courseId = this.$route.query.courseId
        if (row != null){
          this.questionForm.frequentlyAskedQuestionId = row.frequentlyAskedQuestionId
          this.questionForm.frequentlyAskedQuestionTitle = row.frequentlyAskedQuestionTitle
          this.questionForm.frequentlyAskedQuestionContent = row.frequentlyAskedQuestionContent
        }
      },
      handleDeleteFrequentlyAskedQuestion(row){
        this.$confirm('删除常见问题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            frequentlyAskedQuestionId: '',
          }
          param.frequentlyAskedQuestionId = row.frequentlyAskedQuestionId
          deleteFrequentlyAskedQuestion(param).then(response => {
            if (response.data.success){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.handleQueryFrequentlyAskedQuestion();
            }else {
              this.$message.error(response.data.returnMsg);
            }
          }).catch(error => {
            this.$message(error)
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleEditCourseQuziDialog(row){
        this.editCourseQuziDialogVisible = true
        this.courseQuziForm.isShow = row.isShow
        this.courseQuziForm.isOverHead = row.isOverHead
        this.courseQuziForm.courseQuziId = row.courseQuziId
        this.courseQuziForm.courseQuziTitle = row.courseQuziTitle
        this.courseQuziForm.courseQuziContent = row.courseQuziContent
      },
      handleEditCourseQuzi(){
        editCourseQuzi(this.courseQuziForm).then(response => {
          if (response.data.success){
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.handleQueryCourseQuzi();
            this.editCourseQuziDialogVisible = false
          }else {
            this.$message.error(response.data.returnMsg);
          }
        }).catch(error => {
          this.$message(error)
        })

      },
      handleDeleteCourseQuzi(row){
        this.$confirm('删除课堂问答, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            courseQuziId: '',
          }
          param.courseQuziId = row.courseQuziId
          deleteCourseQuzi(param).then(response => {
            if (response.data.success){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.handleQueryCourseQuzi();
            }else {
              this.$message.error(response.data.returnMsg);
            }
          }).catch(error => {
            this.$message(error)
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>
  /*头部*/
  .teacher-header{
    width: 100%;
    max-width: 1497.6px;
    height: 200px;
    margin: 20px 0;
  }
  .teacher-header-left{
    width: 20%;
    height: 200px;
    float: left;
  }
  .teacher-header-right{
    width: 78%;
    height: 200px;
    float: left;
  }
  .teacher-header-content{
    float: left;
    text-align: left;
  }
  .teacher-detail-title{
    font-size: 30px;
  }
  .teacher-detail-content{
    font-size: 18px;
    margin: 10px 0;
  }
  .teacher-detail-desc{
    padding-right: 200px;
    /*background-color: #00a4ff;*/
    /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
    height: 60px;
    font-size: 15px;
  }
  .teacher-content{
    text-align: left;
  }

</style>
