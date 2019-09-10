import papa from 'papaparse';
import {formatData, getPartialData} from './util.js';
import {drawFlow, createFlowGraph} from './visualization.js';

export var tracks = [];
export function onStart(){
    var period = document.getElementById('period_txt').value;    
    var graph_data = getPartialData(tracks, period);
    
    var graph_el = document.getElementById('main');
    graph_el.style.visibility = 'visible';
    drawFlow(graph_data);
};

export function uploadFile(e) {
    var file = e.target.files[0];
    papa.parse(file, {
        worker: true,
        // step: function(results) {
        //   console.log("Row:", results.data);
        // },
        complete: function(results) {            
            tracks = formatData(results.data);
            document.getElementById('periodWrapper').style.visibility = 'visible';
            createFlowGraph(document.getElementById('main'), {x: 300, y: 200});
        }
    });
}