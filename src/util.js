
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
  