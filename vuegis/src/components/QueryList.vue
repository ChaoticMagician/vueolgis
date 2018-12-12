<!-- 查询列表 -->
<template>
<el-row>
  <el-button icon="el-icon-search" circle></el-button>
  <el-button type="primary" icon="el-icon-edit" circle></el-button>
  <el-button type="success" icon="el-icon-check" circle></el-button>
  <el-button type="info" icon="el-icon-message" circle></el-button>
  <el-button type="warning" icon="el-icon-star-off" circle></el-button>
  <el-button type="danger" icon="el-icon-delete" circle></el-button>
</el-row>
</template>

<script>
export default {
  name: 'QueryList',
  data () {
    return {
      msg: 'QueryList'
    }
  },
  methods:{

  }
}

</script>
<style>

</style>