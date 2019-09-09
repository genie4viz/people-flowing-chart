import * as d3 from 'd3';

export function getRandomColors(count) {  
    var colors = [];
    for (var i = 0; i < count; i++) {
        colors.push(randomColor());
    }
    return colors;
}

function randomColor() {
    return '#' + parseInt(Math.random() * 0xffffff).toString(16)
}
  
export function getDateInfo(strDate) {
    var newDate = new Date(+strDate);
    return {
        year: newDate.getYear(),
        month: newDate.getMonth() + 1,
        day: newDate.getDate(),
        hour: newDate.getHours(),
        min: newDate.getMinutes(),
        sec: newDate.getSeconds()
    }
}

export function getDiffMins(strEndDate, strStartDate) {
    var startDate = new Date(+strStartDate),
        endDate = new Date(+strEndDate);
    
    var diff = Math.round((endDate - startDate) / (1000 * 60));
    return diff
}

function ptInRect(x, y, rect){
    return rect.x <= +x && +x < rect.x + rect.width && rect.y <= +y && +y < rect.y + rect.height;
} 

export function formatData(data) {
    data.shift(); //remove field row
    data.sort((a, b) => Number(a[1]) - Number(b[1]));    
    return data;
}

export function getLimits (data){ 
    return {
        x: Math.round(d3.max(data.map(d => +d[3]))/100) * 100,
        y: Math.round(d3.max(data.map(d => +d[4]))/100) * 100
    }
}

export function getPartialData(data, period = 0) {//period unit is minute
    var partial = [];

    if(period === 0) { //all data
        partial = data;
    }else{
        var from = +data[0][1], to = +data[data.length - 1][1];        
        partial = data.filter(d => +d[1] >= from && +d[1] <= from + period * 60 * 1000);              
    }
    return {
        data: getCellData(partial),
        limit: getLimits(data)
    }
}

export function getCellData(data) {

    var limit = getLimits(data);
    var cellInfo = [],
        rectCountX = 6, rectCountY = 4,//rect counts of x, y coords
        stepX = limit.x/rectCountX, stepY = limit.y/rectCountY;
  
    var cell = {}, rect;
    for(var i = 0; i < rectCountX; i++){
      for(var j = 0; j < rectCountY; j++){
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

    //get only represent flow data
    var counts_arr = [], spt;
    cellInfo.forEach(cell => {        
        if(cell.data.length > 1){            
            var counts = {};
            cell.data.forEach(d => {
                var key = d[0] + ":" + d[2];
                counts[key] = (counts[key] || 0) + 1;
            });
            
            for(var i in counts){
                if(counts[i] > 2){
                    spt = i.split(":");
                    var fil = cell.data.filter(d => spt[0] === d[0] && spt[1] === d[2]);

                    var sx = +fil[0][3],
                        sy = +fil[0][4],
                        ex = +fil[fil.length - 1][3],
                        ey = +fil[fil.length - 1][4];
                    
                    counts_arr.push({
                        key: i,
                        from: [sx, sy],
                        to: [ex, ey]
                    });
                }
            }            
        }        
    });

    // console.log(cellInfo, 'reduces')
    return counts_arr;
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}