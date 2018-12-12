<!-- 工具菜单 -->
<template>
<el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item name="1">     
    <template slot="title">
      图层控制
      <!-- <i class="header-icon el-icon-more"></i> -->
    </template> 
    <el-tree
    :data="treedata"
    show-checkbox
    node-key="id"
    @check-change="operatelayer"
    :default-expanded-keys="[2, 3]"
    :default-checked-keys="[4,5,7]"
    :props="defaultProps">
    </el-tree>
  </el-collapse-item>
</el-collapse>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import XYZ from "ol/source/XYZ";
import {transform} from 'ol/proj.js';
  export default {
    name: 'LayerList',
    data() {
      return {
        activeNames: [],
        treedata: 
        [
            {
                id: 1,
                label: '点状地图',
                children: [{
                    id: 4,
                    label: '点状名字',
                    name:'MZ'
                }]
            }, {
                id: 2,
                label: '线状地图',
                children: [{
                    id: 5,
                    label: '园区道路',
                    name:'DL'
                }]
                }, {
                id: 3,
                label: '面状地图',
                children: [{
                    id: 7,
                    label: '房屋结构',
                    name:'FGM'
                }]
                }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        changedstate:false,
        changedleafs:[]
      };
    },
    watch:{
        changedleafs:function(){
            if(this.changedleafs.length > 0){
                this.changedleafs.forEach(leaf=>{
                    let l = this.$sharkolapi.getLayer(leaf.name);
                    if(l!=null){
                        l.setVisible(this.changedstate);
                    }
                })
            }
        }
    },
    methods: {
        //控制图层的显示隐藏
        operatelayer(node,state){
            this.changedstate = state;
            this.getLeafs(node,state);
        },
        getLeafs(node){
            this.changedleafs = [];
            if(node.children == null){
                this.changedleafs.push(node);
            }else{
                node.children.forEach(leaf=>this.getLeafs(leaf));
            }
        },
        handleChange(val) {
            // console.log(val);
        }
    },
    mounted(){
        setTimeout(() => {    
            this.$sharkolapi.loadgeojson('http://123.56.17.204:8081/geoserver/selfmap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=selfmap:DL&outputFormat=application%2Fjson','DL');    
            this.$sharkolapi.loadgeojson('http://123.56.17.204:8081/geoserver/selfmap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=selfmap:MZ&outputFormat=application%2Fjson','MZ');    
            this.$sharkolapi.loadgeojson('http://123.56.17.204:8081/geoserver/selfmap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=selfmap:FGM&outputFormat=application%2Fjson','FGM');    
        }, 1000);
    }
  };
</script>

<style>
.el-tree,.el-collapse{
    width:250px;
    background-color: rgba(255, 255, 255, 0.9)
}
.el-collapse-item__header{
    background-color: transparent;
}
.el-collapse-item__wrap{    
    background-color: transparent;
}
.el-collapse-item{
    margin: 0 10px 0 10px;
}
</style>