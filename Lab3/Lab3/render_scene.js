//Eric Keefe and DJ Guiton Lab 3
//MAkes a robot

var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context
var vPosition;    // shader variable attrib location for vertices 
var vColor;       // shader variable attrib location for color
var uColor;       //  shader uniform variable for color
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix

var thetaY = -45;  // rotation around y axis
var viewMat;     // view matrix (will get to in Lab 4)

stack = new MatrixStack();

window.onload = function init()
{
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.7, 0.7, 0.7, 1.0);

    gl.enable(gl.DEPTH_TEST);

    shaderSetup();        // set up shaders

    Shapes.initShapes();  // create the primitive shapes 
    

    render();              // Go draw the scene!
};
/**
 *  Load shaders, attach shaders to program, obtain handles for 
 *  the attribute and uniform variables.
 * @return {undefined}
 */
function shaderSetup() {
    //  Load shaders
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // get handles for shader attribute variables. 
    // We will need these in setting up buffers.
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor");   // we won't use vertex here
                            // colors but we keep it in for possible use later.
    
    // get handles for shader uniform variables: 
    uColor = gl.getUniformLocation(program, "uColor");  // uniform color
    uProjection = gl.getUniformLocation(program, "uProjection"); // projection matrix
    uModel_view = gl.getUniformLocation(program, "uModel_view");  // model-view matrix
}

/**
 * Set the location and orientation of the camera. Compute 
 * the view and projection matrices, and set the value of the uniform
 * shader variable for the projection matrix.
 * @return {undefined}
 */
function cameraSetup() {
      // All of this is to get the camera set properly. We will 
    // learn about this in Lab 4
    //thetaY += 1.0;  // increase rotation about chosen axis
    var eye = vec3(0.0, 4.0, 8.0);  // location of camera
    var at = vec3(0, 0, 0);         // what the camera is looking at
    var up = vec3(0, 1, 0);         // the camera's up direction
    viewMat = lookAt(eye, at, up);  // view matrix
    var axisRot = rotateY(thetaY);  // rotation matrix for rotating around the y axis
    viewMat = mult(viewMat, axisRot); // combine the view matrix with rotation matrix
     
    // Calculate the projection matrix 
    var projMat = perspective(60, canvas.width / canvas.height, 0.1, 500.);
    // Set the value of the projection uniform variable in the shader
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat)); // set projection matrix
    
}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    cameraSetup();
    
    stack.clear();
    stack.multiply(viewMat); //stack is now viewmat
    stack.push();

    dog = [];

     //dog = new Robot(0, 0, 1, 1.0);
     //dog.draw();

    // stack.clear();
    // stack.multiply(viewMat); //stack is now viewmat
    // stack.push();

    // hog = new Robot(0, 0, 2, 0.2);
    // hog.draw();

    
    var counter = 0;
     
     for (var i = -5; i<5; i++){
          for (var j = -5 ; j<5; j++){
             dog.push(new Robot(i*2, 0, j*2, 0.4));
             stack.clear();
             stack.multiply(viewMat); //stack is now viewmat
             stack.push();
             //dog.draw();
             dog[counter].draw();
             counter++;
            
          }
     }

    
    
    
     

    requestAnimFrame(render);
    
}

