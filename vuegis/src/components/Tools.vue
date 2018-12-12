<!-- 工具菜单 -->
<template>
<el-row>
  <el-button size="mini" icon="el-icon-search" @click="fullmap">全图</el-button>
  <el-button size="mini"  type="primary" icon="el-icon-edit" @click="point">点击</el-button>
  <el-button size="mini"  type="success" icon="el-icon-check" @click="measure">测量</el-button>
  <el-button size="mini"  type="info" icon="el-icon-message" @click="buffer">缓冲区</el-button>
  <el-button size="mini"  type="warning" icon="el-icon-star-off" @click="query">查询</el-button>
  <el-button size="mini"  type="danger" icon="el-icon-delete" @click="clear">清除</el-button>
</el-row>
</template>

<script>
export default {
  name: 'Tools',
  data () {
    return {
      msg: 'Tools'
    }
  },
  methods:{
    fullmap:function(){
      this.$root.map.setView(this.$sharkolapi.view);
    },
    point:function(){      
      this.$sharkolapi.tools.drawfeature('Polygon',(f)=>{
        console.log(f);
      });
    },
    measure:function(){},
    buffer:function(){      
      this.$sharkolapi.tools.drawfeature('Polygon',(f)=>{
        this.$sharkolapi.tools.buffer([f],500,(fs)=>{
          this.$sharkolapi.overlay.OLBuffer.getSource().addFeature(this.$sharkolapi.tools.geotofea(fs));
        });
      });

    },
    query:function(){},
    clear:function(){
      this.$sharkolapi.tools.clear();
        // this.$layer.alert("搜索啊");
    }
  }
}

</script>
<style scoped>
.el-row{
    background-color: rgba(255, 255, 255, 0.6);
}
</style>