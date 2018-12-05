<template>
  <div class="maphome">
    <div class="mapview" tabindex="0" id="mapdiv" ref='mapdiv' ></div>
    <!--这里是图层切换、图层控制按钮组件 -->
    <div class="layersList" @mouseleave.stop.self="whichList=''" >
      <div @mouseenter.stop.self="whichList='baseMapList'" :class="['layersListDiv',whichList=='baseMapList'? 'layersListDivIs':'']" id='baseMapList' >底图切换</div>
      <div @mouseenter.stop.self="whichList='vectorLayerList'" :class="['layersListDiv',whichList=='vectorLayerList'? 'layersListDivIs':'']" id="layerList"   >图层控制</div>
      <div @mouseenter.stop.self="whichList='thisList'" :class="['layersListDiv',whichList=='thisList'? 'layersListDivIs':'']" id="tameList"    >实时数据</div>
        <keep-alive>
          <component 
          :is="whichList"
          v-if="!(whichList =='')"
          @toggle-map='togglemap'
          class="layersListPopup"></component>
        </keep-alive>
    </div>
  </div>
</template>

<script>
//功能组件
import * as layersConfig from '../../static/mapconfig/layersConfig';
import { maplist } from '@/maputil/maplist.js'
//页面组件
import baseMapList from "@/components/layerlist/baseMapList";
import vectorLayerList from "@/components/layerlist/vectorLayerList";
import thisList from "@/components/layerlist/thisList";
export default {
  name: 'HelloWorld',
  data () {
    return {
      whichList:'',
      maplist:{},
      view : {
        projection: "EPSG:4326",
        center: [117.395, 38.93],
        zoom: 14,
        minZoom:6,
        maxZoom:16
      }
    }
  },
  components:{
    baseMapList,vectorLayerList,thisList
  },
  mounted(){
    //创建的时候将图层配置打入全局变量
    this.$root.layersConfig = layersConfig
    this.maplist = new maplist(
      this.$refs.mapdiv,
      this.view,
      this.$root.layersConfig.baseLayers,
      this.$root.layersConfig.baseMapList.difault.baseLayers
    );
    this.$root.maplist = this.maplist;
  },
  methods:{
    togglemap(maplayers){
      this.maplist.togglemap(maplayers);
    }
  }
}
</script>

<style scoped>
.maphome,.mapview{
  height: 100%;
  width: 100%;
}
.mapview{
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}
.layersList{
  width: 24%;
  margin-left: 29.16667%;
  left: 40%;
  top: 1%;
  position: relative;
  z-index: 2;
  /* top: -100%; */
  box-sizing: border-box;
  float: left;
  display: flex;
  flex-wrap: wrap;
  justify-content:space-between;
  align-items: center;
}
.layersListDiv{
  padding: 5px 1px;
  display: inline-block;
  flex-basis: 32%;
  margin: 0 auto;
  background-image: linear-gradient(#e0e0e0, #bbb);
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .5em;
  box-shadow: 0 1px white inset;
  text-align: center;
  text-shadow: 0 1px 1px #85a2f761;
  color: #333333b8;
  font-weight: 200;
  font-size: 15px;
  cursor: pointer;
}
.layersListDivIs{
  background-image: linear-gradient(#a8a8a8, #bbb);
}
.layersListPopup{
  display: inline-flex;
  flex-basis: 99%;
  margin-top: 1px;
  padding: 10px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.19);
  border-radius: 0.5em;
  box-shadow: 0px 1px 2px 0px #73737382;
}
</style>
