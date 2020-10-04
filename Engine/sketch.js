// Number of pixels per meter
METERS = 50; 
// Size of our canvas
SCENE_WIDTH = 600; 
SCENE_HEIGHT = 400; 

let s = new Scene2D(SymplecticEuler);
let r = new Renderer2D(SCENE_WIDTH, SCENE_HEIGHT, METERS);
let e = new Engine2D(s, r);

function setup() {
  createCanvas(SCENE_WIDTH, SCENE_HEIGHT);
  SimpleGravity(e)
  // OrbitTest(e);
}

function draw() {
  e.draw();
}