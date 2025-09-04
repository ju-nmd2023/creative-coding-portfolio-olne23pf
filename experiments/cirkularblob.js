/*Code taken from gorillasun: https://www.gorillasun.de/blog/radial-perlin-noise-and-generative-tree-rings/ */
function setup() {
  createCanvas(400, 400);
  background(255);
  stroke(0);
  strokeWeight(1);
  noFill();
  frameRate(10);
}

let scale = 50;
let resolution = 0.002;
let numPoints = 100;

let radius = 100;
let numRings = 20;
let counter = 0;

function draw() {
  /*ChatGPT help me with the rotating animation */
  background(255); // Clear background each frame to show rotation
  let rotationSpeed = 0.2; // Adjust this for faster/slower rotation

  translate(width / 2, height / 2); // Draw from the center
  rotate(counter * rotationSpeed); // Rotate entire drawing

  for (let r = 0; r < radius; r += radius / numRings) {
    beginShape();
    for (let a = 0; a < TAU; a += TAU / numPoints) {
      // Add counter to angle for rotation

      let x = r * cos(a);
      let y = r * sin(a);

      let n = map(noise(x * resolution, y * resolution), 0, 1, -scale, scale);

      curveVertex(x + n, y + n);
    }
    endShape(CLOSE);
  }
  pop(); // Restore original transformation
  counter++;
}
