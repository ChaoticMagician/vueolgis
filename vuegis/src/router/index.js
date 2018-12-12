import Vue from 'vue'
import Router from 'vue-router'
import Default from '@/components/Default'
import maphome from '@/components/maphome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Default',
      component: Default
    },
    {
      path: '/maphome',
      name: 'maphome',
      component: maphome
    }
  ]
})
