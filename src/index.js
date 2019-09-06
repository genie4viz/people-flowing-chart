import _ from 'lodash';
import d3 from 'd3';
import tracks from './csv/total_tracks.csv';
// import printMe from './print.js';

function component() {
  
  const element = document.createElement('div');
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  // const btn = document.createElement('button');
  // btn.innerHTML = 'Click me and check the console!';
  // btn.onclick = printMe;

  // element.appendChild(btn);

  initData(tracks);

  return element;
}

function initData(data) {
    console.log(data)
}


document.body.appendChild(component());
