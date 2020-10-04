// The class that contains all scene information related to
// drawing of 2D particles.
class Renderer2D {
  constructor(w, h, meters) {
    // Per particle drawing properties
    this.radii = [];
    this.colors = [];
    this.trailDurs = [];
    this.trailCols = [];
    // Store screen size and pixel size
    this.h = h;
    this.w = w;
    this.meters = meters;
    this.pixToM = 1 / meters;
    // Used when defining scene positions with metric positions
    this.pX = x => x * meters;
    this.pY = y => h - (y * meters) - 1
    // Used when defining scene lengths with metric positions
    this.lX = x => x * meters;
    this.lY = y => y * meters;
  }
  
  add(radius, col, trailDur, trailCol) {
    this.radii.push(radius);
    this.colors.push(col);
    this.trailDurs.push(trailDur)
    this.trailCols.push(trailCol) 
  }

  // Draw all particles
  drawAllParticles(s) {
    // Aliases
    const pX = this.pX; const lX = this.lX; const pY = this.pY; const lY = this.lY;

    strokeWeight(0.5);

    stroke(color(0, 0, 0));
    for (let i = 0; i < s.nParticles; i++) {
      fill(this.colors[i]);
      let ri = this.radii[i];
      let xi = s.getX(i);
      ellipse(pX(xi.x), pY(xi.y), lX(ri), lY(ri));
    }
  }

  // Draws "graph paper lines" for scale
  drawMeterGrid() {
    // Aliases
    const pX = this.pX; const lX = this.lX; const pY = this.pY; const lY = this.lY;

    textAlign(LEFT, BOTTOM);
    stroke(color(255, 255, 255));
    fill(color(255, 255, 255));
    // Vertical lines
    for (let i = 0; lX(i) < SCENE_WIDTH; i += 1) {
      strokeWeight(0.5);
      line(pX(i), pY(0), pX(i), pY(SCENE_HEIGHT));
      strokeWeight(0);
      text(i, 3 + pX(i), pY(0));
    }
    // Horizontal lines
    for (let i = 0; lY(i) < SCENE_HEIGHT; i += 1) {
      strokeWeight(0.5);
      // Line is a bit biased, hence the +1
      line(pX(0), pY(i) + 1, pX(SCENE_WIDTH), pY(i) + 1);
      strokeWeight(0);
      if (i != 0) text(i, 3 + pX(0), pY(i));
    }
  }
}