import Map from 'ol/Map';
import View from 'ol/View';
import baselayers from '@/maputil/baselayer.js'


let defaultmap = function (target,view,layers,opens,...other){
  this.maphavelayers =  [];
  this.opens = opens;
  this.other = other;
  this.baselayers = new baselayers(layers);
  //根据传入的底图所具有的底图图层信息，组成底图图层组赋值maphavelayers
  this.maphavelayers = this.baselayers.layers.filter(layer =>{
    return opens.includes(layer.values_.id)
  })
  //创建底图map
  this.map = new Map({
    target: target,
    layers: this.maphavelayers,
    view: new View(view)
  })
}
defaultmap.prototype.togglemap = function(nowopens){
  //移除没有在当前nowopens的底图图层
  let removelayers =  this.map.getLayers().array_.filter(layer => {
    return !nowopens.includes(layer.values_.id)
  });
  removelayers.forEach(layer => {
    this.map.removeLayer(layer)
    console.log(layer,nowopens)
  });
  //添加在baselayers中但没有在opens中的图层
  this.baselayers.layers.forEach(layer => {
    if(nowopens.includes(layer.values_.id)&&!this.opens.includes(layer.values_.id)){
      this.map.addLayer(layer)
    }
  });
  //将对象中的maphavelayers和opens指向最新
  this.opens = nowopens;
  this.maphavelayers = this.map.getLayers();
};
export let maplist = defaultmap
