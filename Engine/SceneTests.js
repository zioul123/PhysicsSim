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

  e.add({x: vec2(2, 4), v: vec2(0,-1), m: 1, 
         isFixed: vec2(false, false), rad: 0.2});
  e.add({x: vec2(4, 4), v: vec2(0, 1), m: 1, 
         isFixed: vec2(false, false), rad: 0.2});
  e.addForce(new GravityForce(4, 2, 3));
}