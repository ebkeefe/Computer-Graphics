/**
 *  Create a new MouseState object
 */
var mouseState = new MouseState(); // create MouseState object
var canvas;
var rect;

/**
 * Define the MouseState class
 * @return {MouseState}
 */
function MouseState() {
    this.down = false;
    this.x = 0;
    this.y = 0;
    this.action = 3; // 3 indicates no action
};

/**
 * Generate String message containing information about the Mouse actions
 * @return {String|message}
 */
MouseState.prototype.displayMouseState = function () {
    message = "<br>Mouse state: " +
            "<br>x = " + mouseState.x +
            "<br>y = " + mouseState.y +
            "<br>canvas left = " + rect.left +
            "<br>canvas top = " + rect.top +
            "<br>action = " + mouseState.action +
            "<br>down = " + mouseState.down;
    return message;
};

/**
 * Upon loading the window, get handles for the canvas, add mouse listeners
 * @return {undefined}
 */
window.onload = function init()
{
    // get handle to canvas
    canvas = document.getElementById("gl-canvas");
    rect = canvas.getBoundingClientRect();
    // set canvas design
    setCanvasColor("rgb(200,250,250)");

    // Add mouse listeners to the canvas
    canvas.addEventListener("mousedown", function (event) {
        mouseState.x = event.clientX - rect.left;
        mouseState.y = event.clientY - rect.top;
        mouseState.down = true;
        mouseState.action = event.button;
        document.getElementById("mouseState").innerHTML = "<br>Mouse down<br>" +
                mouseState.displayMouseState();
    });

    canvas.addEventListener("mouseup", function (event) {
        mouseState.x = event.clientX - rect.left;
        mouseState.y = event.clientY - rect.top;
        mouseState.down = false;
        mouseState.action = event.button;
        document.getElementById("mouseState").innerHTML = "<br>Mouse up<br>" +
                mouseState.displayMouseState();
    });

    canvas.addEventListener("mousemove", function (event) {
        if (mouseState.down) {
            mouseState.x = event.clientX - rect.left;
            mouseState.y = event.clientY - rect.top;
            mouseState.down = true;
            mouseState.action = event.button;
        }
        document.getElementById("mouseState").innerHTML = "<br>Mouse move<br>" +
                mouseState.displayMouseState();
        ;
    });

    // Add key press listener to window
    window.onkeydown = function (event) {
        var c = String.fromCharCode(event.keyCode);
        document.getElementById("keypressResult").innerHTML = c;
    };
};

/**
 * Set the style of the canvas
 * @param {type} color background color of the canvas
 * @return {undefined}
 */
function setCanvasColor(color) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Hello World", 10, 50);
}