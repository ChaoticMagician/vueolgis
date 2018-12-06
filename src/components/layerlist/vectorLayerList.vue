<template>
<div  >
  <el-tree
    class="vector-list"
    :data="treedata"
    show-checkbox
    node-key="id"
    :indent='10'
    highlight-current
    :props="defaultProps"
    @check = 'treecheck'>
  </el-tree>
</div>
</template>

<script>
import vectorlayer from '@/maputil/vectorlayer.js';
export default {
  name:'vectorLayerList',
  props:['maplist'],
  data(){
    return{
      treedata:this.$root.layersConfig.featuerLayers,
      layerslist:[],
      vectorlayers:{},
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  mounted(){
    this.parsetree(this.treedata,this.defaultProps.children)
    this.vectorlayers = new vectorlayer({
      layersinfo: this.layerslist
    });
    this.maplist.vectorallin(this.vectorlayers);
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
    treecheck:function(data,{checkedKeys,checkedNodes,halfCheckedKeys,halfCheckedNodes}){
      let openlayer = [];
      checkedNodes.forEach(element => {
        if (!element[this.defaultProps.children]){
          openlayer.push(element.id)
        }
      },this);
      this.maplist.togglevector(openlayer)
    }
  }
}
</script>

<style scoped>
.vector-list{
  margin: 8px;
}
</style>

