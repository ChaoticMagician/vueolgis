<!-- 工具菜单 -->
<template>
  <el-radio-group v-model="basemap" size="small">
      <el-radio-button :label="this.$sharkolapi.BASEMAP.DZDT"></el-radio-button>
      <el-radio-button :label="this.$sharkolapi.BASEMAP.YXDT"></el-radio-button>
  </el-radio-group>
</template>

<script>
export default {
  name: 'MapSwitch',
  data () {
    return {
      basemap: this.$sharkolapi.BASEMAP.DZDT
    }
  },
  watch: {
    //修改底图
    basemap: function () {  
      this.$sharkolapi.tools.changebasemap(this.basemap);
    }
  },
  methods:{
  }
}

</script>
<style scoped>
.el-row{
    background-color: rgba(255, 255, 255, 0.6);
}
</style>