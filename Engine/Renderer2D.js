// // The class that contains all scene information
// class Scene2D {
//   constructor() {
//     // Particle positions, velocities, masses, and whether they're affected by forces.
//     // Stored as a flattened 2d array, indexed as [ x0, y0, x1, y1, x2, y2, ... ]
//     this.x = [];
//     this.v = [];
//     this.m = [];
//     this.fixed = [];
//     // Particle properties
//     this.radii = [];
//     // All forces in the scene
//     this.forces = [];
//     // Total number of particles and forces in the scene
//     this.nParticles = 0;
//     this.nForces = 0;
//   }
  
//   // =======
//   // Fillers
//   // =======
//   add(x0, x1, v0, v1, m0, m1, isFixed0, isFixed1, rad0, rad1) {
//   	this.x.push(x0);           this.x.push(x1);
//     this.v.push(v0);           this.v.push(v1);
//   	this.m.push(m0);           this.m.push(m1);
//   	this.radii.push(rad0);     this.radii.push(rad1);
//   	this.fixed.push(isFixed0); this.fixed.push(isFixed1);
//   	this.nParticles++;
//   } 

//   addForce(f) {
//   	this.forces.push(f);
//   	this.nForces++;
//   }