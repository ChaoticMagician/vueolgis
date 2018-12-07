import Vue from 'vue'
import Router from 'vue-router'
import maphome from '@/components/maphome'
import mapview from '@/components/mapview'
import amap from '@/components/mapview/map'
import testbutten from '@/components/mapview/testbutten'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      redirect: { name: 'allhome' }
    },
    {
      path: '/allhome',
      name: 'allhome',
      component: maphome
    },
    {
      path: '/demo',
      name: 'demo',
      component: null,
      children:[
        {
          path: '/demo/map',
          name: 'demomap',
          component: null
        }
      ]
    },
    {
      path: '/mapview',
      name: 'mapview',
      component: mapview,
      children:[
        {
          path: '/mapview/map',
          name: 'map',
          component: amap
        },
        {
          path: '/mapview/butten',
          name: 'testbutten',
          component: testbutten
        }
      ]
    },
    {
      path: '/api',
      name: 'api',
      component: null
    },
  ]
})
