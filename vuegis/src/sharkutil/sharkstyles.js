/**
 * 作者：shark
 * 功能：用ol操作样式的文件
 * 使用说明：使用vue，必须加载ol
 * 创建时间：2018.11.12
 */

import {Fill, Stroke, Style,Circle,Text} from 'ol/style.js';

var sharkstyles = {
    setStyle:(type = 'point',stroke='rgb(0, 0, 100)',fill='rgba(0, 0, 100,0.1)',w=1)=>{
        let mstyle = {};
        if(type == 'point'){
            mstyle = new Style({        
                image: new Circle({
                    radius: 5,
                    fill: new Fill({
                        color: fill
                    }),
                    stroke: new Stroke({
                        color: stroke,
                        width: w
                    }),
                })
            });
        }
        else if(type == 'linestring'){
            mstyle = new Style({
                fill: new Fill({
                    color: stroke
                })
            });
        }
        else{
            mstyle = new Style({ 
                fill: new Fill({
                    color: fill
                }),
                stroke: new Stroke({
                    color: stroke,
                    width: w
                }),
                image: new Circle({
                    radius: 5,
                    fill: new Fill({
                        color: fill
                    }),
                    stroke: new Stroke({
                        color: stroke,
                        width: w
                    }),
                })
            });
        }
        return mstyle;
    }
};

export  default sharkstyles;