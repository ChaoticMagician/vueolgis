<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import * as layersConfig from '../static/mapconfig/layersConfig';
export default {
  name: 'App',
  created(){
    //创建的时候将图层配置打入全局变量
    this.$root.layersConfig = layersConfig
  }
}
</script>

<style>
#app{
  height: 100%;
  width: 100%;
}
/* .ol-zoom{
  display: none;
} */
</style>
