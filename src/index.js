import _ from 'lodash';
import d3 from 'd3';
import echarts from 'echarts';
import tracks from './csv/tracks.csv';
// import printMe from './print.js';

function component() {
  
  const element = document.createElement('div');
  element.setAttribute('id', "main");
  element.style.width = "1200px";
  element.style.height = "600px";  
  
  drawFlow(element, formatData(tracks));  
  
  return element;
}

function formatData(data) {
  data.shift();
  data.forEach((d, i) => {
      d[3] = +d[3];
      d[4] = +d[4];
  });  
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
        value: [500, 500] //like as x, y axis max values
      }
    ],
    z: 1,
  }];

  for(var i = 0; i < data.length - 1; i++ ){    
    series.push({
      // name: 'A',
      type: 'lines',
      coordinateSystem: 'cartesian2d',
      effect: {
          show: true,
          period: 1, //second
          delay: i * 1  * 1000, //milisecond
          // symbol: "arrow",
          trailLength: 0.8,
          color: 'rgba(55,155,255,0.8)',
          symbolSize: 5,
          loop: false
      },
      lineStyle: {
        width: 0
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
