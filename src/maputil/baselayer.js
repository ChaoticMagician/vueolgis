import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
//创建对象，并将传入的图层信息映射为底图对象
let baselayers = function ({layersinfo}){
  this.layersinfo = layersinfo;
  this.layers = {};
  this._info2layer_ = function(info,index,arr){
    let layer = {};
    //图层信息转化为对象的方法，目前只有天地图类型底图；
    switch (info.type) {
      case 'TDTtile':
        layer =  new TileLayer({
          source: new XYZ({
            url: info.url,
            projection: "EPSG:3857",
          }),
          name: info.name,
          type: info.type,
          id:info.id,
          zIndex:info.zindex
        });
        break;

      default:
        console.error("底图信息有误，没有类型适配项")
        break;
    };
    return layer
  };
  if(Array.isArray(this.layersinfo)){
    this.layers = this.layersinfo.map(
      this._info2layer_
    );
  }else{
    console.error('底图加载失败，传入底图图层数组有误。')
  };
}
/**
 * 功   能：添加底图库
 * 实现思想：将传入的底图info信息转换成对应图层
 *  并将创建的底图push进入layers库，
 *  以备maplist调用。
 * 参数：info：{
 *          id:'',
 *          name: "",
 *          type: "TDTtile",
 *          url: '',
 *          epsg: 4326,
 *          zindex: 1,
 *        },
 */
baselayers.prototype.initbaselayer= function(info){
  let thislayer = this._info2layer_(info);
  this.layers.push(thislayer);
};
export default baselayers
