function SimpleGravity(e) {
  let vec2 = createVector;
  // add(x0, x1, v0, v1, m, isFixed0, isFixed1, radius)
  e.add({ x: vec2(2 + 0.5, 4), v: vec2( 5, 3), m: 1, 
          isFixed: vec2(false, false), rad: 0.1});
  e.add({ x: vec2(2 + 1.0, 4), v: vec2( 4, 3), m: 1, 
          isFixed: vec2(false, false), rad: 0.1});
  e.add({ x: vec2(2 + 1.5, 4), v: vec2( 3, 3), m: 1, 
          isFixed: vec2(false, false), rad: 0.1});
  e.add({ x: vec2(2 + 2.0, 4), v: vec2( 2, 3), m: 1, 
          isFixed: vec2(false, false), rad: 0.1});
  e.add({ x: vec2(2 + 2.5, 4), v: vec2( 1, 3), m: 1, 
          isFixed: vec2(false, false), rad: 0.1});
  e.add({ x: vec2(2 + 3.0, 4), v: vec2( 0, 3), m: 1, 
          isFixed: vec2(false, false), rad: 0.1});
  e.add({ x: vec2(2 + 3.5, 4), v: vec2(-1, 3), m: 1, 
          isFixed: vec2(false, false), rad: 0.1});
  e.add({ x: vec2(2 + 4.0, 4), v: vec2(-2, 3), m: 1, 
          isFixed: vec2(false, false), rad: 0.1});
  e.add({ x: vec2(2 + 4.5, 4), v: vec2(-3, 3), m: 1, 
          isFixed: vec2(false, false), rad: 0.1});
  e.add({ x: vec2(2 + 5.0, 4), v: vec2(-4, 3), m: 1, 
          isFixed: vec2(false, false), rad: 0.1});
  e.add({ x: vec2(2 + 5.5, 4), v: vec2(-5, 3), m: 1, 
          isFixed: vec2(false, false), rad: 0.1});
  e.add({ x: vec2(8, 6), v: vec2(0, 0), m: 1, 
          isFixed: vec2(false, false), rad: 0.1});

  e.addForce(new SimpleGravityForce(0, -9.81));
}

function OrbitTest(e) {
  let vec2 = createVector;
  
  e.add({x: vec2(7, 4), v: vec2(0, 0), m: 0.331436e6, 
         isFixed: vec2(false, false), rad: 0.2});
  e.add({x: vec2(8, 4), v: vec2(0, 6.28316), m: 1, 
         isFixed: vec2(false, false), rad: 0.1});
  e.addForce(new GravityForce(0.000118419, 1, 0));
  e.addEdge(new Edge(EDGE_TYPE.GRAVITY, 0, 1));
  
  e.add({x: vec2(2, 4), v: vec2(0,-1), m: 1, 
         isFixed: vec2(false, false), rad: 0.2});
  e.add({x: vec2(4, 4), v: vec2(0, 1), m: 1, 
         isFixed: vec2(false, false), rad: 0.2});
  e.addForce(new GravityForce(4, 2, 3));
  e.addEdge(new Edge(EDGE_TYPE.GRAVITY, 2, 3));
  
}

function SpringTest(e) {
  let vec2 = createVector;
  
  for (let i = 0; i < 11; i++) {
    e.add({x: vec2(0.5, 5.5 - (i / 10 * 4)), isFixed: vec2(false, true)});
    e.add({x: vec2(2.5, 5.5 - (i / 10 * 4)), isFixed: vec2(false, true)});
    // k, i, j, b, l0
    e.addForce(new SpringForce(5, i*2, i*2+1, i*0.1, 1.4));
    e.addEdge(new Edge(EDGE_TYPE.SPRING, i*2, i*2+1));
  }
  let o = 22, imax = 14
  for (let i = 0; i < imax; i++) {
    let isFirst2 = i < 2;
    e.add({x: vec2(3+i*0.4, 5), isFixed: vec2(isFirst2, isFirst2)});
    e.add({x: vec2(3+i*0.4, 4.6), isFixed: vec2(isFirst2, isFirst2)});
    // k, i, j, b, l0
    // Springs vertical
    const k = 1000, b=1;
    e.addForce(new SpringForce(k, i*2+o, i*2+1+o, b, 0.4));
    e.addEdge(new Edge(EDGE_TYPE.SPRING, i*2+o, i*2+1+o));
    if (i < imax - 1) {
      // Horizontal
      e.addForce(new SpringForce(k, i*2+o, (1+i)*2+o, b, 0.4));
      e.addEdge(new Edge(EDGE_TYPE.SPRING, i*2+o, (1+i)*2+o));      
      e.addForce(new SpringForce(k, i*2+o+1, (1+i)*2+o+1, b, 0.4));
      e.addEdge(new Edge(EDGE_TYPE.SPRING, i*2+o+1, (1+i)*2+o+1));
      // Diagonal
      e.addForce(new SpringForce(k, i*2+o, (1+i)*2+o+1, b, 0.56568542494));
      e.addEdge(new Edge(EDGE_TYPE.SPRING, i*2+o, (1+i)*2+o+1));      
      e.addForce(new SpringForce(k, i*2+o+1, (1+i)*2+o, b, 0.56568542494));
      e.addEdge(new Edge(EDGE_TYPE.SPRING, i*2+o+1, (1+i)*2+o));
    }
  }
  e.addForce(new SimpleGravityForce(0, -0.75));

}


function DragTest(e) {
  let vec2 = createVector;
  
  e.add({x: vec2(2, 4  ), v: vec2(0, 1) });
  e.add({x: vec2(1, 4.5), v: vec2(0, 0) });
  e.add({x: vec2(3, 4.5), v: vec2(0, 0) });
  e.addForce(new DragForce(2));
  e.addEdge(new Edge(EDGE_TYPE.SPRING, 1, 2));

}