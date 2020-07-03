import Vue from 'vue'
import Router from 'vue-router'
import WsTest from '@/components/WsTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WsTest',
      component: WsTest
    },
    {
      path: '/ws',
      name: 'WsTest',
      component: WsTest
    }
  ]
})
