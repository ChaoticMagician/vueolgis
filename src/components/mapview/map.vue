<template>
  <div class="map">
    <div tabindex="0" id="mapdiv" ref='mapdiv' ></div>
    <toggelmap
      v-if="basetoggel.iftoggelmap"
      :baselistdata ="basetoggel.baselistdata"
      @togglemap='togglemap'
      class="toggelmap">
    </toggelmap>
    <vectorLayerList
      v-if="vectortoggel.iftoggellayer"
      @togglevector ='togglevector'
      :treedata ='vectorinfos||$root.layersConfig.featuerLayers'
      :defaultopen ='vectoropens'
      class="layersmater">
    </vectorLayerList>
    <toolslist
    :view='view'
    :maplist='maplist'>
    </toolslist>
  </div>
</template>
<script>
import maplist from '@/maputil/maplist.js'
import toggelmap from '@/components/mapview/mapcpe/toggelmap'
import vectorLayerList from '@/components/mapview/mapcpe/vectorLayerList'
import toolslist from '@/components/mapview/mapcpe/toolslist'
export default {
  name: 'amap',
  components:{toggelmap,vectorLayerList,toolslist},
  data(){
    return{
      layerslist:[],
      maplist:{},
      intoview:{
        iextent:this.$route.query.view.extent||[117.60,38.62,118.19,39.24],
        center: this.$route.query.view.center||[117.395, 38.93],
        zoom: this.$route.query.view.zoom||14,
        minZoom: this.$route.query.view.minZoom||6,
        maxZoom: this.$route.query.view.maxZoom||18
      },
      baseinfos:this.$route.query.baseinfos||this.$root.layersConfig.baseLayers,
      baseopens:this.$route.query.baseopens||this.$root.layersConfig.baseMapList.difault.baseLayers,
      vectorinfos:this.$route.query.vectorinfos, 
      vectoropens:this.$route.query.vectoropens||[], 
      basetoggel:{
        iftoggelmap:this.$route.query.iftoggelmap||true,
        baselistdata:this.$route.query.baselistdata||this.$root.layersConfig.baseMapList
      },
      vectortoggel:{
        iftoggellayer:this.$route.query.iftoggellayer||true,
        vectorlistdata:this.$route.query.vectorlistdata||this.$root.layersConfig.featuerLayers
      },
    }
  },
  computed:{
    view:function(){
      if(this.maplist.map){
        return this.maplist.map.getView()
      }else{
        return null
      }
    }
  },
  mounted(){
    //整理树结构动态图层数据
    this.parsetree(this.$root.layersConfig.featuerLayers,'children')
    //创建地图
    this.maplist = new maplist({
      target:this.$refs.mapdiv,                         //地图的窗口元素
      view:this.intoview,                               //地图的显示比例和定位
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
    /***
     * 切换底图
     */
    togglemap:function(maplayers){
      this.maplist.togglemap(maplayers);
    },
    /***
     * 切换图层
     */
    togglevector:function(maplayers){
      this.maplist.togglevector(maplayers);
    },
  }
}
</script>
<style scoped>
#mapdiv,.map{
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}
.toggelmap{
  height: 9%;
  top: 82%;
  left: -1%;
  padding: 3px 1px 1px 3px ;
  display: inline-flex;
  position: relative;
  list-style: none;
  z-index: 2;
  float: right;
  background: #fff;
  border-radius: 5px;
  -moz-box-shadow:2px 2px 2px 0px #B3B3B3;
  -webkit-box-shadow:2px 2px 2px 0px #B3B3B3;
  box-shadow:2px 2px 2px 0px #B3B3B3;
}
.layersmater{
  right: 2%;
  top: 2%;
  padding: 5px;
  padding-bottom: 1px;
  position: absolute;
  z-index: 3;
  background: #ffffff;
  border-radius: 7px;
  -moz-box-shadow:2px 2px 2px 0px #B3B3B3;
  -webkit-box-shadow:2px 2px 2px 0px #B3B3B3;
  box-shadow:2px 2px 2px 0px #B3B3B3;
}
</style>