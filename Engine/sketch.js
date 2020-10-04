// Number of pixels per meter
METERS = 70
// Size of our canvas
SCENE_WIDTH = 600;
SCENE_HEIGHT = 400;

let s, r, e;

function resetScene(sceneNo) {
  // Do a proper clearing in future, just for simplicity
  s = new Scene2D(SymplecticEuler);
  r = new Renderer2D(SCENE_WIDTH, SCENE_HEIGHT, METERS);
  e = new Engine2D(s, r);

  switch (sceneNo) {
    case 0:
      SimpleGravity(e);
      break;
    case 1:
      OrbitTest(e);
      break;
    case 2:
      SpringTest(e);
      break;
    case 3:
      DragTest(e);
      break;
    default:
      OrbitTest(e);
      break;
  }
}

function setup() {
  createCanvas(SCENE_WIDTH, SCENE_HEIGHT);
  resetScene(0);

  simpleGravity = createButton('Simple Gravity');
  simpleGravity.position(20, 20);
  simpleGravity.mousePressed(() => resetScene(0));

  orbitTest = createButton('Orbital Gravity');
  orbitTest.position(20, 60);
  orbitTest.mousePressed(() => resetScene(1));
  
  springTest = createButton('Spring Test');
  springTest.position(20, 100);
  springTest.mousePressed(() => resetScene(2));
  
  dragTest = createButton('Drag Test');
  dragTest.position(20, 140);
  dragTest.mousePressed(() => resetScene(3));
}

function draw() {
  e.draw();
}