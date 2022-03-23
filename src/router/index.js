import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'

import administor from '@/views/administor/administor'
import shebei from '@/views/administor/vue/shebei'
import user from '@/views/administor/vue/user'
import kecheng from '@/views/administor/vue/kecheng'
import qiandao from '@/views/administor/vue/qiandao'
import apersion from '@/views/administor/vue/apersion'
import department from '@/views/administor/vue/department'
import location from '@/views/administor/vue/location'
import courseplan from '@/views/administor/vue/courseplan'

import teacher from '@/views/teacher/teacher'
import courseplant from '@/views/teacher/vue/courseplant'
import kechengt from '@/views/teacher/vue/kechengt'
import qiandaot from '@/views/teacher/vue/qiandaot'
import tperson from '@/views/teacher/vue/tperson'

import student from '@/views/student/student'
import courseplanst from '@/views/student/vue/courseplanst'
import kechengst from '@/views/student/vue/kechengst'
import qiandaost from '@/views/student/vue/qiandaost'
import stperson from '@/views/student/vue/stperson'
Vue.use(Router)

export default new Router({
  routes: [
  //登录路由
    {
      path: '/index',
      name: 'index',
      component: index,
    },
  //管理员路由
    {
      path:'/administor',
      name:'管理员',
      component:administor,
      children:[
        {
          path:'/shebei',
          name:'设备管理',
          component:shebei,
        },
        {
          path:'/department',
          name:'部门管理',
          component:department,
        },
        {
          path:'/location',
          name:'位置管理',
          component:location,
        },
        {
          path:'/user',
          name:'用户管理',
          component:user,
        },
        {
          path:'/courseplan',
          name:'课程安排',
          component:courseplan,
        },
        {
          path:'/kecheng',
          name:'课程管理',
          component:kecheng,
        },
        {
          path:'/qiandao',
          name:'签到管理',
          component:qiandao,
        },
        {
          path:'/apersion',
          name:'管理员个人中心',
          component:apersion,
        },
        {
          path: '',
          redirect: '/shebei',
        }
      ]
    },
   ,    //老师路由
   {
     path:'/teacher',
     name:'老师',
     component:teacher,
     children:[
       {
         path:'/kechengt',
         name:'教师课程管理',
         component:kechengt,
       },
       {
         path:'/courseplant',
         name:'教师课程安排',
         component:courseplant,
       },
       {
         path:'/qiandaot',
         name:'课程签到详情',
         component:qiandaot,
       },
       {
         path:'/tpersion',
         name:'教师个人中心',
         component:tperson,
       },
       {
         path: '',
         redirect: '/kechengt',
       },
   {
    path: '*',
    redirect: '/index',// /index
  }
 ]
  },
    //学生路由
    {
      path:'/student',
      name:'学生',
      component:student,
      children:[
        {
          path:'/kechengst',
          name:'学生课程管理',
          component:kechengst,
        },
        {
          path:'/courseplanst',
          name:'学生课程安排',
          component:courseplanst,
        },
        {
          path:'/qiandaost',
          name:'学生签到详情',
          component:qiandaost,
        },
        {
          path:'/stpersion',
          name:'学生个人中心',
          component:stperson,
        },
        {
          path: '',
          redirect: '/kechengst',
        }]},
      {
        path: '*',
        redirect: '/index',// /index
      }
   ]})
// 设置完token后取消备注
// router.beforeEach((to,from,next)=>{
//   let token =localStorage.getItem('token')
//   if(token || to.path==='/index')
//   {
//       next()
//   }else{
//       next('/index')
//   }
// }
// )
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
