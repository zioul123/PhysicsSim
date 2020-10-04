// Step the scene by time dt using explicit Euler
function ExplicitEuler(s, dt) {
  // Compute the effect of all forces in the scene
  let f = this.accumulateForces();
  // Step each particle's position and velocity
  for (let i = 0; i < s.nParticles; i++) {
    // Get current state of this particle
    let xi = s.getX(i);
    let vi = s.getV(i);
    let mi = s.getM(i);
    let fixedi = s.getFixed(i);

    // Update position with x = x0 + v0 * dt 
    s.setX(i,
      xi.x + dt * vi.x,
      xi.y + dt * vi.y
    );

    // Update velocity by all forces with v = v0 + M^(-1) * f * dt,
    // unless the axis is fixed
    s.setV(i,
      vi.x + (fixedi.x ? 0 : dt / mi.x * f[i].x),
      vi.y + (fixedi.y ? 0 : dt / mi.y * f[i].y)
    );
  }
}

// Step the scene by time dt using symplectic Euler
function SymplecticEuler(s, dt) {
  // Compute the effect of all forces in the scene
  let f = s.accumulateForces();
  // Step each particle's position and velocity
  for (let i = 0; i < s.nParticles; i++) {
    // Get current state of this particle
    let xi = s.getX(i);
    let vi = s.getV(i);
    let mi = s.getM(i);
    let fixedi = s.getFixed(i);

    // Update velocity by all forces with v = v0 + M^(-1) * f * dt,
    // unless the axis is fixed
    s.setV(i,
      vi.x + (fixedi.x ? 0 : dt / mi.x * f[i].x),
      vi.y + (fixedi.y ? 0 : dt / mi.y * f[i].y)
    );

    // Update position with x = x0 + v0 * dt 
    s.setX(i,
      xi.x + dt * vi.x,
      xi.y + dt * vi.y
    );
  }
}