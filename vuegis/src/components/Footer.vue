<!-- Footer 授权等信息 -->
<template>
<div>
  {{msg}}
</div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      msg: '© 2018-2020 技术支持 shark 没有备案号 '
    }
  },
  methods:{

  }
}

</script>
<style scoped>
div{
    background-color: rgba(100, 100, 100,0.8);
    height:30px;
    line-height: 30px;
    right:8px;
    left:8px;
    text-align: center;
    color:#ddd;
}
</style>