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
    <div
    class="maptools"
    v-if="toolsarr[0]"
    >
      <el-tooltip
        class="item"
        effect="dark"
        v-for="trem in thistoolsarr"
        :key="trem.id"
        :content="trem.name"
        :open-delay='500'
        v-if="toolsarr.includes(trem.id)"
        placement="right">
        <el-button
          :class="toolsstate[trem.id]==0?'maptools-list-button':'maptools-list-button-is'"
          size="mini"
          :icon="trem.icons[toolsstate[trem.id]]">
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import maplist from '@/maputil/maplist.js'
import toggelmap from '@/components/mapview/mapcpe/toggelmap'
import vectorLayerList from '@/components/mapview/mapcpe/vectorLayerList'
export default {
  name: 'amap',
  components:{toggelmap,vectorLayerList},
  data(){
    return{
      layerslist:[],
      maplist:{},
      thistoolsarr:[
        {
          id:'bigger',
          name:'地图放大',
          icons:['el-icon-plus']
        },
        {
          id:'litter',
          name:'地图缩小',
          icons:['el-icon-minus'],
        },
        {
          id:'allmap',
          name:'还原定位',
          icons:['el-icon-location'],
        },
        {
          id:'getinfo',
          name:'属性拾取',
          icons:['el-icon-info','el-icon-view'],
        },
        {
          id:'measure',
          name:'地图测量',
          icons:['el-icon-more','el-icon-share','el-icon-edit-outline'],
        },
        {
          id:'draw',
          name:'地图标绘',
          icons:['el-icon-more','el-icon-share','el-icon-edit-outline'],
        },
        {
          id:'putout',
          name:'地图导出',
          icons:['el-icon-picture'],
        },
        {
          id:'delet',
          name:'地图清除',
          icons:['el-icon-delete'],
        },
        
      ],
      view:{
        projection: "EPSG:4326",
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
      toolsarr:this.$route.query.toolsarr||['bigger','litter','allmap','getinfo','measure','draw','putout','delet'],
      toolsstate:this.$route.query.toolsstate||{bigger:0,litter:0,allmap:0,getinfo:0,measure:2,draw:1,putout:0,delet:0}
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
    togglemap:function(maplayers){
      this.maplist.togglemap(maplayers);
    },
    togglevector:function(maplayers){
      this.maplist.togglevector(maplayers);
    }
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
.maptools{
  top: 15%;
  left: 1%;
  position: absolute;
  width: 45px;
  z-index: 4;
  padding: 5px;
  padding-bottom: 1px;
  background: #ffffff;
  border-radius: 7px;
  -moz-box-shadow:2px 2px 2px 0px #B3B3B3;
  -webkit-box-shadow:2px 2px 2px 0px #B3B3B3;
  box-shadow:2px 2px 2px 0px #B3B3B3;
}
.maptools-list-button{
  margin: 2.5px 0 2.5px 0 ;
  padding: 7px 17px;
  float: left;
  border: 0;
}
.maptools-list-button-is{
  margin: 2.5px 0 2.5px 0 ;
  padding: 7px 17px;
  float: left;
  background: #99CCFF;
  color: #fff;
  border: 0;
}
</style>