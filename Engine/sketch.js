// Size of our canvas
let SCENE_WIDTH = 600;
let SCENE_HEIGHT = 400;

// Program logic
let s, r, e;
// GUI
let canvas, btnSimpleGravity, btnOrbitTest, btnSpringTest, btnDragTest, btnPlay, btnReset, sliderScale;
// Number of pixels per meter, and screen offset.
// offX/offY will be be added to world positions as such: 
//   x_coord = x_meters * meters +  offX
//   y_coord = h - (y_meters * meters) - 1 + offY;
let meters = 70, offX = 0, offY = 0;
// Mouse state
// Possible states
let INPUT_MODE = {
  MOVE: 0,
  INSERT_PARTICLE: 1,
  DELETE_PARTICLE: 2,
  INSERT_SPRING: 3,
  DELETE_SPRING: 4,
  INSERT_ORBIT: 5,
  DELETE_ORBIT: 6,
  GUI: 7
}
let selectedMode = INPUT_MODE.MOVE;
// Use this flag to prevent screen from scrolling when clicking on a GUI element
let onGUI = false;

function swapScene(sceneNo) {
  // Do a proper clearing in future, just for simplicity
  s = new Scene2D(SymplecticEuler);
  r = new Renderer2D(SCENE_WIDTH, SCENE_HEIGHT, meters);
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
  canvas = createCanvas(SCENE_WIDTH, SCENE_HEIGHT);
  let cX = canvas.position().x,
    cY = canvas.position().y;
  swapScene(0);

  // ----- Create the test choices panel -----
  let panelXY = { x: cX, y: cY };

  btnSimpleGravity = createButton('Simple Gravity');
  btnSimpleGravity.position(
    panelXY.x,
    panelXY.y - btnSimpleGravity.size().height
  );
  btnSimpleGravity.mousePressed(() => swapScene(0));
  panelXY.x = btnSimpleGravity.position().x + btnSimpleGravity.size().width;

  btnOrbitTest = createButton('Orbital Gravity');
  btnOrbitTest.position(
    panelXY.x,
    panelXY.y - btnSimpleGravity.size().height
  );
  btnOrbitTest.mousePressed(() => swapScene(1));
  panelXY.x = btnOrbitTest.position().x + btnOrbitTest.size().width;

  btnSpringTest = createButton('Spring Test');
  btnSpringTest.position(
    panelXY.x,
    panelXY.y - btnOrbitTest.size().height
  );
  btnSpringTest.mousePressed(() => swapScene(2));
  panelXY.x = btnSpringTest.position().x + btnSpringTest.size().width;

  btnDragTest = createButton('Drag Test');
  btnDragTest.position(
    panelXY.x,
    panelXY.y - btnOrbitTest.size().height
  );
  btnDragTest.mousePressed(() => swapScene(3));
  // -----------------------------------------

  // ----- Create the play/pause/reset panel -----
  panelXY = { x: cX, y: cY };
  btnPlay = createButton('Play');
  btnPlay.position(cX, cY);
  btnPlay.mousePressed(() => e.togglePlay());
  panelXY.x = btnPlay.position().x + btnPlay.size().width;
  btnReset = createButton('Reset');
  btnReset.position(panelXY.x, panelXY.y);
  btnReset.mousePressed(() => e.resetScene());

  sliderScale = createSlider(30, 200, 70);
  sliderScale.position(cX + SCENE_WIDTH - 1 - sliderScale.size().width - 10, cY);
  sliderScale.mouseOver(() => onGUI = true);
  sliderScale.mouseOut(() => onGUI = false);
}

function mouseDragged() {
  switch (selectedMode) {
    case INPUT_MODE.MOVE:
      if (!onGUI) {
        offX = min(offX + movedX, 0);
        offY = max(offY + movedY, 0);
      }
      break;
  }
}

// Rescale if scale changed
function rescaleOffsets() {
  // Cache previous values before updating to new ones
  let prevMeters = meters;
  let prevOffX = offX;
  let prevOffY = offY;
  
  // Update meters, then offsets to match the new scale.
  meters = sliderScale.value();
  if (offX > -0.01 && offY < 0.01) {
    // If touching bottom left, scale to the bottom left corner.
    offX = min(offX / prevMeters * meters, 0);
    offY = max(offY / prevMeters * meters, 0);
  } else {
    // Otherwise, scale based on center of the screen.
    // This calculation comes from equating 
    //   (h/2 + prevOffY) / prevM = (h/2 + offY) / meters
    //   (w/2 - prevOffX) / prevM = (w/2 - offX) / meters
    offX = min(((SCENE_WIDTH / 2) * (prevMeters - meters) + meters * prevOffX) / prevMeters, 0);
    offY = max(((SCENE_HEIGHT / 2) * (meters - prevMeters) + meters * prevOffY) / prevMeters, 0);
  }
}

function draw() {
  // TODO: Ideally only do this on slider movement using a callback.
  rescaleOffsets();
  e.rescale(SCENE_WIDTH, SCENE_HEIGHT, meters, offX, offY);

  // Drawing is offloaded to the Engine class
  e.draw();
}