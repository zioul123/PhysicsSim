
// Conversion between pixels to meters
meters = 50;
pixToM = 1 / meters;

SCENE_WIDTH = 600;
SCENE_HEIGHT = 400;

let s = new Scene2D();

function setup() {
  createCanvas(SCENE_WIDTH, SCENE_HEIGHT);

  // add(x0, x1, v0, v1, m0, m1, isFixed0, isFixed1, rad0, rad1)
  s.add(3+0.5, 4,  5, -3, 1, 1, false, false, 0.1, 0.1);
  s.add(3+1.0, 4,  4, -3, 1, 1, false, false, 0.1, 0.1);
  s.add(3+1.5, 4,  3, -3, 1, 1, false, false, 0.1, 0.1);
  s.add(3+2.0, 4,  2, -3, 1, 1, false, false, 0.1, 0.1);
  s.add(3+2.5, 4,  1, -3, 1, 1, false, false, 0.1, 0.1);
  s.add(3+3.0, 4,  0, -3, 1, 1, false, false, 0.1, 0.1);
  s.add(3+3.5, 4, -1, -3, 1, 1, false, false, 0.1, 0.1);
  s.add(3+4.0, 4, -2, -3, 1, 1, false, false, 0.1, 0.1);
  s.add(3+4.5, 4, -3, -3, 1, 1, false, false, 0.1, 0.1);
  s.add(3+5.0, 4, -4, -3, 1, 1, false, false, 0.1, 0.1);
  s.add(3+5.5, 4, -5, -3, 1, 1, false, false, 0.1, 0.1);
  s.add(11, 1, 0, 0, 1, 1, false, false, 0.1, 0.1);

  s.addForce(new GravityForce(0, 9.81));
}

function draw() {
  background(220);

	// Draw scale
  drawMeterGrid();

  // Draw all particles
	fill(color(255, 204, 0));
	stroke(color(0, 0, 0));
  for (let i = 0; i < s.nParticles; i++) {
		[ x0, x1 ] = s.getX(i);
		[ r0, r1 ] = s.getRadii(i);
	  ellipse(x0 * meters, x1 * meters, r0 * meters, r1 * meters)
	  // if (i == 11) {
			// [ v0, v1 ] = s.getV(i);
	  // 	console.log("s: " + (x1-1) + ", v: " + v1 + ", v2 = " + (v1*v1) + ", 2as = " + (2*9.81*(x1-1)));
	  // }
  }

  // Step
  s.stepScene(deltaTime/1000);
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