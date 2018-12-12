<!-- 默认主页面 -->
<template>
  <div id="map">
    <SharkPopUp id="sharkpopup" :popdata="popdata"></SharkPopUp>
    <LayerList id="layerlist"></LayerList>
    <Tools id="tools"></Tools>
    <MapSwitch id="mapswitch"></MapSwitch>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Tools from "@/components/Tools";
import LayerList from "@/components/LayerList";
import MapSwitch from "@/components/MapSwitch";
import Footer from "@/components/Footer";
import SharkPopUp from "@/components/SharkPopUp";

export default {
  name: 'Default',
  components:{
    Tools,
    MapSwitch,
    Footer,
    LayerList,
    SharkPopUp
  },
  data () {
    return {
      map:{},
      popdata:[],
    }
  },
  watch:{
    popdata(to,from){
      console.log('1',to,from);
    }
  },
  mounted(){
    this.map = this.$sharkolapi.initTDT('map',[117.16, 38.75]);
    // this.$sharkolapi.loadEsriTile('bb','');
    // this.map = this.$sharkolapi.initEsri('map','http://60.30.19.148:18080/ArcGIS/rest/services/BHRASTER/MapServer',[117.70, 39.03]);
    // this.$root.map = this.map;
    
    //画点线面
    // this.$sharkolapi.tools.drawfeature('Polygon',(f)=>{
    //   console.log(f);
    // });

    //打开点查询
    // this.$sharkolapi.tools.point(()=>{
    //   this.popdata = this.$sharkolapi.overlay.popdata;
    // });

    //量测
    // this.$sharkolapi.tools.measure('area');

    //缓冲区
    //this.$sharkolapi.tools.buffer([f],500,(fs)=>{
    //   //   this.$sharkolapi.overlay.OLBuffer.getSource().addFeature(this.$sharkolapi.tools.geotofea(fs));
    //   // });

    //加图层
    //this.$sharkolapi.loadgeojson('http://123.56.17.204:8081/geoserver/selfmap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=selfmap:FGM&outputFormat=application%2Fjson','FGM');    
    
    //查询
    // var g = {};
    // this.$sharkolapi.tools.drawfeature('Polygon',(f)=>{
    //   // this.$sharkolapi.tools.buffer([f],500,(fs)=>{
    //   //   this.$sharkolapi.overlay.OLBuffer.getSource().addFeature(this.$sharkolapi.tools.geotofea(fs));
    //   // });
    //   console.log(f);

    //   var arr =[];
    //   // var a = [];
    //   // a.push('OBJECTID');
    //   // a.push('between');
    //   // a.push([5,10]);
    //   // arr.push(a);
    //   // this.$sharkolapi.query(arr,['selfmap:FGM'],'http://123.56.17.204:8081/geoserver/ows?service=WFS',f.getGeometry());

    // });



    // var arr =[];
    // var a = [];
    // a.push('OBJECTID');
    // a.push('between');
    // a.push([5,10]);
    // arr.push(a);
    // this.$sharkolapi.query(arr,['selfmap:FGM'],'http://123.56.17.204:8081/geoserver/ows?service=WFS');

  },
  methods:{

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#map{
  height:100%;
  width:100%;
}
.el-main{
  padding: 0;
}
#layerlist{
  position:absolute;
  top: 1em;;
  left:1em;
  z-index: 10;
}
#tools{
  position:absolute;
  top:1em;
  right:1em;
  z-index: 10;
}
#mapswitch{
  position:absolute;
  top: 70px;;
  right:10px;
  z-index: 10;
}
#footer{  
  position:absolute;
  bottom: 1px;
  z-index: 10;
}
.ol-zoom {
  top: initial;
  left: initial;
  right: 5px;
  bottom: 50px;
}

/**
绘制图层，量测begin
  */
.tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
}
.tooltip-measure {
  opacity: 1;
  font-weight: bold;
}
.tooltip-static {
  background-color: #ffcc33;
  color: black;
  border: 1px solid white;
}
.tooltip-measure:before,
.tooltip-static:before {
  border-top: 6px solid rgba(0, 0, 0, 0.5);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: "";
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}
.tooltip-static:before {
  border-top-color: #ffcc33;
}    
      
/**
绘制图层，量测end
  */
</style>
