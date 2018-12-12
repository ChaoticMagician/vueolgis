<!-- ol弹出框 -->
<template>
    <div id="popup" class="ol-popup">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="popspan">详细信息</span>
          <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-close" @click="close"></i></el-button>
        </div>
        <el-table
          id="poptable"
          :data="popdata"
          class="poptable"
          stripe
          @row-click="locatefea"
          style="width: 100%;max-height:200px;overflow:auto;">
          <el-table-column
            prop="key"
            label="属性"
            width="90">
          </el-table-column>
          <el-table-column
            prop="value"
            label="值">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'SharkPopUp',
  props: ['popdata'],
  components:{
  },
  data () {
    return {
    }
  },
  mounted(){
  },
  methods:{
    close(){
      this.$sharkolapi.tools.clear();
      return false;
    },
    locatefea(row, event, column){
      console.log(row, event, column);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .ol-popup {
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    /* padding: 15px; */
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
  }
  .ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
  .ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
  }
  .ol-popup-closer:after {
    content: "✖";
  }
  .popspan{
    font-size: 12px;
    color: #409EFF;
  }
  .el-card__header {
    padding: 8px 10px;
  }
  .el-card__body{
    padding:5px;
  }
  .poptable tr{
    cursor: pointer;
  }
  .poptable td{
    padding:5px !important;
    font-size: 10px !important;
  }
  .poptable th{
    padding:5px !important;
    font-size: 13px !important;
    text-align: center;
    color:#333;
  }
</style>
