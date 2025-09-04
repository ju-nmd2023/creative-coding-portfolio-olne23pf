/*Code from Garrit showing Vera Molnár's artpiece: https://play.ju.se/media/Noise+examples,+and+Vera+Moln%C3%A1r/0_3pcpvm3q */
function setup() {
  createCanvas(500, 500);
}

const size = 50;
const layers = 10;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  //const half = size / 2;
  const variance = size / 20;
  noFill();
  stroke(80, 80, 200);
  //rectMode(CENTER);
  for (let i = 0; i < layers; i++) {
    if (Math.random() > 0.8) {
      continue;
    }
    const s = (size / layers) * i;
    const half = s / 2;
    beginShape();
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y + half, variance)
    );
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y + half, variance)
    );

    endShape(CLOSE);
    //rect(x - half, y - half, s, s);
  }
}

function draw() {
  background(255);

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }

  noLoop();
}
