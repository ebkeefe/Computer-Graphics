// B = [  
// 0.05418656406430,
// -0.02911007808948,
// -0.00848709379851,
// -0.00851165645469,
// -0.00834990904936,
// 0.02245293253339,
// -0.0259633851291,
// 0.01624864962975,
// -0.00240879051584,
// 0.00674613682247,
// -0.00187763777362]

// A = [3.4784594855007,
// -6.36317777566148,
// 8.54751527471874, 
// -9.47693607801280, 
// 8.81498681370155,  
// -6.85401540936998, 
// 4.39470996079559,  
// -2.19611684890774, 
// 0.75104302451432,  
// -0.13149317958808 ]


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

// B = [

//    0.169994948147430,
//    0.280415310498794,
//   -1.120574766348363,
//    0.131562559965936,
//    0.974153561246036,
//   -0.282740857326553,
//   -0.152810756202003
// ];

// A =[

//    1.00000000000000000,
//   -2.12979364760736134,
//    0.42996125885751674,
//    1.62132698199721426,
//   -0.96669962900852902,
//    0.00121015844426781,
//    0.04400300696788968
//    ];

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


WIDTH = 10/8;
SPACING = 5/8;
LENGTH = 11;

function analyzer(){

}

window.onload = function() {
  var ctx = new AudioContext();
  var audio = document.getElementById('myAudio');

  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;
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
	 //setCanvasColor("rgb(0,0, 0)");
     ctx.clearRect(0, 0, c.width, c.height);
    //  var max = 0;
    //  for (var i = 0; i < frequencyData.length; i++){
    //   if (frequencyData[i]>max){
    //     max = frequencyData[i];
    //   }
    // }
    // console.log(max);
     
     for (var i = 0; i < frequencyData.length; i++){
        //equal loudness filter
       
        var max = Math.min(LENGTH, i);
        var value1 = 0;
        var value2 = 0;
        for (var j = 0; j < max; j++){
          if (j !=0){
            value2 += A[j]*answer[i-j];
              //console.log(value2);
          }
          value1 += B[j] * frequencyData[i-j];
        }
        answer[i] = value1 - value2;
        
        //console.log(answer[i]);
        //console.log(value2);

        //console.log(value1);
        
         //if (answer[i]  max){
          //     answer[i] = max;
          // }
       
     	
      //rect.clear();
     	ctx.beginPath();
     	ctx.rect(i*WIDTH + SPACING*i, c.height, WIDTH, -answer[i]);
     	//ctx.stokeStyle="#00FF00";
		ctx.stroke();
		ctx.closePath();


		
     }
  }
  audio.play();
  renderFrame();
};
