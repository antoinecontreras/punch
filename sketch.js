let myShader;
let img;
let animation = false;
let freq;
let amp;
console.log("ANTOINE CONTRERAS DEVELOPPEMENT WITH DIPLOMATIE STUDIO ");
function preload() {
	myShader = loadShader("shader/shader.vert", "shader/shader.frag");
}
const target = document.querySelector("#canvas-container");
function setup() {
	let myCanvas = createCanvas(target.offsetWidth, target.offsetHeight, WEBGL);
	myCanvas.parent("canvas-container");
	textureWrap(CLAMP);
	img = loadImage("./logo/logo.png");
	shader(myShader);
	myShader.setUniform("tex", img);
	noStroke();

  if(checkMobile()){
    freq = map(100, 0, width, 0, 27.0);
		amp = map(100, 0, height, 0, 0.07);
  }else{
    animation=true;
  }
}
function mouseMoved(){
  if (animation !== false) {

		freq = map(mouseX, 0, width, 0, 27.0);
		amp = map(mouseY, 0, height, 0, 0.07);
	}
}
function draw() {

	

	myShader.setUniform("frequency", freq);
	myShader.setUniform("amplitude", amp);
	myShader.setUniform("time", frameCount * 0.008);

	rect(0, 0, width, height);
}

function windowResized() {
	resizeCanvas(target.offsetWidth, target.offsetHeight);
}
function checkMobile() {
	let details = navigator.userAgent;

	let regexp = /android|iphone|kindle|ipad/i;

	let isMobileDevice = regexp.test(details);
	return isMobileDevice;
}
