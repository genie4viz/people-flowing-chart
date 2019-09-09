import papa from 'papaparse';
import {formatData, getPartialData} from './util.js';
import {drawFlow} from './visualization.js';

export var tracks = [];
export function period60Min(){    
    var graph_data = getPartialData(tracks, 60);
    document.getElementById('main').style.visibility = 'visible';
    // document.getElementById('slider').style.visibility = 'visible';
    drawFlow(document.getElementById('main'), graph_data);
};

export function periodTotal(){
    tracks = getPartialData(tracks);
    drawFlow(document.getElementById("main"), tracks, )
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
            document.getElementById('buttonWrapper').style.visibility = 'visible';            
        }
    });
}