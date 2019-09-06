import _ from 'lodash';
import d3 from 'd3';
import echarts from 'echarts';
import 'echarts-gl';
import SimplexNoise from './simplex';
// import tracks from './csv/total_tracks.csv';
// import printMe from './print.js';

function component() {
  
  const element = document.createElement('div');
  element.setAttribute('id', "main");
  element.style.width = "1200px";
  element.style.height = "600px";  
  
  drawWind(element);
  
  // drawGraph(element);
  return element;
}

function drawWind (el) {
  var myChart = echarts.init(el);
  var noise = new SimplexNoise(Math.random);
  var noise2 = new SimplexNoise(Math.random);
  function generateData() {
      var data = [];
      for (var i = 0; i < 50; i++) {
          for (var j = 0; j < 50; j++) {
              var dx = noise.noise2D(i / 30, j / 30);
              var dy = noise2.noise2D(i / 30, j / 30);
              var mag = Math.sqrt(dx * dx + dy * dy);
              valMax = Math.max(valMax, mag);
              valMin = Math.min(valMin, mag);
              data.push([i, j, dx, dy]);
          }
      }
      return data;
  }

  var valMin = Infinity;
  var valMax = -Infinity;
  var data = generateData();
  
  myChart.setOption({
      visualMap: {
          show: false,
          min: valMin,
          max: valMax,
          dimension: 2,
          inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
      },
      xAxis: {
          type: 'value',
          axisLine: {
              lineStyle: {
                  color: '#ff0000'
              }
          },
          splitLine: {
              show: false,
              lineStyle: {
                  color: 'rgba(255,255,255,0.9)'
              }
          }
      },
      yAxis: {
          type: 'value',
          axisLine: {
              lineStyle: {
                  color: '#ff0000'
              }
          },
          splitLine: {
              show: false,
              lineStyle: {
                  color: 'rgba(255,255,0,0.9)'
              }
          }
      },
      series: [{
          type: 'flowGL',
          data: data,
          particleDensity: 64,
          particleSize: 5,
          itemStyle: {
              opacity: 0.5
          }
      }, 
      // {
      //     type: 'custom',
      //     data: data,
      //     encode: {
      //         x: 0,
      //         y: 0
      //     },
      //     renderItem: function (params, api) {
      //         var x = api.value(0), y = api.value(1), dx = api.value(2), dy = api.value(3);
      //         var start = api.coord([x - dx / 2, y - dy / 2]);
      //         var end = api.coord([x + dx / 2, y + dy / 2]);
      //         return {
      //             type: 'line',
      //             shape: {
      //                 x1: start[0], y1: start[1],
      //                 x2: end[0], y2: end[1]
      //             },
      //             style: {
      //                 lineWidth: 2,
      //                 stroke:'#fff',
      //                 opacity: 0.2
      //             }
      //         }
      //     }
      // }
    ]
  });
}

function drawGraph (element) {

  var myChart = echarts.init(element);  
  // specify chart configuration item and data
  var option = {
    title: {
        text: 'Flowing'
    },
    tooltip: {},
    legend: {
        data:['Sales']
    },
    xAxis: {
        data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
    },
    yAxis: {},
    series: [{
        name: 'Sales',
        type: 'line',
          effect: {
            show: true,
            trailWidth: 1,
            trailOpacity: 0.5,
            trailLength: 0.2,
            constantSpeed: 5
        },

        blendMode: 'lighter',

        lineStyle: {
            width: 0.2,
            opacity: 0.05
        },

        data: [5, 20, 36, 10, 10, 20]
    }]
  };

  // use configuration item and data specified to show chart
  myChart.setOption(option);
}

document.body.appendChild(component());
