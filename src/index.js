import _ from 'lodash';
import * as d3 from 'd3';
import echarts from 'echarts';
// import tracks_data from './csv/total_tracks.csv';
import {Period60Min} from './events.js';
import {getRandomColors, getDateInfo, getDiffMins, ptInRect} from './util.js';

const period = 10;

//timeline buttons
function initPeriodButtonComponent() {  
  const button_60mins = document.createElement('BUTTON');
  button_60mins.innerHTML = "60 Mins";
  button_60mins.onclick = Period60Min;
  return button_60mins;
}

function flowChartComponent() {  
  const element = document.createElement('div');
  element.setAttribute('id', "main");
  element.style.width = "1200px";
  element.style.height = "600px";
  
  // drawFlow(element, data);
  
  return element;
}

function sliderComponent() {
  const element = document.createElement('div');
  element.setAttribute('id', "slider");
  element.style.width = "1200px";
  element.style.height = "60px";

  var svg = d3.select("#slider")
      .append("svg")
      .attr("width", element.style.width)
      .attr("height", element.style.height);

  return element;
}

function formatData(data) {
  data.shift(); //remove field row
  data.sort((a, b) => Number(a[1]) - Number(b[1]));

  var maxX = Math.round(d3.max(data.map(d => +d[3]))/100) * 100,
      maxY = Math.round(d3.max(data.map(d => +d[4]))/100) * 100;
  
  var cellInfo = [],
      rectCount = 5,//rect counts of x, y coords
      stepX = maxX/rectCount, stepY = maxY/rectCount;

  var cell = {}, rect;
  for(var i = 0; i < rectCount; i++){
    for(var j = 0; j < rectCount; j++){
      rect = {
        x: i * stepX, 
        y: j * stepY, 
        width: stepX,
        height: stepY
      };
      cell = {
        xi: i,
        yi: j,
        data: []
      }
      for(var k = 0; k < data.length; k++){
        if(ptInRect(data[k][3], data[k][4], rect)){
          cell.data.push(data[k]);
        }
      }
      cellInfo.push(cell);
    }
  }  

  console.log(cellInfo)
  // var startMs = nestedTimestamps[0].key, 
  //     endMs = nestedTimestamps[nestedTimestamps.length - 1].key,
  //     startDate = getDateInfo(startMs),
  //     endDate = getDateInfo(endMs),
  //     duration = getDiffMins(endMs, startMs);

  // console.log(startDate, endDate, duration);  
  
  // var colors = getRandomColors(nestedIDs.length);
  

  // nestedIDs.forEach((nID, index) => {
  //   dly = 0;
  //   eachIds = [];
  //   for(var i = 0; i < nID.values.length - 1; i++){
  //     if(nID.values[i + 1][3] !== nID.values[i][3] || nID.values[i + 1][4] !== nID.values[i][4]){
  //       eachIds.push({
  //         period: diff,
  //         delay: dly,
  //         x: +nID.values[i][3],//x
  //         y: +nID.values[i][4] //y
  //       });
  //     }
  //     diff = Number(nID.values[i + 1][1]) - Number(nID.values[i][1]);//timestamp
  //     dly += diff;
  //   }
  //   formatedData.push({
  //     uid: nID.key,
  //     color: colors[index],
  //     pts: eachIds
  //   })
  // })
  // console.log(formatedData)
  // return formatedData;
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

document.body.appendChild(initPeriodButtonComponent());
document.body.appendChild(flowChartComponent());
document.body.appendChild(sliderComponent());
