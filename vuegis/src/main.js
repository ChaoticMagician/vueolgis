// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import layer from 'vue-layer';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import sharkolapi from '@/sharkutil/sharkolapi'

Vue.prototype.$layer = layer(Vue);
Vue.prototype.$sharkolapi = sharkolapi;
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  //地图对象
  data(){
    return{
      map:{},
      popdata:[]
    }
  }
})
