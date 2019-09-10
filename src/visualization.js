import echarts from 'echarts';
import { getRandomInt } from './util';

var myChart;

export function createFlowGraph(el, limit) {
    console.log('create graph')
    myChart = echarts.init(el);
    var seriesBase = [{
        type: 'graph',
        coordinateSystem: 'cartesian2d',
        symbolSize: 0,
        data: [
          {
            value: [limit.x, limit.y] //like as x, y axis max values
          }
        ],
        z: 1,
    }];

    var option = {
        xAxis: { 
            type: 'value',            
        },
        yAxis: {
            type: 'value'
        },
      series: seriesBase
    };  
    
    myChart.setOption(option);
    
}

export function drawFlow(graph) {    
    console.log('update graph')
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
        for(var k = 0; k < graph.data[i].length; k++){
            series.push({
                name: graph.data[i][k].key,
                type: 'lines',
                coordinateSystem: 'cartesian2d',
                effect: {
                    show: true,
                    period: 6,
                    delay: i * 6000,
                    symbol: "arrow",
                    trailLength: 0.3,
                    color: '#0000FF', //transparent
                    symbolSize: 2,
                    loop: false
                },
                lineStyle: {
                    width: 0,
                    curveness: 0
                },
                data: [
                    [
                        {
                            coord: graph.data[i][k].from
                        }, {
                            coord: graph.data[i][k].to
                        }
                    ]
                ],
                z: 2
            }); 
        }    
    }
        
    var option = {
        xAxis: { 
            type: 'value',            
        },
        yAxis: {
            type: 'value'
        },
      series: [...seriesBase, ...series]
    };  
    
    myChart.setOption(option);
  }