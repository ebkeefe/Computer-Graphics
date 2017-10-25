SPACING = 4;
LENGTH = 11;

A = [

   1.00000000000000,
  -2.37898834973084,
   2.84868151156327,
  -2.64577170229825,
   2.23697657451713,
  -1.67148153367602,
   1.00595954808547,
  -0.45953458054983,
   0.16378164858596,
  -0.05032077717131,
   0.02347897407020
];

B =[

   0.15457299681924,
  -0.09331049056315,
  -0.06247880153653,
   0.02163541888798,
  -0.05588393329856,
   0.04781476674921,
   0.00222312597743,
   0.03174092540049,
  -0.01390589421898,
   0.00651420667831,
  -0.00881362733839
];

function analyzer2(){

}

window.onload = function() {
  
  var ctx = new AudioContext();
  var audio = document.getElementById('myAudio');

  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();
  analyser.fftSize = 128;
  audio.volume = 1;
		
  // we have to connect the MediaElementSource with the analyser 
  audioSrc.connect(analyser);
   audioSrc.connect(ctx.destination);
  // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
 
  // frequencyBinCount tells you how many values you'll receive from the analyser
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  var answer = new Uint8Array(analyser.frequencyBinCount);
 
  // we're ready to receive some data!
  // loop
  function renderFrame() {

     requestAnimationFrame(renderFrame);
     // update data in frequencyData
     analyser.getByteFrequencyData(frequencyData);
     // render frame based on values in frequencyData

     //console.log(frequencyData)

     var c = document.getElementById("mainCanvas");
	   var ctx=c.getContext("2d");

     ctx.clearRect(0, 0, c.width, c.height);
     
     ctx.fillStyle= "black";
     ctx.beginPath();
     ctx.rect(0, 0, c.width, c.height);
     ctx.fill();
     ctx.closePath();
     
     //setCanvasColor("rgb(0,0, 0)");

	for (var i = 0; i < frequencyData.length; i++){
     	//rect.clear();
  		//equal loudness filter
  		var max = Math.min(LENGTH, i);
        var value1 = 0;
        var value2 = 0;
        for (var j = 0; j < max; j++){
          if (j !=0){
            value2 += A[j]*answer[i-j];
            console.log(valu2);
          }
          value1 += B[j] * frequencyData[i-j];
        }
        answer[i] = value1 - value2;
       



	    ctx.beginPath();

	    ctx.arc(c.width/2,c.height/2,frequencyData.length * SPACING - i*SPACING,0,2*Math.PI);
	    ctx.lineWidth = answer[i]/150;
	    ctx.strokeStyle="#007500";
	    ctx.stroke();
	    ctx.closePath();

		
     }
  }
  audio.play();
  renderFrame();
};
