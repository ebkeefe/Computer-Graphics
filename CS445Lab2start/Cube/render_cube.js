var canvas;
var gl;

var axis = 1;
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var theta = [0, 0, 0];

var cube;

var vPosition;  // handle for attribute variable in shader for the vertex position
var vColor;  // handle for attribute variable in shader for the color
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix

window.onload = function init()
{
    // get the handle for the html5 canvas
    canvas = document.getElementById("gl-canvas");

    // setup and get handle for the webgl rendering context
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Test for what is in front of what. Uncomment this out to see what happens!
    gl.enable(gl.DEPTH_TEST);
  
    shaderSetup();  
    
    createCube();
    
    createWindowListeners();
    
    render();
};

function shaderSetup() {
    //  Load shaders 
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Get handles for shader variables vPosition and vColor
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor");
    uProjection = gl.getUniformLocation(program, "uProjection");
    uModel_view = gl.getUniformLocation(program, "uModel_view");
};

function createCube() {
    cube = new Cube(); // create cube
    //
    // Initialize and load vertex array attribute buffer
    cube.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(cube.vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // done with this buffer

    // Initialize and load color array attribute buffer
    cube.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(cube.colors), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // done with this buffer

}

function createWindowListeners() {
    //event listeners for buttons
    document.getElementById("xButton").onclick = function () {
        axis = xAxis;
    };
    document.getElementById("yButton").onclick = function () {
        axis = yAxis;
    };
    document.getElementById("zButton").onclick = function () {
        axis = zAxis;
    }; 
};

function cameraSetup() {
      // All of this is to get the camera set properly. We will 
    // learn about this in Lab 4
    theta[axis] += 1.0;  // increase rotation about chosen axis
    var eye = vec3(0.0, 0.0, 2.0);
    var at = vec3(0, 0, 0);
    var up = vec3(0, 1, 0);
    var viewMat = lookAt(eye, at, up);
    var axisRot = mult(mult(rotateZ(theta[2]), rotateY(theta[1]) ), rotateX(theta[0]));
    viewMat = mult(viewMat, axisRot);
    viewMat = mult(viewMat, scalem(.5,.5,.5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(viewMat));
    
    var projMat = perspective(60, canvas.width / canvas.height, 0.1, 500.);
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));      
};

function drawCube() {
     // Enable vertex buffer and associate it with shader variable vPosition 
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexBuffer);
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    // Enable color buffer and associate it with shader variable vColor 
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.colorBuffer);
    gl.enableVertexAttribArray(vColor);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    // Finally! We can draw the triangles to the screen.
    gl.drawArrays(gl.TRIANGLES, 0, 3 * cube.numTriangles);

    gl.disableVertexAttribArray(vPosition);
    gl.disableVertexAttribArray(vColor);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    cameraSetup();
    
    drawCube();

    requestAnimFrame(render);
};


