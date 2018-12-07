<template>
  <div class="map">
    <div tabindex="0" id="mapdiv" ref='mapdiv' ></div>
  </div>
</template>
<script>
import maplist from '@/maputil/maplist.js'
export default {
  name: 'amap',
  data(){
    return{
      layerslist:[],
      view:{
        projection: "EPSG:4326",
        center: this.$route.query.view.center||[117.395, 38.93],
        zoom: this.$route.query.view.zoom||14,
        minZoom: this.$route.query.view.minZoom||6,
        maxZoom: this.$route.query.view.maxZoom||17
      },
      baseinfos:this.$route.query.baseinfos||this.$root.layersConfig.baseLayers,
      baseopens:this.$route.query.baseopens||this.$root.layersConfig.baseMapList.difault.baseLayers,
      vectorinfos:this.$route.query.vectorinfos, 
      vectoropens:this.$route.query.vectoropens||[], 
    }
  },
  mounted(){
    //整理树结构动态图层数据
    this.parsetree(this.$root.layersConfig.featuerLayers,'children')
    //创建地图
    this.maplist = new maplist({
      target:this.$refs.mapdiv,                         //地图的窗口元素
      view:this.view,                                   //地图的显示比例和定位
      baseinfos:this.baseinfos,                         //地图的底图库
      baseopens:this.baseopens,                         //需要显示的底图id集合
      vectorinfos:this.vectorinfos||this.layerslist,    //地图的动态图库
      vectoropens:this.vectoropens,                     //地图的动态图id集合
    });
    this.$root.maplist = this.maplist;
  },
  methods:{
    /***
     * 解析图层树结构，将树结构变为一维数组
     */
    parsetree:function (obj,childrenKey){
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key];
          if(element[childrenKey]){
            this.parsetree(element[childrenKey],childrenKey)
          }else{
            this.layerslist.push(element)
          }
        }
      }
    },
  }
}
</script>
<style scoped>
#mapdiv,.map{
  height: 100%;
  width: 100%;
}
</style>