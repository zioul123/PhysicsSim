// Conversion between pixels to meters
meters = 50;
pixToM = 1 / meters;

SCENE_WIDTH = 600;
SCENE_HEIGHT = 400;

let s = new Scene2D(SymplecticEuler);

const flipY = y => SCENE_HEIGHT - y;

function setup() {
  createCanvas(SCENE_WIDTH, SCENE_HEIGHT);
  // SimpleGravity(s)
  OrbitTest(s);
}

function draw() {
  background(220);
  // y-axis is upwards
  scale(1, -1);
  translate(0, -SCENE_HEIGHT);

  // Draw scale
  drawMeterGrid();

  // Draw all particles
  fill(color(255, 204, 0));
  stroke(color(0, 0, 0));
  for (let i = 0; i < s.nParticles; i++) {
    let xi = s.getX(i);
    let ri = s.getRadii(i);
    ellipse(xi.x * meters, xi.y * meters, ri.x * meters, ri.y * meters)
  }

  // Step
  s.stepScene(deltaTime / 1000);
}

// Draws "graph paper lines" for scale
function drawMeterGrid() {
  stroke(color(255, 255, 255));
  for (let i = 0; i < SCENE_WIDTH; i += meters) {
    line(i, 0, i, SCENE_HEIGHT);
  }
  for (let i = 0; i < SCENE_HEIGHT; i += meters) {
    line(0, i, SCENE_WIDTH, i);
  }
}
