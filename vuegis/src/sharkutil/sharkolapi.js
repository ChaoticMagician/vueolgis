/**
 * 作者：shark
 * 功能：用ol操作底图的功能类
 * 使用说明：使用vue，必须加载ol
 * 创建时间：2018.11.12
 */

 //加载ol的模块
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import {OSM, TileArcGISRest} from 'ol/source.js';
import XYZ from "ol/source/XYZ";
import {transform} from 'ol/proj.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Overlay from 'ol/Overlay.js';
import {getArea, getLength} from 'ol/sphere.js';
import LinearRing from 'ol/geom/LinearRing.js';
import {Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon} from 'ol/geom.js';
import Feature from 'ol/Feature';
import {unByKey} from 'ol/Observable.js';
import Draw from 'ol/interaction/Draw.js';
import WFS from 'ol/format/WFS';
import {
  equalTo as equalToFilter,
  notEqualTo as notEqualToFilter,
  greaterThan as greaterThanFilter,
  greaterThanOrEqualTo as greaterThanOrEqualToFilter,
  lessThan as lessThanFilter,
  lessThanOrEqualTo as lessThanOrEqualToFilter,
  during as duringFilter,//date类型比较
  like as likeFilter,
  and as andFilter,
  between as betweenFilter,
  intersects as intersectsFilter
} from 'ol/format/filter';
import {Fill, Stroke, Style,Circle,Text} from 'ol/style.js';
import sharkstyles from './sharkstyles';
import $ from 'jquery';
// require('jsts');
// import jsts from 'jsts/dist/jsts.js';
import 'ol/ol.css'

