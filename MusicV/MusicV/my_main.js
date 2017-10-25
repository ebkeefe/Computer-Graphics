window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

var myCanvas = document.getElementById('main_canvas');
var ctx = myCanvas.getContext('2d');
var j = 0;

window.onload = function() {
    var audioCtx = new AudioContext();
    var audio = document.getElementById('audio');
    var audioSrc = audioCtx.createMediaElementSource(audio);
    var analyser = audioCtx.createAnalyser();
    audio.volume = 1;
    // connect the MediaElementSource with analyser
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);
    
    // frequencyBinCount number of arrays we're getting of frequencyData
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    
    // we're ready to receive some data!
    // loop
    
    function renderFrame() {
        requestAnimationFrame(renderFrame);
        // update data in frequencyData
        analyser.getByteFrequencyData(frequencyData);
        
        //take average of all frequaency wave levels
        var fq = avg(frequencyData);
        
        //ctx.fillStyle = '#F0F8FF';
        //ctx.fillRect(0,0,1024,520);
        
        ctx.fillStyle = '#000000';
        
        j++;
        var max = 0;
        
        for (var i = 0; i<520;i++){
            ctx.fillStyle = colorize(frequencyData[i+100]);
            ctx.fillRect(j*2,520-i,2,1);
            if (frequencyData[i]>max){
                max = frequencyData[i];
            }
            
        }
        
        
    }
    audio.play();
    renderFrame();
/*
    document.getElementById("fButton").onclick = function(e){
    audio.play();
    renderFrame();
}
 */
};


 
function avg(data){
    var sum = 0;
    for (var i = 0; i<data.length;i++){
        sum +=data[i];
    }
    return Math.round(sum/data.length);
}

function colorize(data){
    var d2 = data * 99/(255);
    //var d2 = d1 * d1
    var d3 = parseInt(d2+"",10);
    var d4 = 99 - d3;
    //var d5 = parseInt((d4 / 2)+"",10);
    //if (d4<0) d4 = 0;
    return "#00" /*+ d4 + d4*/ + d4 + "00";
}

