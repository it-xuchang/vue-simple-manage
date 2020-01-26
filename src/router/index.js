import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

export default constantRoutes


// export default new Router({
//   routes: [
//     {
//       path: '/login',
//       component: () => import('@/views/login/index'),
//       hidden: true,
//       beforeEnter(to,from,next){
//         var menu  = localStorage.getItem("menu");
//
//     //   if () {
//     //   next({ name: 'xx' })
//     // } else<span> {
//     //   // Redirect to login instead
//     //   next({ name: 'login' })
//     // },
//     }
//   ]
// })
