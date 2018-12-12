<template>
  <div class="maphome">
    <div id="map"></div>
    <MapSwitch id="mapswitch"></MapSwitch>
  </div>
</template>

<script>
import MapSwitch from "@/components/MapSwitch";
export default {
  name:'maphome',
  components:{
    MapSwitch
  },
  data () {
    return {
      map:{},
      popdata:[],
    }
  },
  mounted(){
    this.map = this.$sharkolapi.initGD('map',[117.16, 38.75]);
  }
}
</script>
<style scoped> 
.maphome #map{
  height:100%;
  width:100%;
}
.el-main{
  padding: 0;
}
#mapswitch{
  position:absolute;
  top: 70px;;
  right:10px;
  z-index: 10;
}
</style>
