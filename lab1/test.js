function myFunc(){
	document.getElementById("demo").innerHTML = "My First JavaScript";
}

var myLocation = {
	city: "San Diego",
	state: "Cal",
	bird: null,		//undefined -it is defined later
	capitol: { name: "Dallas"}
}

function Location(city, state){
	this.city = city;
	this.state = state;
}




window.onload = function init() {
	myFunc();

	var x = 5;
	c = 23;
}