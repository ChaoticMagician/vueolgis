<template>
  <div
    class="maptools"
    v-if="toolsarr[0]"
    >
    <el-tooltip
      class="item"
      effect="dark"
      v-for="trem in thistoolsarr"
      :key="trem.id"
      :content="trem.name[toolsstate[trem.id]]"
      :open-delay='500'
      v-if="toolsarr.includes(trem.id)"
      placement="right">
      <el-button
        :class="toolsstate[trem.id]==0?'maptools-list-button':'maptools-list-button-is'"
        size="mini"
        @click="toolsbutton(trem.id,toolsstate[trem.id])"
        :icon="trem.icons[toolsstate[trem.id]]">
      </el-button>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  name:'toolslist',
  props:[
    'view','maplist','extent'
  ],
  data(){
    return{
      thistoolsarr:[
        {
          id:'bigger',
          name:['地图放大','地图放大'],
          icons:['el-icon-plus','el-icon-plus']
        },
        {
          id:'litter',
          name:['地图缩小','地图缩小'],
          icons:['el-icon-minus','el-icon-minus'],
        },
        {
          id:'allmap',
          name:['还原定位'],
          icons:['el-icon-location'],
        },
        {
          id:'getinfo',
          name:['属性拾取','关闭拾取'],
          icons:['el-icon-info','el-icon-share'],
        },
        {
          id:'measure',
          name:['地图测量','长度测量','面积测量'],
          icons:['el-icon-more','el-icon-share','el-icon-edit-outline'],
        },
        {
          id:'draw',
          name:['地图标绘','点标绘','线标绘','面标绘'],
          icons:['el-icon-more','el-icon-edit-outline','el-icon-share','el-icon-edit-outline'],
        },
        {
          id:'putout',
          name:['地图导出','关闭导出'],
          icons:['el-icon-picture','el-icon-picture'],
        },
        {
          id:'delet',
          name:['地图清除'],
          icons:['el-icon-delete'],
        },
      ],
      toolsarr:this.$route.query.toolsarr||['bigger','litter','allmap','getinfo','measure','draw','putout','delet'],
      toolsstate:this.$route.query.toolsstate||{bigger:0,litter:0,allmap:0,getinfo:0,measure:0,draw:0,putout:0,delet:0}
    }
  },
  methods:{
    /**
     * 地图工具条方法判断
     */
    whentoolsbutton:function(){

    },
    /***
     * 地图工具条方法汇总
     */
    toolsbutton:function(whitchone,thisstate){
      console.log(whitchone,thisstate);
      switch (whitchone+thisstate) {
        case 'bigger0':
        //地图放大，，可改成拉框放大
          this.view.setZoom(this.view.getZoom()+0.5); 
          break;
        case 'litter0':
        //地图缩小，，可改成拉框缩小
          this.view.setZoom(this.view.getZoom()-0.5); 
          break;
        case 'allmap0':
        //地图归位
        //liguobiao 这里需要改
           this.view.fit(this.extent,{padding: [0.5,0.5,0.5,0.5]});
          break;
        case 'getinfo0':
        //开启地图属性点选
          this.toolsstate.getinfo = 1;
          
          break;
        case 'getinfo1':
        //关闭地图属性点选
          this.toolsstate.getinfo = 0;
          
          break;
        case 'measure0':
        //开启长度测量
          this.toolsstate.measure = 1;
          
          break;
        case 'measure1':
        //开启面积测量
          this.toolsstate.measure = 2;
          
          break;
        case 'measure2':
        //关闭测量
          this.toolsstate.measure = 0;
          
          break;
        case 'draw0':
        //开启点标注
          this.toolsstate.draw = 1;
          
          break;
        case 'draw1':
        //开启线标注
          this.toolsstate.draw = 2;
          
          break;
        case 'draw2':
        //开启面标注
          this.toolsstate.draw = 3;
          
          break;
        case 'draw3':
        //关闭测量
          this.toolsstate.draw = 0;
          
          break;
        case 'putout0':
        //开启地图导出
          this.toolsstate.putout = 1;
          
          break;
        case 'putout1':
        //关闭地图导出
          this.toolsstate.putout = 0;
          
          break;
        case 'delet0':
        //清空地图
          
          break;
        default:
          break;
      }
    }
  }

}
</script>
<style scoped>
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

