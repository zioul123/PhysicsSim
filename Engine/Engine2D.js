// Encapsulates a scene Renderer2D and Scene2D.
class Engine2D {
  constructor(s, r) {
    // A Scene2D
    this.s = s;
    // A Renderer
    this.r = r;
  }
  // Used to populate the scene/renderer particle lists
  add(p) {
    const vec2 = createVector;
    const randColor = () => color(170 + random(86), 
                                  170 + random(86), 
                                  170 + random(86));

    // Extract the given parameters
    let x = p.x !== undefined ? p.x : vec2(r.pixToM * r.w / 2,
      r.pixToM * r.h / 2);
    let v = p.v !== undefined ? p.v : vec2(0, 0);
    let m = p.m !== undefined ? p.m : 1;
    let isFixed = p.isFixed !== undefined ? p.isFixed : false;
    let rad = p.rad !== undefined ? p.rad : 0.1;
    let col = p.col !== undefined ? p.col : randColor();
    let trailDur = p.trailDur !== undefined ? p.trailDur : 1;
    let trailCol = p.trailCol !== undefined ? p.trailCol : col;

    s.add(x.x, x.y, v.x, v.y, m, isFixed.x, isFixed.y, rad);
    r.add(rad, col, trailDur, trailCol);
  }
  
  // Add the force to the scene
  addForce(f) {
    s.addForce(f);
  }
  
  // Add edge to be drawn
  addEdge(e) {
    r.addEdge(e);
  }
  
  // Draw the scene, store extra information
  draw() {
    // Background color
    background(110);
    // Draw scale
    r.drawMeterGrid();
    // Draw trails
    r.drawAllTrails();
    // Draw edges
    r.drawAllEdges(s);
    // Draw all particles
    r.drawAllParticles(s);
    // Step the scene fprward
    s.stepScene(min(deltaTime / 1000, 0.2));
  }
}