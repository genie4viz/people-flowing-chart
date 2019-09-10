import _ from 'lodash';
import * as d3 from 'd3';

import {onStart, uploadFile} from './events.js';

function addFileComponent() {
  const file_el = document.createElement('input');
  file_el.setAttribute('type', 'file');
  file_el.setAttribute('id', 'track_file');  
  file_el.onchange = uploadFile;
  return file_el;
}
//timeline buttons
function addPeriodComponent() {

  const periodWrapper = document.createElement('div');
  periodWrapper.setAttribute('id', 'periodWrapper');
  periodWrapper.style.visibility = 'hidden';

  const editPeriod = document.createElement('input');
  editPeriod.setAttribute("id", "period_txt");
  editPeriod.setAttribute("value", 20);
  editPeriod.style.width = "60px";  
  
  const button_60mins = document.createElement('BUTTON');
  button_60mins.innerHTML = "Start(mins)";
  button_60mins.onclick = onStart;

  // const button_total = document.createElement('BUTTON');
  // button_total.innerHTML = "Total Mins";
  // button_total.onclick = periodTotal;

  periodWrapper.appendChild(editPeriod);
  periodWrapper.appendChild(button_60mins);
  // periodWrapper.appendChild(button_total);
  return periodWrapper;
}

function addFlowChartComponent() {  
  const element = document.createElement('div');
  element.setAttribute('id', "main");
  element.style.width = "1200px";
  element.style.height = "600px";
  element.style.visibility = 'hidden';
  
  return element;
}

function addSliderComponent() {
  const element = document.createElement('div');
  element.setAttribute('id', "slider");
  element.style.width = "1200px";
  element.style.height = "60px";
  element.style.visibility = 'hidden';
  var svg = d3.select("#slider")
      .append("svg")
      .attr("width", element.style.width)
      .attr("height", element.style.height);

  return element;
}


document.body.appendChild(addFileComponent());
document.body.appendChild(addPeriodComponent());
document.body.appendChild(addFlowChartComponent());
document.body.appendChild(addSliderComponent());
