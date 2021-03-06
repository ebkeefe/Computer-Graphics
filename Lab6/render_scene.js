//Carlos Luevanos and Eric Keefe
//Lab 4: Camera Navigation



var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context
var vPosition;    // shader variable attrib location for vertices 
var vColor;       // shader variable attrib location for color
var vNormal;	  // shader variable attrib normals for vertices
var uColor;       // shader uniform variable location for color
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix

var camera = new Camera(); 
var stack = new MatrixStack();

var lighting = new Lighting();
var program;

window.onload = function init()
{   
    //set Event Handlers
    setKeyEventHandler();
    setMouseEventHandler();
    
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0.309, 0.505, 0.74, 1.0);
    
    gl.enable(gl.DEPTH_TEST);

    //  Load shaders
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    lighting.setUp();
    
    shaderSetup();
    
    Shapes.initShapes();  // create the primitive and other shapes       
    
    render();
};

/**
 *  Load shaders, attach shaders to program, obtain handles for 
 *  the attribute and uniform variables.
 * @return {undefined}
 */
function shaderSetup() {
    //  Load shaders
    // var program = initShaders(gl, "vertex-shader", "fragment-shader");
    // gl.useProgram(program);

    // get handles for shader attribute variables. 
    // We will need these in setting up buffers.
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor"); // we won't use vertex here
    vNormal = gl.getAttribLocation(program, "vNormal");
                          // colors but we keep it in for possible use later.
   
    // get handles for shader uniform variables: 
    uColor = gl.getUniformLocation(program, "uColor");  // uniform color
    uProjection = gl.getUniformLocation(program, "uProjection"); // projection matrix
    uModel_view = gl.getUniformLocation(program, "uModel_view");  // model-view matrix
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projMat = camera.calcProjectionMat();   // Projection matrix  
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));
    
    var viewMat = camera.calcViewMat();   // View matrix

    stack.clear();
    stack.multiply(viewMat);
    
    // Setting the light position
    var newLight = mult(viewMat, lighting.light_position); 
    gl.uniform4fv(uLight_position, newLight);
    
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.axis.draw();
   
    stack.push();
    
    stack.multiply(rotateY(-90));
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 0.0, 1.0)); 
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));

      //dog = new Robot(0,0,0, 1.0);
      //dog.draw();
    
    Shapes.drawPrimitive(Shapes.cone);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(3, 0,5));
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0)); 
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(-3, 1,-2));
    stack.multiply(scalem(2,6,1));
    gl.uniform4fv(uColor, vec4(0.5, 0.5, 1.0, 1.0)); 
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(lighting.light_position[0], lighting.light_position[1], lighting.light_position[2]));
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0)); 
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop(); 
   
}

