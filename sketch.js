let myShader;
let img;
console.log("ANTOINE CONTRERAS DEVELOPPEMENT WITH DIPLOMATIE STUDIO ");
function preload() {
  myShader = loadShader('shader/shader.vert', 'shader/shader.frag');
}
const target = document.querySelector("#canvas-container");
function setup() {
  let myCanvas = createCanvas(target.offsetWidth, target.offsetHeight, WEBGL);
  myCanvas.parent("canvas-container");
  textureWrap(CLAMP);
  img = loadImage('./logo/logo.png');
  
  shader(myShader);
  
  myShader.setUniform('tex', img);
  noStroke();
}

function draw() {

  
  let freq = map(mouseX, 0, width, 0, 27.0);
  let amp = map(mouseY, 0, height, 0, 0.07);

  myShader.setUniform('frequency', freq);
  myShader.setUniform('amplitude', amp);
  myShader.setUniform('time', frameCount * 0.008);

  rect(0,0,width, height);
}

function windowResized() {
  resizeCanvas(target.offsetWidth, target.offsetHeight);
}