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
let dot = p5.Vector.dot;

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

class DragForce {
  // b: damping factor
  constructor(b) {
    this.b = b;
  }
  // Add the force to be applied to each particle to the res array,
  // by equation F = -Bv
  applyForce(x, v, m, nParticles, res) {
    for (let i = 0; i < nParticles; i++) {
      res[i] = add(res[i], mult(v[i], -this.b));
    }
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
    let i = this.i;
    let j = this.j;

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
    let i = this.i;
    let j = this.j;

    // Get distance
    let jToI = sub(x[i], x[j]);
    let l = jToI.mag();

    return -m_G * m[i] * m[j] / l;
  }
}

class SpringForce {
  // k: Spring constant
  // i, j: End points
  // b: damping factor
  // l0: rest length
  constructor(k, i, j, b, l0) {
    this.k = k;
    this.b = b;
    this.l0 = l0;
    this.i = i;
    this.j = j;
  }
  // Add the force to be applied to each particle to the res array,
  // by equation F = mg
  applyForce(x, v, m, nParticles, res) {
    let i = this.i;
    let j = this.j;

    // Get distance
    let jToI = sub(x[i], x[j]);
    let l = jToI.mag();
    let n = div(jToI, l);

    // Force on i
    let F = mult(n, this.k * (l - this.l0));

    // Damping force
    let nDotDiffV = dot(sub(v[i], v[j]), n);
    let damp = mult(n, this.b * nDotDiffV); 
  
    // Total force
    let totalForce = add(F, damp);

    // Add the forces
    res[j] = add(res[j], totalForce);
    res[i] = sub(res[i], totalForce);
  }

  // Compute the total potential energy of particles by 
  // U = 1/2 * k * (l - l0) ^ 2
  computeEnergy(x, v, m, nParticles) {
    let i = this.i;
    let j = this.j;

    // Get distance
    let jToI = sub(x[i], x[j]);
    let l = jToI.mag();

    E = 1 / 2 * this.k * (l - this.l0) * (l - this.l0);
  }
}
