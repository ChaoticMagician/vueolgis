const baseLayers = [
  {
    id:'biaozhulayer',
    name: "天地图的地图标注",
    type: "TDTtile",
    url: "http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}",
    epsg: 4326,
    zindex: 2,
  },
  {
    id:'diazilayer',
    name: "天地图电子地图",
    type: "TDTtile",
    url: "http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}",
    epsg: 4326,
    zindex: 0,
  },
  {
    id:'yaoganlayer',
    name: "天地图影像地图",
    type: "TDTtile",
    url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}',
    epsg: 4326,
    zindex: 1,
  },
]
const baseMapList={
  difault:{
    type:'difault',
    id:"other0",
    title:"默认地图",
    baseLayers:['diazilayer','biaozhulayer']
  },
  yaogan:{
    type:'yaogan',
    id:"other1",
    title:"遥感影像",
    baseLayers:['yaoganlayer','biaozhulayer']
  },
  dianzi:{
    type:'dianzi',
    id:"other2",
    title:"电子地图",
    baseLayers:['diazilayer']
  }
}

const featuerLayers = [
  {
    id:'dl',
    title:'小王庄道路',
    url: "http://123.56.17.204:8081/geoserver/selfmap/wms",
    sublayers:{
      name: "DL"
    },
    type:'wms'
  },
  {
    id:'dian',
    title:'点图层集合',
    children:  {
      id:'mz',
      title:'小王庄门址',
      url: "http://123.56.17.204:8081/geoserver/selfmap/wms",
      sublayers:{
        name: "DL"
      },
      type:'wms'
    },
  }
]
export {baseLayers,baseMapList,featuerLayers};