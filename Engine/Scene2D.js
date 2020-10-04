// The class that contains all scene information
class Scene2D {
  constructor(stepFunction) {
    // Particle positions, velocities, masses, and whether they're affected by forces.
    // Stored as an array of 2D vectors
    this.x = [];
    this.v = [];
    this.m = [];
    this.fixed = [];
    // Particle properties
    this.radii = [];
    // All forces in the scene
    this.forces = [];
    // Total number of particles and forces in the scene
    this.nParticles = 0;
    this.nForces = 0;
    // The step function
    this.stepFunction = stepFunction;
  }

  // =======
  // Fillers
  // =======
  add(x0, x1, v0, v1, m0, m1,
    isFixed0, isFixed1, rad0, rad1) {
    this.x.push(createVector(x0, x1));
    this.v.push(createVector(v0, v1));
    this.m.push(createVector(m0, m1));
    this.radii.push(createVector(rad0, rad1));
    this.fixed.push(createVector(isFixed0, isFixed1));
    this.nParticles++;
  }

  addForce(f) {
    this.forces.push(f);
    this.nForces++;
  }

  // =======
  // Setters
  // =======

  // Sets the position of particle i to (x0, x1)
  setX(i, x0, x1) {
    this.x[i].x = x0;
    this.x[i].y = x1;
  }
  // Sets the velocity of particle i to (v0, v1)
  setV(i, v0, v1) {
    this.v[i].x = v0;
    this.v[i].y = v1;
  }
  // Sets the mass of particle i to (m0, m1)
  setM(i, m0, m1) {
    this.m[i].x = m0;
    this.m[i].y = m1;
  }
  // Sets the fixed status of particle i to (fixed0, fixed1)
  setFixed(i, fixed0, fixed1) {
    this.fixed[i].x = fixed0;
    this.fixed[i].y = fixed1;
  }

  // =======
  // Getters
  // =======

  // Get the ith particle's position
  getX(i) {
    return this.x[i];
  }
  // Get the ith particle's velocity
  getV(i) {
    return this.v[i];
  }
  // Get the ith particle's mass
  getM(i) {
    return this.m[i];
  }
  // Get the ith particle's fixed status
  getFixed(i) {
    return this.fixed[i];
  }
  // Get the ith particle's radii
  getRadii(i) {
    return this.radii[i];
  }

  // Compute total KE in the scene
  computeEnergy() {
    let totalKE = 0;
    for (let i = 0; i < this.nParticles; i++) {
      // Get the x and y velocities and masses
      let vi = this.getV(i);
      let mi = this.getM(i);
      // Add to the total KE
      totalKE += 1 / 2 * (mi.x * vi.x * vi.x +
        mi.y * vi.y * vi.y);
    }
    return totalKE;
  }

  // =======
  // Stepper
  // =======

  // Return the forces on each particle
  accumulateForces() {
    // Create an array nParticles long
    let res = [];
    for (let i = 0; i < this.nParticles; i++) {
      res.push(createVector(0, 0));
    }
    // Loop through and accumulate all forces
    for (let i = 0; i < this.nForces; i++) {
      this.forces[i].applyForce(this.x, this.v, this.m, this.nParticles, res);
    }
    return res;
  }

  stepScene(dt) {
    this.stepFunction(this, dt);
  }
}