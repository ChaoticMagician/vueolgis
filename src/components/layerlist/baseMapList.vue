<template>
  <ul class="base-map-list"  >
    <li 
    class="base-map-list-li"
    v-for="trem in listdata"
    :key="trem.id"
    @click="togglemap(trem.baseLayers)"
    >
      <img v-if="trem.type=='yaogan'"  src="@/assets/mapimg/sanwei1.png" alt="">
      <img v-else  src="@/assets/mapimg/instmap.png" alt="">
      <span class="base-map-list-li-span">{{trem.title}}</span>
    </li>
  </ul>
</template>

<script>

export default {
  name:'baseMapList',
  data(){
    return{
      listdata:this.$root.layersConfig.baseMapList,
    }
  },
  methods:{
    togglemap(maplayers){
      this.$emit('toggle-map',maplayers)
    }
  }
}
</script>

<style scoped>
.base-map-list{
  display: flex;
  list-style: none;
  width: 390px;
  flex-wrap:wrap;
  color: #3e3e3e;
}
.base-map-list-li-span {
  position: absolute;
  margin-top: -110px;
  margin-left: 12px;
  background: white;
  text-align: center;

}
.base-map-list-li:hover{
  color:rgba(92, 142, 223, 0.822)
}
</style>

