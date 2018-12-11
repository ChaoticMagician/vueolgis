<template>
<div
  @mouseover="ifopenlayermaster=true"
  @mouseout="ifopenlayermaster=false">
  <div>
    <span
      v-if="ifopenlayermaster"
      class="vector-list-title">
        图层控制
    </span>
    <el-button
      class="vector-list-button"
      size="mini"
      @click="togglethiscpe"
      :icon="ifopenlayermaster?'el-icon-delete':'el-icon-location'">
    </el-button>
  </div>
  <el-tree
    v-if="ifopenlayermaster"
    class="vector-list"
    :data="treedata"
    show-checkbox
    node-key="id"
    :indent='10'
    highlight-current
    :props="defaultProps"
    :default-checked-keys="defaultopen"
    @check = 'treecheck'>
  </el-tree>
</div>
</template>
 
<script>
export default {
  name:'vectorLayerList',
  props:['treedata','defaultopen'],
  data(){
    return{
      ifopenlayermaster:false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  methods:{
    treecheck:function(data,{checkedKeys,checkedNodes,halfCheckedKeys,halfCheckedNodes}){
      let openlayer = [];
      checkedNodes.forEach(element => {
        if (!element[this.defaultProps.children]){
          openlayer.push(element.id)
        }
      },this);
      this.$emit('togglevector',openlayer)
    },
    togglethiscpe(){
      this.ifopenlayermaster = !this.ifopenlayermaster;
    }
  }
}
</script>
 
<style scoped>
.vector-list{
  margin: 8px;
}
.vector-list-button{
  float: right;
  color: #000;
  border: 0;
}
</style>