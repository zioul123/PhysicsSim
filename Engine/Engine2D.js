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

    // Extract the given parameters. This is definitely not idiomatic js.
    let x = p.x !== undefined ? p.x : vec2(r.pixToM * r.w / 2,
      r.pixToM * r.h / 2);
    let v = p.v !== undefined ? p.v : vec2(0, 0);
    let m = p.m !== undefined ? p.m : 1;
    let rad = p.rad !== undefined ? p.rad : 0.1;
    let col = p.col !== undefined ? p.col : randColor();
    let isFixed = p.isFixed !== undefined ? p.isFixed : false;
    let trailDur = p.trailDur !== undefined ? p.trailDur : 1;
    let trailCol = p.trailCol !== undefined ? p.trailCol : color(col.levels[0], col.levels[1], col.levels[2]);
    this.s.add(x.x, x.y, v.x, v.y, m, isFixed.x, isFixed.y, rad);
    this.r.add(rad, col, trailDur, trailCol);
  }
  
  // Add the force to the scene
  addForce(f) {
    this.s.addForce(f);
  }
  
  // Add edge to be drawn
  addEdge(e) {
    this.r.addEdge(e);
  }
  
  // Draw the scene, store extra information
  draw() {
    // Background color
    background(110);
    // Draw scale
    this.r.drawMeterGrid();
    // Draw trails
    this.r.drawAllTrails();
    // Draw edges
    this.r.drawAllEdges(s);
    // Draw all particles
    this.r.drawAllParticles(s);
    // Step the scene forward
    this.s.stepScene(min(deltaTime / 1000, 0.02));
  }
  
  // Handle rescaling of the render
  rescale(w, h, meters, offX, offY) {
    this.r.rescale(w, h, meters, offX, offY);
  }
}