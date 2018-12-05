<template>
  <ul class="vector-list"  >
    <li 
    class="vector-list-li"
    v-for="trem in listdata"
    :key="trem.id"
    >
      <span class="vector-list-li-span">{{trem.title}}</span>
    </li>
  </ul>
</template>

<script>

export default {
  name:'vectorLayerList',
  data(){
    return{
      listdata:this.$root.layersConfig.baseMapList,
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.vector-list{
  display: inline-block;
  list-style: none;
  width: 390px;
  color: #3e3e3e;
}
.vector-list-li-span {
  display: block;
  background: white;
  text-align: center;

}
.vector-list-li{
  margin-bottom: 12px;
  font-size: 1.14em;
}
.vector-list-li:hover{
  color:rgba(92, 142, 223, 0.822)
}
</style>

