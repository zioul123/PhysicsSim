class GravityForce {
  constructor(g0, g1) {
  	this.g0 = g0;
  	this.g1 = g1;
  }
  // Add the force to be applied to each particle to the res array
  applyForce(x, v, m, nParticles, res) {
  	for (let i = 0; i < nParticles; i++) {
  		res[2*i]   = (m[2*i]   * this.g0);
  		res[2*i+1] = (m[2*i+1] * this.g1);
  	}
  }
}