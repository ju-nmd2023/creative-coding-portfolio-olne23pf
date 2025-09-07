/*Code from Garrit showing Vera Molnár's artpiece: https://play.ju.se/media/Noise+examples,+and+Vera+Moln%C3%A1r/0_3pcpvm3q */
/*Got help with the code that creates the George Nees effect from Chat GPT: https://chatgpt.com/share/68bd9880-6ef8-8011-ae7e-de5d2800346a */
function setup() {
  createCanvas(400, 700); // rectangular, taller than wide
  noLoop();
}

const size = 50;
const layers = 10;
const gap = 4; // space between squares
const cols = 6; // fewer columns for tall format
const rows = 12; // more rows for vertical emphasis

function getRandomValue(pos, variance) {
  return pos + random(-variance, variance);
}

function drawLayers(x, y, size, layers, disorder) {
  const variance = (size / 20) * (1 + disorder * 2);
  noFill();
  stroke(140, 200, 180);

  push();

  // Progressive falling: translation & rotation based on disorder
  const maxShift = size * 0.35; // limit movement so they stay on canvas
  translate(
    x + random(-disorder * maxShift, disorder * maxShift),
    y + random(-disorder * maxShift, disorder * maxShift)
  );
  rotate(radians(random(-disorder * 12, disorder * 12))); // subtle rotation

  for (let i = 0; i < layers; i++) {
    if (random() > 0.8) continue;

    const s = (size / layers) * i;
    const half = s / 2;

    beginShape();
    vertex(getRandomValue(-half, variance), getRandomValue(-half, variance));
    vertex(getRandomValue(half, variance), getRandomValue(-half, variance));
    vertex(getRandomValue(half, variance), getRandomValue(half, variance));
    vertex(getRandomValue(-half, variance), getRandomValue(half, variance));
    endShape(CLOSE);
  }

  pop();
}

function draw() {
  background(255);

  // Compute starting offsets to center the grid fully within canvas
  const totalWidth = cols * size + (cols - 1) * gap;
  const totalHeight = rows * size + (rows - 1) * gap;
  const startX = (width - totalWidth) / 2 + size / 2;
  const startY = (height - totalHeight) / 2 + size / 2;

  for (let y = 0; y < rows; y++) {
    const disorder = map(y, 0, rows - 1, 0, 1);
    for (let x = 0; x < cols; x++) {
      const cx = startX + x * (size + gap);
      const cy = startY + y * (size + gap);
      drawLayers(cx, cy, size, layers, disorder);
    }
  }
}
