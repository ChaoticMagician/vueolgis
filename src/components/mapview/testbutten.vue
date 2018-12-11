<template>
  <div >
    <el-button @click="routerpush('/mapview/map',mapquery)" >map测试</el-button>
  </div>
</template>
 
<script>
export default {
  name:'testbutten',
  data (){
    return{
      mapquery:{
        view:{
          center: [117.1599, 38.7524],
          zoom: 15,
          minZoom:6,
          // maxZoom:17
        },
        baseinfos:null,                  
        baseopens:['diazilayer','biaozhulayer'],
        vectorinfos:null,
        vectoropens:['mz','lz']
      },
    }
  },
  methods:{
    routerpush(path,query){
      this.$router.push({
            path,
            query
          })
    }
  }
}
</script>
 
<style scoped>
 
</style>