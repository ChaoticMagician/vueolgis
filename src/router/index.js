import Vue from 'vue'
import Router from 'vue-router'
import maphome from '@/components/maphome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'maphome',
      component: maphome
    }
  ]
})
