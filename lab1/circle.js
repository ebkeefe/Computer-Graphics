//Eric Keefe lab1
//this script allows the user to draw circles


var canvas;
var rect;

function Circle(xPos, yPos, rad, fill, clear){
	this.x = xPos;
	this.y = yPos;
	this.radius = rad;
	this.fillStyle = fill;
	this.isClear = clear;
}

var circles = [];


window.onload = function init(){
	canvas = document.getElementById("circle-canvas");
	rect = canvas.getBoundingClientRect();
	context = canvas.getContext("2d");

	setCanvasColor("rgb(200,250,250)");

	canvas.addEventListener("mousedown", function (event) {
        var circX = event.clientX - rect.left;
		var circY = event.clientY - rect.top;
		var radius = Math.floor(Math.random() * 20);

		var circ = new Circle(circX, circY, radius, "white", true);
		circles.push(circ);
        circ.displayCircle();    
        circ.displayInfo();
        
    });

}

function setCanvasColor(color) {
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
    //context.fillStyle = "black";
    //context.font = "30px Arial";
   
}

Circle.prototype.displayCircle = function(){
    
	context.beginPath();
	
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    context.fillStyle = this.fillStyle;
    if (this.isClear){
    	context.stroke()
    }else{
    	context.fill();
    }
    
}

Circle.prototype.displayInfo = function(){
	var info = "location: " + "(" + this.x.toString() + ", " + this.y.toString() + ") " + "radius: " + this.radius.toString();	
	document.getElementById("circle-Info").innerHTML = info;
}

window.oncontextmenu = function ()
{
   
	
	for (var i = 0; i < circles.length; i++) {
	   
	   var color1 = Math.floor(Math.random() * 255).toString();
	   var color2 = Math.floor(Math.random() * 255).toString();
	   var color3 = Math.floor(Math.random() * 255).toString();
	   var theFill = "rgb(" + color1 + "," + color2 + "," + color3 + ")";
	   var circle = new Circle(circles[i].x, circles[i].y, circles[i].radius, theFill, false);
	   circle.displayCircle();
	}
    
}


