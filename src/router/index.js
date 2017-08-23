import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Reader from '@/components/reader'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/reader/:id',
      name:'reader',
      components:Reader
    },
    {
      path:'/boolDetail/:id',
      name:'bookDetail',
      commpoents:resolve =>require(['@/components/bookDetail'],resolve)
    },
    {
      path:'/category',
      name:'category',
      components:resolve =>require(['@/components/category'],resolve)

    }
  ]
})
