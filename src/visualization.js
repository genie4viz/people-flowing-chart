import echarts from 'echarts';
import { getRandomInt } from './util';

export function drawFlow(el, graph) {
    
    var myChart = echarts.init(el);
    var seriesBase = [{
      type: 'graph',
      coordinateSystem: 'cartesian2d',
      symbolSize: 0,
      data: [
        {
          value: [graph.limit.x, graph.limit.y] //like as x, y axis max values
        }
      ],
      z: 1,
    }];
    var series = [];
    for(var i = 0; i < graph.data.length; i++){
        
        series.push({
          name: graph.data[i].key,
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          effect: {
                show: true,
                period: getRandomInt(3, 10),
                delay: getRandomInt(1, 10),
                symbol: "arrow",
                trailLength: 0.3,
                color: '#888', //transparent
                symbolSize: 3,
                loop: true
          },
          lineStyle: {
            width: 0,
            curveness: 0.3
          },
          data: [
            [
              {
                coord: graph.data[i].from
              }, {
                coord: graph.data[i].to
              }
            ]
          ],
          z: 2
        });      
    }
    
    var option = {
      xAxis: { type: 'value' },
      yAxis: { type: 'value' },
      series: [...seriesBase, ...series]
    };  
    
    myChart.setOption(option);
    
  }