

let vectorlayer = function ({layersinfo}){
  this.layersinfo = layersinfo;
  this._info2layer_ = function(info,index,arr){};
  console.log(this.layersinfo);


  if(Array.isArray(this.layersinfo)){
    this.layers = this.layersinfo.map(
      this._info2layer_
    );
  }else{
    console.error('图层加载失败，传入动态图层数组有误。')
  };
}


export default vectorlayer