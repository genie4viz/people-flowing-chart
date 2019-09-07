import _ from 'lodash';
import * as d3 from 'd3';
import echarts from 'echarts';
import tracks from './csv/tracks.csv';
// import printMe from './print.js';

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
  data.shift();
  data.forEach((d, i) => {
      d[1] = +d[1];
      d[3] = +d[3];
      d[4] = +d[4];
  });
  
  data.sort((a, b) => a[1] - b[1]);
  // var nestedTimestamp = d3.nest()
  //   .key(d => d[1])
  //   .entries(data);
  
  // console.log(nestedTimestamp)
  return data;
}

function drawFlow(el, data) {
  
  var myChart = echarts.init(el);
  var series = [{
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

  for(var i = 0; i < data.length - 1; i++ ){
    if(data[i][2] === "1"){
      series.push({
        // name: 'A',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        effect: {
            show: true,
            period: 2, //second
            delay: i * 2  * 1000, //milisecond
            // symbol: "arrow",
            trailLength: 0.8,
            color: 'rgba(55,155,255,0.8)',
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
              coord: [data[i][3], data[i][4]]
            }, {
              coord: [data[i + 1][3], data[i + 1][4]]
            }
          ]
        ],
        z: 2
      });
    } else {
      series.push({
        // name: 'A',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        effect: {
            show: true,
            period: 3, //second
            delay: i * 3  * 1000, //milisecond
            // symbol: "arrow",
            trailLength: 0.8,
            color: 'rgba(155,55,255,0.8)',
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
              coord: [data[i][3], data[i][4]]
            }, {
              coord: [data[i + 1][3], data[i + 1][4]]
            }
          ]
        ],
        z: 2
      });
    }
  }  
  var option = {
    xAxis: {
        // show: false,
        type: 'value'
    },
    yAxis: {
        // show: false,
        type: 'value'
    },
    series: series
  };  
  
  myChart.setOption(option);
  
}

document.body.appendChild(component());
