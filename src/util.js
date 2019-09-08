
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

export function ptInRect(x, y, rect){
    return rect.x <= +x && +x <= rect.x + rect.width && rect.y <= +y && +y <= rect.y + rect.height;
} 