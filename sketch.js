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


}

function draw() {

	// myShader.setUniform("frequency", freq);
	// myShader.setUniform("amplitude", amp);
  if(checkMobile()){
    myShader.setUniform("time", frameCount * 0.009);
    myShader.setUniform("time2", frameCount * 0.008);
  }else{
    myShader.setUniform("time", frameCount * 0.006);
    myShader.setUniform("time2", frameCount * 0.005);
  }
	

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
