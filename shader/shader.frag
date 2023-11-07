#ifdef GL_ES
precision mediump float;
#endif
  
precision highp float;

varying vec2 vUV;

uniform sampler2D tex;
uniform float time;
uniform float time2;
uniform float frequency;
uniform float amplitude;

void main() {
  vec2 uv = vec2(1.0) - vUV;
  uv.x = uv.x * -1.0;

  // lets create a sine wave to distort our texture coords
  // we will use the built in sin() function in glsl
  // sin() returns the sine of an angle in radians
  // first will multiply our uv * frequency -- frequency will control how many hills and valleys will be in the wave
  // then we add some time to our sine, this will make it move 
  // lastly multiply the whole thing by amplitude -- amplitude controls how tall the hills and valleys are, in this case it will be how much to distort the image
  // *try changing uv.y to uv.x and see what happens
  //float sineWave = sin(uv.y * frequency + time) * amplitude;
  //float sineWave = cos(uv.y * frequency + time) * amplitude;
  //float sineWave = 2.0 * abs(mod(uv.y * frequency + time, 2.0) - 1.0) * amplitude;
  //float sineWave = 2.0 * (fract(uv.y * frequency + time) - 0.5) * amplitude;
  //float sineWave = texture(someNoiseTexture, uv).r * amplitude;
  //float sineWave = (sin(uv.y * frequency + time) + 1.0) * amplitude * 0.5;
//float sineWave = (sin(uv.y * frequency + time) + cos(uv.y * 2.0 * frequency + time)) * amplitude * 0.5;
//float sineWave = (sin(uv.x * frequency + time) + cos(uv.y * 2.0 * frequency + time) + 0.5 * snoise(vec3(uv.xy * 5.0, time))) * amplitude * 0.5;
//vec2 center = vec2(0.5, 0.5); // Center of the screen
//float distance = length(uv - center);
//float sineWave = sin(distance * frequency + time) * amplitude;



// Parameters for the radial animation
float radialFrequency = 2.0; // Adjust this for radial speed
float radialAmplitude = 0.02; // Adjust this for radial amplitude

// Parameters for the vertical oscillation
float verticalFrequency = 0.5; // Adjust this for vertical speed
float verticalAmplitude = 0.001; // Adjust this for vertical amplitude

vec2 center = vec2(0.5, 0.5); // Center of the screen
float spacingFactor = 7.0; // Adjust this to control spacing

// Increase the distance to control spacing
float distance = length(uv - center) * spacingFactor;

// Combine the two effects
float radialAnimation = cos(distance * radialFrequency + time) * radialAmplitude;
float verticalOscillation = sin(uv.y * verticalFrequency + time2) * verticalAmplitude;

// Combine the two effects
float sineWave = radialAnimation + verticalOscillation;






  // create a vec2 with our sine
  // what happens if you put sineWave in the y slot? in Both slots?
  vec2 distort = vec2(sineWave, sineWave);

  // use mod() to wrap our texcoords back to 0.0 if they go over 1.0
  vec4 texColor = texture2D(tex, mod(uv + distort, 1.0));

  gl_FragColor = texColor;
}