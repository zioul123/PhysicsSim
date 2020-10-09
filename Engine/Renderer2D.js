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
    // Store screen size and pixel size, and init screen location
    this.h = h;
    this.w = w;
    this.meters = meters;
    this.pixToM = 1 / meters;
    this.offX = 0;
    this.offY = 0;
    // Used when defining scene positions with metric positions
    this.pX = x => x * this.meters + this.offX;
    this.pY = y => this.h - (y * this.meters) - 1 + this.offY;
    // Used when defining scene lengths with metric positions
    this.lX = x => x * this.meters;
    this.lY = y => y * this.meters;
    // Used to pause trail updates
    this.isPlaying = true;
  }
  
  // Handle rescaling of the render
  rescale(w, h, meters, offX, offY) {
    this.h = h;
    this.w = w;
    this.meters = meters;
    this.pixToM = 1 / meters;
    this.offX = offX;
    this.offY = offY;
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
  drawAllTrails(s) {
    push()
    strokeWeight(0.5);
    for (let i = 0; i < this.trails.length; i++) {
      const num = this.trails[i].getLength();
      const offset = this.trails[i].getOffset();
      const queue = this.trails[i].getQ();
      const col = this.trailCols[i];
      
      stroke(this.trailCols[i]);
      // First draw the head of the trail, since the current pos might
      // not be part of the trail
      col.setAlpha(255);
      stroke(col);
      if (num > 0)
        line(this.pX(queue[offset + num - 1].x.x), 
             this.pY(queue[offset + num - 1].x.y),
             this.pX(s.getX(i).x), 
             this.pY(s.getX(i).y))
      // Draw the rest
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
        // Update trail "properly" if playing
        if (this.isPlaying) {
          // Store new position if it's far away enough in time.
          // We don't want to store more than 30 previous positions.
          const num = this.trails[i].getLength();
          const offset = this.trails[i].getOffset();
          const queue = this.trails[i].getQ();
          if (num == 0 || currTime - queue[offset+num-1].t >= this.trailDurs[i] * 33)
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
        // If scene is paused, we just keep pushing the trail's time into the future
        else {
          const num = this.trails[i].getLength();
          const offset = this.trails[i].getOffset();
          const queue = this.trails[i].getQ();
          for (let i = 0; i < num; i++) {
            queue[offset + i].t += deltaTime;
          }
        }
      }
    }
    pop();
  }

  // Clear the trails when scene is reset
  resetTrails() {
    for (let i = 0; i < s.nParticles; i++) {
      this.trails[i] = new Queue();
    }
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
    for (let i = -ceil(this.pixToM * this.offX); lX(i) + this.offX < this.w; i += 1) {
      // console.log(i);
      strokeWeight(0.5);
      line(pX(i), pY(0), pX(i), pY(this.h));
      strokeWeight(0);
      text(i, 3 + pX(i), this.h- 1);
    }
    
    // Horizontal lines
    for (let i = ceil(this.pixToM * this.offY); lY(i) - this.offY < this.h; i += 1) {
      strokeWeight(0.5);
      // Line is a bit biased, hence the +1
      line(pX(0), pY(i) + 1, pX(this.w), pY(i) + 1);
      strokeWeight(0);
      // Cut off so as not to overlap x-axis text
      if (pY(i) < this.h - 12) text(i, 3, pY(i));
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