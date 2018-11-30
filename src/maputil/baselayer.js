import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
//创建对象，并将传入的图层信息映射为底图对象
let baselayers = function (layersinfos){
  this.layersinfos = layersinfos;
  this._info2layer_ = function(info,index,arr){
    let layer = {};
    //图层信息转化为对象的方法，目前只有天地图类型底图；
    switch (info.type) {
      case 'TDTtile':
        layer =  new TileLayer({
          source: new XYZ({
            url: info.url
          }),
          name: info.name,
          type: info.type,
          id:info.id,
          zIndex:info.zindex
        });
        break;
    
      default:
        console.error("底图信息有误，没有类型配配项")
        break;
    };
    return layer
  };
  if(Array.isArray(this.layersinfos)){
    this.layers = this.layersinfos.map(
      this._info2layer_
    );
  }else{
    console.error('底图加载失败，传入底图图层数组。')
  };
}
//在底图库中添加图层的方法
baselayers.prototype.initbaselayer= function(info){
  let thislayer = this._info2layer_(info);
  this.layers.push(thislayer);
  console.log(this.layers )
};
export default baselayers
