import _ from 'lodash';
import * as d3 from 'd3';
import echarts from 'echarts';
import tracks from './csv/tracks.csv';
import {getRandomColors} from './util.js';

function component() {
  
  const element = document.createElement('div');
  element.setAttribute('id', "main");
  element.style.width = "1200px";
  element.style.height = "600px";  

  var data = formatData(tracks);  
  drawFlow(element, data);
  
  return element;
}

function formatData(data) {
  data.shift(); //remove field row
  data.sort((a, b) => Number(a[1]) - Number(b[1]));

  var nestedIDs = d3.nest()
    .key(d => d[2])//ID
    .entries(data)
  
  var colors = getRandomColors(nestedIDs.length);
  var formatedData = [], eachIds = [], dly = 0, diff = 1;

  nestedIDs.forEach((nID, index) => {
    dly = 0;
    eachIds = [];
    for(var i = 0; i < nID.values.length - 1; i++){
      if(nID.values[i + 1][3] !== nID.values[i][3] || nID.values[i + 1][4] !== nID.values[i][4]){
        eachIds.push({
          period: diff,
          delay: dly,
          x: +nID.values[i][3],//x
          y: +nID.values[i][4] //y
        });
      }
      diff = Number(nID.values[i + 1][1]) - Number(nID.values[i][1]);//timestamp
      dly += diff;
    }
    formatedData.push({
      uid: nID.key,
      color: colors[index],
      pts: eachIds
    })
  })
  console.log(formatedData)
  return formatedData;
}


function drawFlow(el, data) {
  
  var myChart = echarts.init(el);
  var seriesBase = [{
    type: 'graph',
    coordinateSystem: 'cartesian2d',
    symbolSize: 0,
    data: [
      {
        value: [300, 300] //like as x, y axis max values
      }
    ],
    z: 1,
  }];
  var series = [];
  for(var i = 0; i < data.length; i++){
    for(var k = 0; k < data[i].pts.length - 1; k++){
      series.push({
        name: data[i].uid,
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        effect: {
            show: true,
            period: 2,//data[i].pts[k].period / 1000, //second
            delay: k * 2000,//data[i].pts[k].delay, //milisecond
            // symbol: "arrow",
            trailLength: 0.8,
            color: data[i].color, //transparent
            symbolSize: 5,
            loop: false
        },
        lineStyle: {
          width: 0,
          curveness: 0.3
        },
        data: [
          [
            {
              coord: [data[i].pts[k].x, data[i].pts[k].y]
            }, {
              coord: [data[i].pts[k + 1].x, data[i].pts[k + 1].y]
            }
          ]
        ],
        z: 2
      });
    }    
  }
  
  var option = {
    xAxis: { type: 'value' },
    yAxis: { type: 'value' },
    series: [...seriesBase, ...series]
  };  
  
  myChart.setOption(option);
  
}

document.body.appendChild(component());
