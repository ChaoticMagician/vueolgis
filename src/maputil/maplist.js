import Map from 'ol/Map';
import View from 'ol/View';
import baselayers from '@/maputil/baselayer.js';
import LayerGroup from 'ol/layer/Group';


let defaultmap = function ({target,view,baseinfos,baseopens,vectorinfos,vectoropens,...other}){
  this.map = {};
  this.other = other;
  this.baselayers = new baselayers({layersinfo:baseinfos});
  this.openbaselayers = {};
  this.vectorlayers = [];
  this.openvectorlayers = {};

  //根据传入的底图所具有的底图图层信息，组成底图图层组赋值maphavelayers
  let maphavelayers = this.baselayers.layers.filter(layer =>{
    return baseopens.includes(layer.values_.id)
  })
  this.openbaselayers = new LayerGroup({
    zIndex:1,
    layers:maphavelayers
  })
  //根据传入的动态图所具有的底图图层信息，组成底图图层组赋值maphavelayers
  let vectoropenslayers = []
  if(vectorinfos&&vectoropens){
      vectoropenslayers = this.vectorlayers.layers.filter(layer =>{
      return vectoropens.includes(layer.values_.id)
    })
  }
  this.openvectorlayers = new LayerGroup({
    zIndex:2,
    layers:vectoropenslayers
  })
  //创建底图map
  this.map = new Map({
    target: target,
    layers: [this.openbaselayers,this.openvectorlayers],
    view: new View(view)
  })
}
/**
 * 功   能：底图切换
 * 实现思想：map移除老的openbaselayers（底图图层组），
 *  清空openbaselayers并赋予新值，
 *  将新的openbaselayers加入map。
 * 参数：nowopens：['baselayer[id]','baselayer[id]',```]
 */
defaultmap.prototype.togglemap = function(nowbaseopens){
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
 * 功   能：创建图层库
 * 实现思想：解析可无限子集的图层树，
 *  将树中的图层组成一维数组，
 *  创造vectorlayers对象。
 * 参数：layerstree：{
          id:'dian',
          title:'点图层集合',
          children: [
            {id:'mz',title:'',url: "",sublayers:{name: "DL"},type:'wms'},
          ]
        }
 */
defaultmap.prototype.vectorallin = function(layerstree){
  console.log(layerstree)
}

export let maplist = defaultmap
