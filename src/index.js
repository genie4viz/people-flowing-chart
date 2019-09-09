import _ from 'lodash';
import * as d3 from 'd3';

import {period60Min, periodTotal, uploadFile} from './events.js';

const period = 10;

function addFileComponent() {
  const file_el = document.createElement('input');
  file_el.setAttribute('type', 'file');
  file_el.setAttribute('id', 'track_file');
  file_el.onchange = uploadFile;
  return file_el;
}
//timeline buttons
function addPeriodButtonComponent() {
  const buttonWrapper = document.createElement('div');
  buttonWrapper.setAttribute('id', 'buttonWrapper');
  buttonWrapper.style.visibility = 'hidden';
  
  const button_60mins = document.createElement('BUTTON');
  button_60mins.innerHTML = "60 Mins";
  button_60mins.onclick = period60Min;

  const button_total = document.createElement('BUTTON');
  button_total.innerHTML = "Total Mins";
  button_total.onclick = periodTotal;

  buttonWrapper.appendChild(button_60mins);
  buttonWrapper.appendChild(button_total);
  return buttonWrapper;
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
document.body.appendChild(addPeriodButtonComponent());
document.body.appendChild(addFlowChartComponent());
document.body.appendChild(addSliderComponent());
