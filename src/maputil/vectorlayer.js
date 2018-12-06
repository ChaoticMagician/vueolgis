import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import ImageLayer from 'ol/layer/Image.js';
import ImageWMS from 'ol/source/ImageWMS.js';

let vectorlayer = function ({layersinfo}){
  this.layersinfo = layersinfo;
  this.pointarr = [];
  this.linearr = [];
  this.Polygonarr = [];
  this.allcategoryarr = [];
  this.layers = [];
  this._info2layer_ = function(info,index,arr){
    let layer = {};
    //图层信息转化为对象的方法，目前只有天地图类型底图；
    switch (info.type) {
      case 'geojson':
        layer = new VectorLayer({
          id: info.id,
          title: info.title,
          name: info.name,
          type: info.type,
          source: new VectorSource({
            url: info.url,
            format: new GeoJSON()
          }),
          opacity:1,
          visible: true
        });
      break;
      case 'wms':
        layer = new ImageLayer({
          id: info.id,
          title: info.title,
          name: info.name,
          type: info.type,
          source: new ImageWMS({
            url: info.url,
            params: {'LAYERS': info.name},
            serverType: 'geoserver',
            crossOrigin: 'anonymous'
          }),
          opacity:1,
          visible: true
        });
      break;
      default:
        layer = {message: info.type+'是未定义的图层数据源类别!'}
        console.error(info.type+'是未定义的图层数据源类别!')
      break;
    };
    return layer
  };
  //划分点图层、线图层和面图层的数组，并按照面、线、点的顺序合并图层数组
  this._info2categoryarr_ = function(info,index,arr){
    switch (info.category) {
      case 'Point':
        this.pointarr.push(info)
      break;
      case 'LineString':
        this.linearr.push(info)
      break;
      case 'Polygon':
        this.Polygonarr.push(info)
      break;
      default:
        console.error(info.category+'是未定义的图层类别,')
      break;
    };
    this.allcategoryarr=this.Polygonarr.concat(this.linearr).concat(this.pointarr)
  }
  //判断参数是否为数组，是数组执行方法，不是则报错
  if(Array.isArray(this.layersinfo)){
    this.layersinfo.forEach(
      this._info2categoryarr_,this
    );
    this.layers = this.allcategoryarr.map(
      this._info2layer_,this
    );
  }else{
    console.error('图层加载失败，传入动态图层数组有误。')
  };
}
vectorlayer.prototype.initvectorlayer = function(info){
  let thislayer = this._info2layer_(info);

  //依据图层类别添加新图层到不同位置
  switch (info.category) {
    case 'Polygon':
      this.layers.splice(this.Polygonarr.length,0,thislayer); 
    break;
    case 'LineString':
      this.layers.splice(this.Polygonarr.length+this.linearr.length,0,thislayer); 
    break;
    case 'Point':
      this.layers.push(thislayer); 
    break;
    default:
      console.error(info.category+'是未定义的图层类别,')
    break;
  }
  console.log(this.layers)
}

export default vectorlayer