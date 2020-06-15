import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// import Layout from '@/layout'

const router = new Router({
  mode: 'history',  //去掉url中的#
  routes: [
    {
      path: "/login",
      component: () => import("@/views/login/index"),
      meta: { title: '登录' },
      hidden: true
    },
    {
      path: "/",
      component: () => import("@/views/netlearning/index"),
      hidden: true,
      meta: { title: '首页' }
    },
    {
      path: "/register",
      component: () => import("@/views/register/index"),
      hidden: true,
      meta: { title: '注册' }
    },
    {
      path: "/forget",
      component: () => import("@/views/forget/index"),
      hidden: true,
      meta: { title: '忘记密码' }
    },
    {
      path: "/course/detail",
      component: () => import("@/views/course/module/detail/index"),
      hidden: true,
      meta: { title: '课程详情' }
    },
    {
      path: "/course/search",
      component: () => import("@/views/search/index"),
      hidden: true,
      meta: { title: '搜索' }
    },
    {
      path: "/person/personal",
      component: () => import("@/views/person/module/personal/index"),
      hidden: true,
      meta: { title: '我的课程' }
    },
    {
      path: "/person/setting",
      component: () => import("@/views/person/module/setting/index"),
      hidden: true,
      meta: { title: '我的设置' }
    },
    {
      path: "/person/favorite",
      component: () => import("@/views/person/module/favorite/index"),
      hidden: true,
      meta: { title: '我的收藏' }
    },
    {
      path: "/person/password",
      component: () => import("@/views/person/module/password/index"),
      hidden: true,
      meta: { title: '修改密码' }
    },
    {
      path: "/teacher/detail",
      component: () => import("@/views/teacher/detail/index"),
      hidden: true,
      meta: { title: '教师详情' }
    },
    {
      path: "/video/play",
      component: () => import("@/views/video/index"),
      hidden: true,
      meta: { title: '视频播放' }
    },
    {
      path: "/404",
      component: () => import("@/views/404/index"),
      hidden: true,
      meta: { title: '404' }
    },
    {
      path: "/admin",
      name:"admin",
      component: resolve => require(['@/views/admin/index'], resolve),
      meta: { title: '后台管理' },
      children: [
        {
          path: 'user/list',
          component: resolve => require(['@/views/admin/module/user/index'], resolve),
          meta: { title: '学生列表' }
        },
        {
          path: 'role/list',
          component: resolve => require(['@/views/admin/module/role/index'], resolve),
          meta: { title: '角色列表' }
        },
        {
          path: 'role/add',
          component: resolve => require(['@/views/admin/module/role/add'], resolve),
          meta: { title: '添加角色' }
        },
        {
          path: 'course/list',
          component: resolve => require(['@/views/admin/module/course/index'], resolve),
          meta: { title: '课程列表' }
        },
        {
          path: 'course/add',
          component: resolve => require(['@/views/admin/module/course/add'], resolve),
          meta: { title: '添加课程' }
        },
        {
          path: 'course/upload',
          component: resolve => require(['@/views/admin/module/course/upload'], resolve),
          meta: { title: '上传课程图片' }
        },
        {
          path: 'course/add/teachplan',
          component: resolve => require(['@/views/admin/module/course/addTeachplan'], resolve),
          meta: { title: '添加教学计划' }
        },
        {
          path: 'course/detail',
          component: resolve => require(['@/views/admin/module/course/teacherCourseDetail'], resolve),
          meta: { title: '课程详情' }
        },
        {
          path: 'course/add/success',
          component: resolve => require(['@/views/admin/module/course/success'], resolve),
          meta: { title: '课程发布' }
        },
        {
          path: 'menu/list',
          component: resolve => require(['@/views/admin/module/menu/index'], resolve),
          meta: { title: '菜单列表' }
        },
        {
          path: 'menu/add',
          component: resolve => require(['@/views/admin/module/menu/add'], resolve),
          meta: { title: '添加菜单' }
        },
        {
          path: 'teacher/list',
          component: resolve => require(['@/views/admin/module/teacher/index'], resolve),
          meta: { title: '教师列表' }
        },
        {
          path: 'teacher/add',
          component: resolve => require(['@/views/admin/module/teacher/add'], resolve),
          meta: { title: '添加教师' }
        },
        {
          path: 'category/list',
          component: resolve => require(['@/views/admin/module/category/index'], resolve),
          meta: { title: '分类列表' }
        },
        {
          path: 'category/add',
          component: resolve => require(['@/views/admin/module/category/add'], resolve),
          meta: { title: '添加分类' }
        },
        {
          path: 'bashboard',
          component: resolve => require(['@/views/admin/module/bashboard/index'], resolve),
          meta: { title: '管理面板' }
        },
        {
          path: 'system/list',
          component: resolve => require(['@/views/admin/module/system/index'], resolve),
          meta: { title: '系统配置' }
        },
        {
          path: 'person/detail',
          component: resolve => require(['@/views/admin/module/detail/index'], resolve),
          meta: { title: '个人信息' }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 网络学习平台`;
  var userUrls = ["/login","/forget","/register","/","/course/search","/course/detail","/teacher/detail","/video/play"];
  let index = userUrls.indexOf(to.fullPath)
  localStorage.setItem("fullPath",to.meta.title)
  var userType = JSON.parse(localStorage.getItem("userType"))

  if(index >= 0){
    next()
  }else {
    var token  = localStorage.getItem("token");
    if (token == null || token == ''){
      localStorage.clear();
      window.location.href = '/login';
    }else {
      if(userType == '1'){//学生
        if (to.fullPath.indexOf("/admin") !== -1){
          window.location.href = '/404';
        }
      }
      if (to.fullPath == "/admin"){
        window.location.href = '/admin/bashboard';
      }
      next();
    }
  }

});
export default router
