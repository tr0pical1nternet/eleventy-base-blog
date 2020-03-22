

/*======= Globals ======*/

var dpr = window.devicePixelRatio || 1;
var hero = document.querySelector('.hero-home');
var illo = hero.querySelector('canvas');
var camera = [], grid = {}, face = {}, layer = [], backgroundVertices = [];
var windowWidth = window.innerWidth;


/*======= Functions ======*/

function setupCanvas(canvas, attributes = {}) {
   // For referencing later in handleResize function
  windowWidth = window.innerWidth;

   // Get the device pixel ratio, falling back to 1.
  dpr = window.devicePixelRatio || 1;
  
  // Get the size of the illustration in CSS pixels.
  canvas.bounds = hero.getBoundingClientRect();

  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = canvas.bounds.width * dpr;
  canvas.height = canvas.bounds.height * dpr;
  
  context = canvas.getContext('webgl', attributes);
  
  return context;
}

function prepScene() {
  gl = setupCanvas(illo, { alpha: false });
  
  camera = [ 0, window.scrollY * dpr, 1 ];
  
  // Define grid for backround
  grid.maxRows = 27;
  grid.columnWidth = (illo.width + illo.height) / 5;
  grid.maxColumns = Math.floor(illo.width * 7 / grid.columnWidth) * 2 + 1 ;
  grid.rowHeight = .5;
  grid.maxWidth = grid.maxColumns * grid.columnWidth;

  // Output horizontal lines as vec4 (x, y, z, w) for vertex shader
  let x = Math.ceil(illo.width / 2);
  let y = Math.ceil(illo.height / 2);
  var horizontalLines = []
  for (let row = 0; row < grid.maxRows; row++) {
    let z = row * grid.rowHeight
    let topLeft = [ -x, y, z, 0 ];
    let topRight = [ x, y, z,  0 ];
    let bottomLeft = [  -x, -y, z,  0 ];
    let bottomRight = [  x, -y, z,  0 ];
    horizontalLines = horizontalLines.concat(topLeft, topRight, bottomLeft, bottomRight);
  }
  
  // Output converging lines as vec4 (x, y, z, w) for vertex shader
  var convergingLines = [];
  for (let col = 0; col < grid.maxColumns; col++ ) {
    let x = Math.floor( -(grid.maxWidth / 2) + col * grid.columnWidth);
    let vertexTop = [ x, y, 0, 1 ];
    let vertexBottom = [ x, -y, 0, 1 ];
    let vertexInfinity = [ 0, 0, 99999, 1];
    convergingLines = convergingLines.concat(vertexTop, vertexInfinity, vertexBottom, vertexInfinity);
  }

  backgroundVertices = backgroundVertices.concat(horizontalLines, convergingLines);
  console.log(backgroundVertices);
}

function viewport(canvas) {
  return [
    2 / (canvas.width), 0, 0, 0,
    0, 2 / (canvas.height), 0, 0,
    0, 0, 2 / (canvas.height), 0,
    0, 0, 0, 1
  ]
}

prepScene();

/*======= Shaders =========*/

// Shader for background horizontal lines
var backgroundShaderSource = `
   precision lowp float;

   attribute vec4 bg_verts;
   uniform vec3 camera;
   uniform mat4 viewport;

   void main(void) {
      vec4 position;
      int w = int(bg_verts.w);

      if (w == 1) {
         int z = int(bg_verts.z);
         if (z > 9000) {
            position = vec4(camera.x, -camera.y, 1, 1) * viewport;
         }
         else
            position = vec4(bg_verts.x, bg_verts.y, 0, 1) * viewport;
      } else {
         float proj_y = floor((camera.z * (bg_verts.y + camera.y)) / (camera.z + bg_verts.z) - camera.y);
         position = vec4(bg_verts.x, proj_y, bg_verts.z, 1) * viewport; 
      }

      gl_Position = position;
  }`;
 
// Fragment shader source code
var fragmentShaderSource = `
  void main(void) {
  gl_FragColor = vec4(0.33, 0.33, 1.0, 1.0);
  }`;


/*======= Initialize shader program =========*/

function compileShader(shader) {
  gl.compileShader(shader);
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
  }
}

// Create shaders
const backgroundShader = gl.createShader(gl.VERTEX_SHADER);
// const convergingShader = gl.createShader(gl.VERTEX_SHADER);
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

// Attach vertex shader source code
gl.shaderSource(backgroundShader, backgroundShaderSource);
// gl.shaderSource(convergingShader, convergingShaderSource);
gl.shaderSource(fragmentShader, fragmentShaderSource);

// Compile the vertex shaders
compileShader(backgroundShader);
// compileShader(convergingShader);
compileShader(fragmentShader);

// Create shader program
const backgroundShaderProgram = gl.createProgram();
// const convergingShaderProgram = gl.createProgram();

// Attach shaders to shader program
gl.attachShader(backgroundShaderProgram, backgroundShader);
gl.attachShader(backgroundShaderProgram, fragmentShader);

// gl.attachShader(convergingShaderProgram, convergingShader);
// gl.attachShader(convergingShaderProgram, fragmentShader);

// Link shader programs
gl.linkProgram(backgroundShaderProgram);
// gl.linkProgram(convergingShaderProgram);


/*======= Initialize buffers =========*/

// Create an empty buffer object
var backgroundBuffer = gl.createBuffer();
// var convergingBuffer = gl.createBuffer();

// Bind appropriate array buffer to it
gl.bindBuffer(gl.ARRAY_BUFFER, backgroundBuffer);
// gl.bindBuffer(gl.ARRAY_BUFFER, convergingBuffer);

// Pass the vertex data to the buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(backgroundVertices), gl.STATIC_DRAW);


/*======= Associating shaders to buffer objects for HORIZONTAL lines ======*/
// Use the combined shader program object
gl.useProgram(backgroundShaderProgram);

// Bind vertex buffer object
gl.bindBuffer(gl.ARRAY_BUFFER, backgroundBuffer);

// Get the attribute location
var lineHorizontalLocation = gl.getAttribLocation(backgroundShaderProgram, "bg_verts");

// Get the uniform location
var cameraLocation = gl.getUniformLocation(backgroundShaderProgram, "camera");
var viewportLocation = gl.getUniformLocation(backgroundShaderProgram, "viewport");

// Point an attribute to the currently bound VBO
gl.vertexAttribPointer(lineHorizontalLocation, 4, gl.FLOAT, false, 0, 0);

// Enable the attribute
gl.enableVertexAttribArray(lineHorizontalLocation);

// Set the shader uniforms
gl.uniform3fv(cameraLocation, camera);
gl.uniformMatrix4fv(viewportLocation, false, new Float32Array(viewport(illo)));

/*============ Drawing the lines =============*/

function drawLines() {
  camera[1] = window.scrollY * dpr;
  
  // Set the shader uniforms
  gl.uniform3fv(cameraLocation, camera);
  
  // Clear the canvas
  gl.clearColor(0.12, 0.12, 0.12, 1);

  // Enable the depth test
  gl.enable(gl.DEPTH_TEST);

  // Clear the color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Set the view port
  gl.viewport(0,0,illo.width,illo.height);

  // 
  gl.lineWidth(2);

  // Draw the lines
  gl.drawArrays(gl.LINES, 0, backgroundVertices.length / 4);
  
}

drawLines();

/*============ Animate on scroll =============*/
function handleScroll() {
  window.requestAnimationFrame(drawLines);
}

window.addEventListener('scroll', handleScroll);