var sharkolapi =  {
    BASEMAP:{
        DZDT:'电子地图',
        YXDT:'影像地图',
        DXDT:'地形地图',
    },
    draw:{},//绘图对象
    overlay:{
      //绘制要素层
      OLfea:{},
      //绘制弹出模板
      OLmodal:{},
      //绘制量测层
      OLMeasure:{},
      //绘制缓冲区
      OLBuffer:{},
      //弹出数据过滤
      popexcept:['geometry','objectid','shape_area','shape_length','shape_leng','wkt'],
      //弹出数据
      popdata:[],
    },
    //map对象
    map:{},
    //全图范围对象
    view:{},
    //初始化
    init:function(){
      var highlightStyle = sharkstyles.setStyle('polygon','#4682B4','rgba(255,0,0,0.6)') ;

      sharkolapi.overlay.OLfea = new VectorLayer({
        source: new VectorSource(),
        map: sharkolapi.map,
        style:highlightStyle
      });
      sharkolapi.overlay.OLBuffer = new VectorLayer({
        source: new VectorSource(),
        map: sharkolapi.map,
        style:highlightStyle
      });
      sharkolapi.overlay.OLMeasure = new VectorLayer({
        source: new VectorSource(),
        map: sharkolapi.map,
        style: sharkstyles.setStyle('polygon','#4682B4','rgba(255,215,0,0.5)',1.5) 
      });

      sharkolapi.overlay.OLmodal = new Overlay({
        element: document.getElementById('sharkpopup')
        ,
        auto:true,
        autoPanAnimation: {
          duration: 250
        }
      });
      sharkolapi.map.addOverlay(sharkolapi.overlay.OLmodal);
 
        let measureTooltipElement;
        let measureTooltip;
        if (measureTooltipElement) {
          measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'tooltip tooltip-measure';
        measureTooltip = new Overlay({
          element: measureTooltipElement,
          offset: [0, -15],
          positioning: 'bottom-center',
          id:'measureTooltip'
        });
        sharkolapi.map.addOverlay(measureTooltip);
        sharkolapi.view = sharkolapi.map.getView();
    },
    //初始化天地图
    initTDT:function(id,centerpint){
        let center = transform(centerpint, "EPSG:4326", "EPSG:3857");
        this.map = new Map({
            target: id,
            layers: [
              new TileLayer({
                source: new XYZ({
                  url: "http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
                }),
                name: "天地图电子地图",
                type: "BaseMap"
              }),
              new TileLayer({
                source: new XYZ({
                  url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}'
                }),
                visible:false,
                isGroup: true,
                name: "天地图影像地图",
                type: "BaseMap"
              }),  
              new TileLayer({
                source: new XYZ({
                  url: "http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}"
                }),
                isGroup: true,
                name: "天地图文字标注"
              })       
            ],
            view: new View({
              projection: "EPSG:3857",
              center: center,
              zoom: 14,
              minZoom:10
            })
          });
        sharkolapi.init();
        return this.map;
    },
    //初始化高德地图
    initGD:function(id,centerpint){
        let center = transform(centerpint, "EPSG:4326", "EPSG:3857");
        this.map = new Map({
            target: id,
            layers: [
              new TileLayer({
                source: new XYZ({
                  url: "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
                }),
                name: "天地图电子地图",
                type: "BaseMap"
              }),
              new TileLayer({
                source: new XYZ({
                  url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
                }),
                visible:false,
                isGroup: true,
                name: "天地图影像地图",
                type: "BaseMap"
              })     
            ],
            view: new View({
              projection: "EPSG:3857",
              center: center,
              zoom: 14,
              minZoom:10
            })
          });
        sharkolapi.init();
        return this.map;
    },
    //初始化arcgis切片，坐标系为4326经纬度坐标
    initEsri:function(id,url,centerpint){      
      this.map = new Map({
          target: id,
          layers: [
            new TileLayer({
              source: new TileArcGISRest({
                url: url
              }),
              name: '电子地图',
              type: "BaseMap"
            })
          ],
          view: new View({
            projection: "EPSG:4326",
            center: centerpint,
            zoom: 14,
            // minZoom:10
          })
        });
      // sharkolapi.init();
      return this.map;
    },
    //加载Esri切片
    loadEsriTile(name,url,type=""){
      let l = new TileLayer({
        source: new TileArcGISRest({
          url: url
        }),
        name: name,
        type: type
      });
      this.map.addLayer(l);
    },
    //加载Wms数据
    loadWms:function(url,layername,opacity = 1,visible = true){
      let l = new TileLayer({
        name:layername,
        source: new TileWMS({
            url: url,
            params: {
                'LAYERS': layername,
                'VERSION': '1.1.1',  
                // 'TILED': true   //是否要将数据制作成切片，省略后返回的是一张完整图。
            },
            serverType: 'geoserver',
            projection: "EPSG:4326"
        }),
        opacity:opacity,
        visible:visible
    });
    this.map.addLayer(l);
    },
    //加载geojson
    loadgeojson:function(url,layername,opacity = 1,visible = true){
      var l = new VectorLayer({
        name:layername,
        source: new VectorSource({
          url: url,
          format: new GeoJSON()
        }),
        // style: sharkstyles.setStyle(),
        opacity:opacity,
        visible:visible
      });
      this.map.addLayer(l);
    },
    //加载geojson
    loadkml:function(){

    },
    //条件生成函数
    makecondition:function(queryArr,geo){
      var f = null;
      queryArr.forEach(q => {
        switch(q[1].toLowerCase()){
          case '=':
            f = f == null? equalToFilter(q[0],q[2]):andFilter(f,equalToFilter(q[0],q[2]));
            break;
          case '!=':
            f = f == null? notEqualToFilter(q[0],q[2]):andFilter(f,notEqualToFilter(q[0],q[2]));
            break;
          case 'between':
            f = f == null? betweenFilter(q[0],q[2][0],q[2][1]):andFilter(f,betweenFilter(q[0],q[2][0],q[2][1]));
            break;
          case '>':
            f = f == null? greaterThanFilter(q[0],q[2]):andFilter(f,greaterThanFilter(q[0],q[2]));
            break;
          case '>=':
            f = f == null? greaterThanOrEqualToFilter(q[0],q[2]):andFilter(f,greaterThanOrEqualToFilter(q[0],q[2]));
            break;
          case '<':
            f = f == null? lessThanFilter(q[0],q[2]):andFilter(f,lessThanFilter(q[0],q[2]));
            break;
          case '<=':
            f = f == null? lessThanOrEqualToFilter(q[0],q[2]):andFilter(f,lessThanOrEqualToFilter(q[0],q[2]));
            break;
          case 'like':
            f = f == null? likeFilter(q[0],q[2]):andFilter(f,likeFilter(q[0],q[2]));
            break;
          // case 'between':
          //   f = f == null? betweenFilter(q[0],q[2][0],q[2][1]):andFilter(f,betweenFilter(q[0],q[2][0],q[2][1]));
          //   break;
          default:
            break;
        }
      });
      if(geo!=null){
        f = f == null? intersectsFilter('the_geom',geo,'EPSG:3857'):
        andFilter(f,intersectsFilter('the_geom',geo,'EPSG:3857'));
      }
      return f;
    },
    //只能支持简单条件查询，不支持特别复杂的查询条件
    query:function(queryArr,layerArr,wfsserver,geo){
      // var filter1 = equalToFilter('OBJECTID', 7);
      var filter1 = sharkolapi.makecondition(queryArr,geo);
      //获取wms生成的资源url， fdLayer.getSource().getGetFeatureInfoUrl
      var featureRequest = new WFS().writeGetFeature({
        // srsName: 'EPSG:4326',//坐标系统
        // featureNS: 'selfmap',//命名空间 URI
        // featurePrefix: 'selfmap',//工作区名称
        featureTypes: layerArr,//查询图层，可以同一个工作区下多个图层，逗号隔开
        outputFormat: 'application/json',
        filter: filter1
      });
      fetch(wfsserver, {//geoserver wfs地址如http://123.56.17.204:8081/geoserver/ows?service=WFS
          method: 'POST',
          body: new XMLSerializer().serializeToString(featureRequest)
      }).then(function (response) {
          return response.json();
      }).then(function (json) {
          //查询结果
          console.log(json);
          if (json.features && json.features.length > 0) {
              var gj = new GeoJSON();
              var features=gj.readFeatures(json);
          }
      })
    },
    getLayer:function(layername){
      let ls = sharkolapi.map.getLayers();
      return ls.getArray().find( l => {
        return l.get('name') == layername;
      } );
    },
    tools:{
      fullmap:()=>{
        sharkolapi.map.setView(sharkolapi.view);
      },
      //清除
      clear:()=>{
        sharkolapi.overlay.OLfea.getSource().clear();
        sharkolapi.tools.clearMeasure();
        sharkolapi.overlay.OLmodal.setPosition(undefined);
      },
      //清除measure  begin
      clearMeasure:()=>{
        sharkolapi.overlay.OLMeasure.getSource().clear();
        if(sharkolapi.draw!=null) sharkolapi.map.removeInteraction(sharkolapi.draw);
        $('.tooltip').remove();
      },
      //显示信息框
      showmodal:(feature,coord,callback)=>{
        sharkolapi.overlay.popdata = [];
        for(var k in feature.getProperties()){
          if(sharkolapi.overlay.popexcept.indexOf(k.toLowerCase()) < 0){
            var o = {};
            o.key = k;
            o.value = feature.getProperties()[k];
            sharkolapi.overlay.popdata.push(o);
          }
        }
        if(callback!=null) callback();
        // suc(sharkolapi.overlay.popdata);
        sharkolapi.overlay.OLmodal.setPosition(coord);  
      },
      //地图点击事件处理
      point:(callback)=>{
        sharkolapi.tools.clear();
        var highlight;
        var displayFeatureInfo = function(pixel,evt) {  
          sharkolapi.tools.clear();
          var feature = sharkolapi.map.forEachFeatureAtPixel(pixel, function(feature) {
            return feature;
          });
          if (feature  == null) return;          
          highlight = feature;
          sharkolapi.overlay.OLfea.getSource().addFeature(feature);   
          sharkolapi.tools.showmodal(feature,evt.coordinate,callback);
        };
        sharkolapi.map.on('singleclick', function(evt) {
          var pixel = sharkolapi.map.getEventPixel(evt.originalEvent);
          displayFeatureInfo(pixel,evt);
        });

      },
      //改变底图
      changebasemap:(basetype)=>{      
          let ls = sharkolapi.map.getLayers();
          ls.forEach( (l,i) => {
              if(l.get('type') == 'BaseMap'){
                  if(l.get('name').indexOf(basetype) > -1) l.setVisible(true);
                  else  l.setVisible(false);
              }
          } );
      },
      //地图量测
      measure:(t)=>{
        sharkolapi.tools.clear();
        function addInteraction(t) {
          var type = (t == 'area' ? 'Polygon' : 'LineString');
          sharkolapi.draw = new Draw({
            source: sharkolapi.overlay.OLMeasure.getSource(),
            type: type,
            style: new Style({
              fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)'
              }),
              stroke: new Stroke({
                color: 'rgba(255,140,0, 0.5)',
                lineDash: [10, 5],
                width: 2
              }),
              image: new Circle({
                radius: 5,
                stroke: new Stroke({
                  color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new Fill({
                  color: 'rgba(255, 255, 255, 0.2)'
                })
              })
            })
          });
          sharkolapi.map.addInteraction(sharkolapi.draw);
  
          // createMeasureTooltip();
          // createHelpTooltip();
  
          sharkolapi.draw.on('drawstart',
            function(evt) {
              // set sketch
              sketch = evt.feature;
  
              /** @type {module:ol/coordinate~Coordinate|undefined} */
              var tooltipCoord = evt.coordinate;
  
              listener = sketch.getGeometry().on('change', function(evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof Polygon) {
                  output = formatArea(geom);
                  tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof LineString) {
                  output = formatLength(geom);
                  tooltipCoord = geom.getLastCoordinate();
                }
                let measureTooltip = sharkolapi.map.getOverlayById('measureTooltip');
                let measureTooltipElement =  measureTooltip.getElement();
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
              });
            }, this);
  
            sharkolapi.draw.on('drawend',
            function() {
              let measureTooltip = sharkolapi.map.getOverlayById('measureTooltip');
              let measureTooltipElement =  measureTooltip.getElement();
              measureTooltipElement.className = 'tooltip tooltip-static';
              measureTooltip.setOffset([0, -7]);
              // unset sketch
              sketch = null;
              // unset tooltip so that a new one can be created
              measureTooltipElement = null;
              // createMeasureTooltip();
              unByKey(listener);
            }, this);
        }
    
        var sketch;
        // var continuePolygonMsg = '点击开始绘制面';
        // var continueLineMsg = '点击开始绘制线';
        var listener;

        /**
         * Format length output.
         * @param {module:ol/geom/LineString~LineString} line The line.
         * @return {string} The formatted length.
         */
        var formatLength = function(line) {
          var length = getLength(line);
          var output;
          if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
                ' ' + 'km';
          } else {
            output = (Math.round(length * 100) / 100) +
                ' ' + 'm';
          }
          return output;
        };


        /**
         * Format area output.
         * @param {module:ol/geom/Polygon~Polygon} polygon The polygon.
         * @return {string} Formatted area.
         */
        var formatArea = function(polygon) {
          var area = getArea(polygon);
          var output;
          if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
          } else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'm<sup>2</sup>';
          }
          return output;
        };
        
        addInteraction(t);
      },
      //地图要素绘制
      drawfeature:(t,suc)=>{
          sharkolapi.tools.clear();
          var type = (t == 'area' ? 'Polygon' : 'LineString');
          type = t;
          sharkolapi.draw = new Draw({
            source: sharkolapi.overlay.OLMeasure.getSource(),
            type: type,
            style: new Style({
              fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)'
              }),
              stroke: new Stroke({
                color: 'rgba(255,140,0, 0.5)',
                lineDash: [10, 5],
                width: 2
              }),
              image: new Circle({
                radius: 5,
                stroke: new Stroke({
                  color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new Fill({
                  color: 'rgba(255, 255, 255, 0.2)'
                })
              })
            })
          });
          sharkolapi.map.addInteraction(sharkolapi.draw);
          sharkolapi.draw.on('drawend',
            function(evt) {
              if(suc) suc(evt.feature);
              // console.log(evt);
            }, this);
      },
      //地图缓冲区分析
      buffer:(features,dis,suc)=>{
        require(['jsts'],function(jsts){
          var parser = new jsts.io.OL3Parser();
          parser.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon);
  
          for (var i = 0; i < features.length; i++) {
            var feature = features[i];
            // convert the OpenLayers geometry to a JSTS geometry
            var jstsGeom = parser.read(feature.getGeometry());
  
            // create a buffer of 40 meters around each line
            var buffered = jstsGeom.buffer(dis);
  
            // convert back from JSTS and replace the geometry on the feature
            if(suc!=null) suc(parser.write(buffered));
            // feature.setGeometry(parser.write(buffered));
          }
        });
      },
      //geometry转为feature
      geotofea:function(geo){
        return new Feature({
          geometry: geo
        });
      }      
    }
}
export default sharkolapi;