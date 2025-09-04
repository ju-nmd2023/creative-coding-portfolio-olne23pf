/*Code taken from Garrit: "Grid from center" and made some adjustment for me*/
const size = 80;
const gap = 20;
const amountY = 5;
const amountX = 7;

function setup() {
  createCanvas(innerWidth, innerHeight);
  rectMode(CENTER);
}

function drawGrid() {
  const centerX = width / 2;
  const centerY = height / 2;
  for (let x = -Math.floor(amountX / 2); x < Math.ceil(amountX / 2); x++) {
    for (let y = -Math.floor(amountY / 2); y < Math.ceil(amountY / 2); y++) {
      let xPosition = centerX + x * (size + gap);
      let yPosition = centerY + y * (size + gap);
      if (amountX % 2 === 0) {
        xPosition += size / 2;
      }
      if (amountY % 2 === 0) {
        yPosition += size / 2;
      }

      /*ChatGPT helped me with the code that colors the squares: https://chatgpt.com/share/68b955f2-ab4c-8011-ae7f-49ee2a7ec9f8  */
      let isMiddle = x === 0 || y === 0;

      // Determine alternating color
      if (isMiddle) {
        // Every other square in middle part → yellow
        if ((x + y) % 2 === 0) {
          fill(252, 250, 200); // yellow
        } else {
          fill(255, 255, 240); //soft color
        }
      } else {
        // Every other rotated square → pink
        if ((x + y) % 2 === 0) {
          fill(252, 250, 200); // yellow
        } else {
          fill(255, 255, 240); //soft color
        }
      }

      push();
      translate(xPosition, yPosition);
      rotate(x * y * 0.1);
      square(0, 0, size);
      pop();
    }
  }
}

function draw() {
  background(255, 255, 255);
  noFill();
  stroke(0, 0, 0, 50);
  strokeWeight(3);

  stroke(255, 240, 225);
  drawGrid(0);

  noLoop();
}
