/*ChatGPT helped me with the code, and i got inspiration from Andreion de Castro on behance https://chatgpt.com/share/68be95b0-bf5c-8011-9840-bb7a37929b3c https://www.behance.net/gallery/105775659/creative-coding-explorations?tracking_source=search_projects|creative+coding&l=0 */
let phrase = "Welcome to Nellies portfolio";
let t = 0; // time variable for animation

function setup() {
  createCanvas(600, 450);
  textSize(24);
  textAlign(CENTER, CENTER);
  noStroke();
  fill(255, 169, 65);
}

function draw() {
  background(255, 255, 236);
  let waveAmplitude = 50;
  let waveFrequency = 0.3;

  for (let i = 0; i < phrase.length * 2; i++) {
    let charIndex = i % phrase.length;
    let x = i * 20 + 50; // spacing
    let y = height / 2 + sin(x * waveFrequency + t) * waveAmplitude;
    push();
    translate(x % width, y);
    rotate(sin(x * 0.02 + t) * 0.5); // slight twist
    text(phrase[charIndex], 0, 0);
    pop();
  }

  t += 0.03; // animate
}
