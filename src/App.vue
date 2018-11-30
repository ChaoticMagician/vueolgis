<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  height: 100%;
  width: 100%;
}
.ol-overlaycontainer-stopevent{
  /*隐藏地图左上角的+-号*/
  display: none;
}
</style>
