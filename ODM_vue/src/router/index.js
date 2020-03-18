import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/index.vue'
import Insert from '@/pages/insert'
import Login from '@/pages/login/Login.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
      path:'/index',
      name:'index',
      component:Index,
      meta: { title: '首页' }
    },
    {
      path:'/insert',
      name:'insert',
      component:Insert,
      meta: { title: '填写信息' }
    },
    {
      path:'/login',
      name:'login',
      component: Login,
      meta: { title: '登录' }
     },
     {
      path:'/check',
      name:'check',
      component: ()=>import ('@/pages/check'),
      meta: { title: '审核' }
     },
     {
      path:'/allSubmit',
      name:'allSubmit',
      component: ()=>import ('@/pages/allSubmit'),
      meta: { title: '已提交表单' },
     },
     {
      path:'/look',
      name:'look',
      component: ()=>import ('@/pages/look'),
      meta: { title: '查看' }
    },
    {
      path:'/edit',
      name:'edit',
      component: ()=>import ('@/pages/edit'),
      meta: { title: '修改' }
    },
    {
        path: '*',
        component: () => import ('@/pages/notFound/404.vue'),
        meta: { title: '404' }
    }
  ]
})
