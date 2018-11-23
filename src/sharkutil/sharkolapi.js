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
import XYZ from "ol/source/XYZ";
import {transform} from 'ol/proj.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Overlay from 'ol/Overlay.js';
import {getArea, getLength} from 'ol/sphere.js';
import {LineString, Polygon} from 'ol/geom.js';
import {unByKey} from 'ol/Observable.js';
import Draw from 'ol/interaction/Draw.js';
import {Fill, Stroke, Style,Circle,Text} from 'ol/style.js';
import sharkstyles from './sharkstyles';
import $ from 'jquery';
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
      //弹出数据过滤
      popexcept:['geometry','objectid','shape_area','shape_length','shape_leng','wkt'],
      //弹出数据
      popdata:[],
    },
    //map对象
    map:{},
    //初始化
    init:function(){
      var highlightStyle = sharkstyles.setStyle('polygon','#4682B4','rgba(255,0,0,0.6)') ;

      sharkolapi.overlay.OLfea = new VectorLayer({
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

      
        /**
         * Creates a new help tooltip
         */
        // function createHelpTooltip() {
        // let helpTooltipElement;
        // let helpTooltip;
        // if (helpTooltipElement) {
        //   helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        // }
        // helpTooltipElement = document.createElement('div');
        // helpTooltipElement.className = 'tooltip hidden';
        // helpTooltip = new Overlay({
        //   element: helpTooltipElement,
        //   offset: [15, 0],
        //   positioning: 'center-left',
        //   id:'helpTooltip'
        // });
        // sharkolapi.map.addOverlay(helpTooltip);
        // }

        /**
         * Creates a new measure tooltip
         */
        // function createMeasureTooltip() {
          
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
        // }

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
    //查询
    query:function(){

    },
    getLayer:function(layername){
      let ls = sharkolapi.map.getLayers();
      return ls.getArray().find( l => {
        return l.get('name') == layername;
      } );
    },
    tools:{
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
      
    }
}
export default sharkolapi;