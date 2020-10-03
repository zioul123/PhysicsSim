// The class that contains all scene information
class Scene2D {
  constructor() {
    // Particle positions, velocities, masses, and whether they're affected by forces.
    // Stored as a flattened 2d array, indexed as [ x0, y0, x1, y1, x2, y2, ... ]
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
  }
  
  // =======
  // Fillers
  // =======
  add(x0, x1, v0, v1, m0, m1, isFixed0, isFixed1, rad0, rad1) {
  	this.x.push(x0);           this.x.push(x1);
    this.v.push(v0);           this.v.push(v1);
  	this.m.push(m0);           this.m.push(m1);
  	this.radii.push(rad0);     this.radii.push(rad1);
  	this.fixed.push(isFixed0); this.fixed.push(isFixed1);
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
    this.x[2*i]   = x0;
    this.x[2*i+1] = x1;
  }
  // Sets the velocity of particle i to (v0, v1)
  setV(i, v0, v1) {
    this.v[2*i]   = v0;
    this.v[2*i+1] = v1;
  }
  // Sets the mass of particle i to (m0, m1)
  setM(i, m0, m1) {
    this.m[2*i]   = m0;
    this.m[2*i+1] = m1;
  }
  // Sets the fixed status of particle i to (fixed0, fixed1)
  setFixed(i, fixed0, fixed1) {
    this.fixed[2*i]   = fixed0;
    this.fixed[2*i+1] = fixed1;
  }
  
  // =======
  // Getters
  // =======
  
  // Get the ith particle's position
  getX(i) {
    return [ this.x[2*i], this.x[2*i+1] ];
  }
  // Get the ith particle's velocity
  getV(i) {
    return [ this.v[2*i], this.v[2*i+1] ];
  }
  // Get the ith particle's mass
  getM(i) {
    return [ this.m[2*i], this.m[2*i+1] ];
  }
  // Get the ith particle's fixed status
  getFixed(i) {
    return [ this.fixed[2*i], this.fixed[2*i+1] ];
  }
  // Get the ith particle's radii
  getRadii(i) {
    return [ this.radii[2*i], this.radii[2*i+1] ];
  }

  // =======
  // Stepper
  // =======

  // Return the forces on each particle
  accumulateForces() {
  	// Create an array 2*nParticles long
  	let res = [];
  	for (let i = 0; i < 2*this.nParticles; i++) {
  		res.push(0);
  	}
  	// Loop hrough and accumulate all forces
  	for (let i = 0; i < this.nForces; i++) {
			this.forces[i].applyForce(this.x, this.v, this.m, this.nParticles, res);
  	}
  	return res;
  }

  // Step the scene by time dt
  stepScene(dt) {
  	let f = this.accumulateForces();
	  // Step each particle's position and velocity
	  for (let i = 0; i < this.nParticles; i++) {
	    // Get current state of this particle
	    let [ x0, x1 ] = this.getX(i);
	    let [ v0, v1 ] = this.getV(i);
	    let [ m0, m1 ] = this.getM(i);
	    let [ fixed0, fixed1 ] = this.getFixed(i);

	    // Update position with x = x0 + v0 * dt 
	    this.setX(i, 
	    	x0 + dt * v0, 
	    	x1 + dt * v1
	    );
	    
	    // Update velocity by all forces with v = v0 + M^(-1) * f * dt,
	    // unless the axis is fixed
	    this.setV(i,
	        v0 + (fixed0 ? 0 : dt * (1. / m0) * f[2*i]),
	        v1 + (fixed1 ? 0 : dt * (1. / m1) * f[2*i+1])
	    );      
	  }
  }
}