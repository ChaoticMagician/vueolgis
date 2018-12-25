<template>
  <ul
  :class="ifonthis?'':'toggelmap-ul'"
  @mouseover="ifonthis=true"
  @mouseout="ifonthis=false">
    <li
      :class="[ifonthis ? '' : 'base-map-list-li-fold', 'base-map-list-li']"
      v-for="(trem,key,index) in baselistdata"
      :key="trem.id"
      @click="togglemap(trem.baseLayers,trem.id)"
      :style ="index==0?'margin-left: 0;':''">
      <img
        class="base-map-list-li-img"
        v-if="trem.type=='yaogan'"
        src="@/assets/mapimg/sanwei1.png"
        alt>
      <img class="base-map-list-li-img" v-else src="@/assets/mapimg/instmap.png" alt>
      <span
        :class='["base-map-list-li-span",thisbaseid==trem.id?"base-map-list-li-span-is":""]'
      >{{trem.title}}</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: "toggelmap",
  props:['baselistdata'],
  data() {
    return {
      thisbaseid:'',
      ifonthis:false
    };
  },
  methods:{
    togglemap:function(layers,id){
      this.thisbaseid = id;
      this.$emit('togglemap',layers)
    }
  }
};
</script>
 
<style scoped>
.toggelmap-ul{
  width: 12%;
}
.base-map-list-li{
 
  position: relative;
  height: 95%;
  padding-top: 1px;
  overflow:hidden;
}
.base-map-list-li-fold{
  margin-left: -31%;
}
.base-map-list-li:hover{
  color: rgb(121, 121, 224);
  height: 95%;
  padding-top: 1px;
  overflow:hidden;
}
.base-map-list-li-img{
  height: 100%;
}
.base-map-list-li-span{
  top: 11%;
  position: absolute;
  background: #ffffff;
  font-size: 15px;
  text-align:center;
  white-space:nowrap;
}
.base-map-list-li-span-is{
  color: blue;
}
</style>