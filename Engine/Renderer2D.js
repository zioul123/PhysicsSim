// Used to store information about a drawn edge
class Edge {
  constructor(edgeType, i, j) {
    this.edgeType = edgeType;
    this.i = i;
    this.j = j;
  }
}
const EDGE_TYPE = {
  SPRING: 0, GRAVITY: 1
};

// Used to store previous time frame information. 
// x is a vector2d, t is the time this position was drawn.
class PosInfo {
  constructor(t, x) { 
    this.t = t;
    this.x = x; 
  }
}

// The class that contains all scene information related to
// drawing of 2D particles.
class Renderer2D {
  constructor(w, h, meters) {
    // Per particle drawing properties
    this.radii = [];
    this.colors = [];
    this.trailDurs = [];
    this.trailCols = [];
    // Edges in the gscene to be drawn
    this.edges = [];
    this.nEdges = 0;
    // Used to store trail information
    this.trails = [];
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
  
  // Add a particle for rendering, and initialize its trail.
  add(radius, col, trailDur, trailCol) {
    this.radii.push(radius);
    this.colors.push(col);
    this.trailDurs.push(trailDur);
    this.trailCols.push(trailCol);
    this.trails.push(new Queue());
  }
  
  // Add edge to be drawn
  addEdge(e) {
    this.edges.push(e);
    this.nEdges++;
  }

  // Draw all edges
  drawAllEdges(s) {
    // Aliases
    const pX = this.pX; const lX = this.lX; 
    const pY = this.pY; const lY = this.lY;

    push();
    strokeWeight(0.5);
    for (let i = 0; i < this.nEdges; i++) {
      let xi = s.getX(this.edges[i].i);
      let xj = s.getX(this.edges[i].j);
      stroke(this.edgeColor(this.edges[i].edgeType));
      fill(this.edgeColor(this.edges[i].edgeType));
      line(pX(xi.x), pY(xi.y), pX(xj.x), pY(xj.y));
    }
    pop();
  }
  
  // Draw particle trails
  drawAllTrails() {
    push()
    strokeWeight(0.5);
    for (let i = 0; i < this.trails.length; i++) {
      const num = this.trails[i].getLength();
      const offset = this.trails[i].getOffset();
      const queue = this.trails[i].getQ();
      const col = this.trailCols[i];
      
      stroke(this.trailCols[i]);
      for (let j = 0; j < num-1; j++) {
        col.setAlpha(j / num * 255)
        stroke(col);
        line(this.pX(queue[j+offset].x.x), 
             this.pY(queue[j+offset].x.y),
             this.pX(queue[j+offset+1].x.x), 
             this.pY(queue[j+offset+1].x.y))
      }
    }
    pop()
  }
  
  // Draw all particles
  drawAllParticles(s) {
    // Aliases
    const pX = this.pX; const lX = this.lX; 
    const pY = this.pY; const lY = this.lY;
    
    // Get current drawing time
    let currTime = millis();
    
    push();
    // Default outline
    strokeWeight(0.5);
    stroke(color(0, 0, 0));
    for (let i = 0; i < s.nParticles; i++) {
      // Get properties and set color
      fill(this.colors[i]);
      let ri = this.radii[i];
      let xi = s.getX(i);
      ellipse(pX(xi.x), pY(xi.y), lX(ri), lY(ri));
      // Store this info for the trail
      if (this.trailDurs[i] != 0) {
        // Store new position
        this.trails[i].enqueue(new PosInfo(
          currTime, 
          createVector(xi.x, xi.y)
        ));
        // Clear expired trails
        while (this.trails[i].getLength() > 0 &&
               this.trails[i].peek().t < currTime - this.trailDurs[i]*1000) {
          this.trails[i].dequeue();
        }
      }
    }
    pop();
  }

  // Draws "graph paper lines" for scale
  drawMeterGrid() {
    // Aliases
    const pX = this.pX; const lX = this.lX; 
    const pY = this.pY; const lY = this.lY;

    push()
    
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
    
    pop();
  }
  
  edgeColor(edgeType) {
    switch (edgeType) {
      case EDGE_TYPE.SPRING: return color(232, 139, 58);
      case EDGE_TYPE.GRAVITY: default: return color(208); 
    }
  };
}