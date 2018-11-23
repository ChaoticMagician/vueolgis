<template>
  <div class="maphome">
    <div class="mapview" id="mapdiv" ></div>
    <div class="toolsbox" >
      按钮
    </div>
  </div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
export default {
  name: 'HelloWorld',
  data () {
    return {
      map:{}
    }
  },
  mounted(){
    this.initTDT('mapdiv',[117.16, 38.75]);

  },
  methods:{
    initTDT:function(id,centerpint){
      this.map = new Map({
        target: id,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
            }),
            name: "天地图电子地图",
            type: "BaseMap"
          }),
          new TileLayer({
            source: new XYZ({
              url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}'
            }),
            visible:false,
            isGroup: true,
            name: "天地图影像地图",
            type: "BaseMap"
          }),  
          new TileLayer({
            source: new XYZ({
              url: "http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}"
            }),
            isGroup: true,
            name: "天地图文字标注"
          })       
        ],
        view: new View({
          projection: "EPSG:4326",
          center: [117.395, 38.93],
          zoom: 14,
          minZoom:6,
          maxZoom:16
        })
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.maphome,.mapview{
  height: 100%;
  width: 100%;
}
.mapview{
  position: absolute;
  top: 0;
  left: 0;
}
.toolsbox{
  position: absolute;
  top: 50%;
  left: 0;
  padding: 3px;
  background: #646464;
  color: aliceblue;
}
</style>
