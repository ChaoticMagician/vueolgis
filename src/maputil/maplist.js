import Map from 'ol/Map';
import View from 'ol/View';
import baselayers from '@/maputil/baselayer.js';
import LayerGroup from 'ol/layer/Group';
import vectorlayer from '@/maputil/vectorlayer.js';


let maplist = function ({target,view,baseinfos,baseopens,vectorinfos,vectoropens,...other}){
  this.map = {};
  this.other = other;
  this.baselayers = new baselayers({layersinfo:baseinfos});
  this.openbaselayers = {};
  this.vectorlayers = null;
  this.openvectorlayers = {};
  this.baseindex = this.baselayers.layers.length
  //根据传入的view对象，对this.view进行实例化
  view.center = view.center||[117.395, 38.93];
  view.zoom = view.zoom||14;
  view['projection'] = "EPSG:4326";
  this.view = new View(view);
  if (view.extent) {
    this.view.fit(view.extent)
  } 
  //根据传入的底图所具有的底图图层信息，组成底图图层组赋值maphavelayers
  let maphavelayers = this.baselayers.layers.filter(layer =>{
    return baseopens.includes(layer.values_.id)
  })
  this.openbaselayers = new LayerGroup({
    zIndex:this.baseindex,
    layers:maphavelayers
  })
  //根据传入的动态图所具有的底图图层信息，组成底图图层组赋值maphavelayers
  let vectoropenslayers = []
  if(vectorinfos&&vectoropens){
      this.vectorlayers = new vectorlayer({layersinfo:vectorinfos});
      vectoropenslayers = this.vectorlayers.layers.filter(layer =>{
      return vectoropens.includes(layer.values_.id)
    });
    vectoropenslayers.forEach((layer,index) => {
      layer.setZIndex(this.baseindex+index+10)
    });
  }
  this.openvectorlayers = new LayerGroup({
    zIndex:2,
    layers:vectoropenslayers
  })
  //创建底图map
  this.map = new Map({
    target: target,
    layers: [this.openbaselayers,this.openvectorlayers],
    view: this.view
  });
  //去除默认缩放组件
  this.map.removeControl(this.map.controls.array_[0]);
  //去除默认旋转组件
  this.map.removeControl(this.map.controls.array_[0]);
}
/**
 * 功   能：挂载底图图层库
 * 解   释：将外部的底图图层挂载到baselayers，用于底图切换
 * 实现思想：获取图层集合参数，将this.baselayers = 参数集合
 * 参数：layersarr：[layer,layer,layer]
 */
maplist.prototype.baseallin = function(layersarr){
  this.baselayers = null;
  this.baselayers = layersarr;
}
/**
 * 功   能：底图切换
 * 实现思想：map移除老的openbaselayers（底图图层组），
 *  清空openbaselayers并赋予新值，
 *  将新的openbaselayers加入map。
 * 参数：nowopens：['baselayer[id]','baselayer[id]',```]
 */
maplist.prototype.togglemap = function(nowbaseopens){
  let newmaphavelayers = this.baselayers.layers.filter(layer =>{
    return nowbaseopens.includes(layer.values_.id)
  });
  this.map.removeLayer(this.openbaselayers)
  this.openbaselayers = null;
  this.openbaselayers = new LayerGroup({
    zIndex:1,
    layers:newmaphavelayers
  });
  this.map.addLayer(this.openbaselayers)
};
/**
 * 功   能：挂载动态图层库
 * 解   释：将外部的动态图层挂载到vectorlayers，用于图层的管理
 * 实现思想：获取图层集合参数，将this.vectorlayers = 参数集合
 * 参数：layersarr：[layer,layer,layer]
 */
maplist.prototype.vectorallin = function(layersarr){
  this.vectorlayers = null;
  this.vectorlayers = layersarr;
}
/**
 * 功   能：动态图层切换
 * 实现思想：map移除老的openvectorlayers（底图图层组），
 *  清空openmaplist.prototype.togglemaplayers并赋予新值，
 *  将新的openvectorlayers加入map。
 * 参数：nowopens：['baselayer[id]','baselayer[id]',```]
 */
maplist.prototype.togglevector = function(nowvectoropens){
  let newvectorhavelayers = this.vectorlayers.layers.filter(layer =>{
    return nowvectoropens.includes(layer.values_.id)
  });
  newvectorhavelayers.forEach((layer,index) => {
    layer.setZIndex(this.baseindex+index+10)
  });
  this.map.removeLayer(this.openvectorlayers);
  this.openvectorlayers = null;
  this.openvectorlayers = new LayerGroup({
    layers: newvectorhavelayers
  });
  this.map.addLayer(this.openvectorlayers)
}
export default maplist
