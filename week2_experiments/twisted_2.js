/*ChatGPT helped me with the code, and i got inspiration from Andreion de Castro on behance https://chatgpt.com/share/68bea412-3ac0-8011-b9b4-3d89cd269d1d https://www.behance.net/gallery/105775659/creative-coding-explorations?tracking_source=search_projects|creative+coding&l=0 */

let karlaFont;
//let textString = "My thoughts are spiraling out of control, and my heart is taking notes";
let textString =
  "my ideas spin faster than I can catch them and somehow thats the fun part.";

let radius = 130; // keep width
let angleStep = 0.3; // twist density
let ySpacing = 7; // tighter vertical spacing
let rotation = 0; // global rotation angle
let repeats = 1; // how many times the text is repeated

function preload() {
  karlaFont = loadFont("fonts/Karla-Regular.ttf");
}

function setup() {
  createCanvas(600, 800);
  textFont(karlaFont, 35);
  //  textSize(size);
  textAlign(CENTER, CENTER);
  fill(255, 169, 65);
}

function draw() {
  // background(0);
  background(255, 255, 236);
  translate(width / 2, height / 2);

  rotation -= 0.02; // spin speed

  let angle = rotation;
  let totalChars = textString.length * repeats;
  let y = (-totalChars * ySpacing) / 2;

  for (let r = 0; r < repeats; r++) {
    for (let i = 0; i < textString.length; i++) {
      let c = textString[i];

      // Leftward spiral
      let x = -cos(angle) * radius;
      let z = sin(angle) * 4; // depth illusion

      // Scale based on depth
      let scaleFactor = map(z, -1, 1, 0.6, 0.9);

      push();
      translate(x, y);
      scale(scaleFactor);
      //textFont(karlaFont);
      //textSize(26);
      text(c, 0, 0);
      pop();

      angle += angleStep;
      y += ySpacing;
    }
  }
}
