// Forces are defined as 
// Force { 
//   applyForce(x, v, m, nParticles, res);
//   computeEnergy(x, v, m, nParticles);
// }
// applyForce() should add the effect of forces acting on
// the supplied state of the system to their respective 
// particles, on the 2D vector res[i] for each ith particle

let div = p5.Vector.div;
let add = p5.Vector.add;
let sub = p5.Vector.sub;
let mult = p5.Vector.mult;

class SimpleGravityForce {
  constructor(g0, g1) {
  	this.g = createVector(g0, g1);
  }
  // Add the force to be applied to each particle to the res array,
  // by equation F = mg
  applyForce(x, v, m, nParticles, res) {
  	for (let i = 0; i < nParticles; i++) {
  		res[i].x += (m[i] * this.g.x);
  		res[i].y += (m[i] * this.g.y);
  	}
  }

  // Compute the total potential energy of particles by U(x) = -mgx
  computeEnergy(x, v, m, nParticles) {
    let res = 0;
    for (let i = 0; i < nParticles; i++) {
      res -= (m[i] * x[i].x * this.g.x +
              m[i] * x[i].y * this.g.y);
    }
    return res;
  }
}

class GravityForce {
  constructor(G, i, j) {
  	this.G = G;
    this.i = i;
    this.j = j;
  }
  // Add the force to be applied to each particle to the res array,
  // by equation F = mg
  applyForce(x, v, m, nParticles, res) {
    let i = this.i; let j = this.j;
    
    // Get distance
    let jToI = sub(x[i], x[j]);
    let l = jToI.mag();
    let n = div(jToI, l);

    // Force on i
    // F0 = m_G * m[i] * m[j] * n / l^2;
    let F = mult(div(mult(n, m[i] * m[j]), l * l), this.G);

    // Add the forces
    res[j] = add(res[j], F);
    res[i] = sub(res[i], F);
  }

  // Compute the total potential energy of particles by U(x) = -mgx
  computeEnergy(x, v, m, nParticles) {
    let i = this.i; let j = this.j;
    
    // Get distance
    let jToI = sub(x[i], x[j]);
    let l = jToI.mag();

    return -m_G * m[i] * m[j] / l;
  }
}