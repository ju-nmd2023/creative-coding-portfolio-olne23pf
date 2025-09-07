/*Code taken from gorillasun: https://www.gorillasun.de/blog/radial-perlin-noise-and-generative-tree-rings/ */
/*ChatGPT helped me with the "growing then shrinking animation": https://chatgpt.com/share/68bd9dc2-2b44-8011-945d-3fc5e36ea01a  */
let scaleAmt = 50;
let resolution = 0.002;
let numPoints = 200; // smoothness of the rings
let radiusMax = 150;
let numRings = 20;

let ringColors = [];
let ringProgress = []; // 0..1 progress for each ring (alpha / visibility)
let currentIndex = 0; // index currently being animated
let direction = 1; // 1 = growing, -1 = shrinking

let progressSpeed = 0.05; // how fast a single ring finishes (adjust)
let rotationAngle = 0;
let rotationSpeed = 0.01; // rotation per frame (adjust)

function setup() {
  createCanvas(400, 400);
  colorMode(RGB, 255);
  noFill();
  strokeWeight(1.5);
  frameRate(60);

  // init arrays
  for (let i = 0; i < numRings; i++) {
    // random color per ring (you can tune ranges to taste)
    ringColors[i] = color(random(40, 255), random(40, 255), random(40, 255));
    ringProgress[i] = 0; // start invisible
  }
}

function draw() {
  background(255);

  // Draw rotating rings centered
  push();
  translate(width / 2, height / 2);
  rotate(rotationAngle);

  for (let i = 0; i < numRings; i++) {
    if (ringProgress[i] > 0) {
      // per-ring alpha from progress
      let a = constrain(ringProgress[i], 0, 1);
      let c = ringColors[i];
      // build a color with alpha without mutating original
      stroke(red(c), green(c), blue(c), 255 * a);
      strokeWeight(1 + 2 * a); // slightly thicker while visible

      // radius: smallest ring is (1/numRings)*radiusMax, largest is radiusMax
      let r = ((i + 1) / numRings) * radiusMax;

      beginShape();
      for (let aAng = 0; aAng <= TAU + 0.0001; aAng += TAU / numPoints) {
        let x = r * cos(aAng);
        let y = r * sin(aAng);
        // include ring index in noise z to vary rings
        let n = map(
          noise(x * resolution, y * resolution, i * 10),
          0,
          1,
          -scaleAmt,
          scaleAmt
        );
        curveVertex(x + n, y + n);
      }
      endShape(CLOSE);
    }
  }

  pop();

  // --- Animation logic: grow then shrink ---
  if (direction === 1) {
    // growing phase
    // animate the current index ring toward 1
    if (currentIndex < numRings) {
      ringProgress[currentIndex] += progressSpeed;
      if (ringProgress[currentIndex] >= 1) {
        ringProgress[currentIndex] = 1;
        currentIndex++;
        // if we've finished the last ring, switch to shrinking
        if (currentIndex >= numRings) {
          direction = -1;
          currentIndex = numRings - 1; // start shrinking from the last ring
        }
      }
    }
  } else {
    // shrinking phase
    if (currentIndex >= 0) {
      ringProgress[currentIndex] -= progressSpeed;
      if (ringProgress[currentIndex] <= 0) {
        ringProgress[currentIndex] = 0;
        currentIndex--;
        // if we've removed the first ring, switch to growing again
        if (currentIndex < 0) {
          direction = 1;
          currentIndex = 0;
          // Option: regenerate colors every cycle if you want fresh palette:
          // regenerateColors();
        }
      }
    }
  }

  // rotate
  rotationAngle += rotationSpeed;
}
