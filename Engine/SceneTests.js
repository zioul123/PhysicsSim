function SimpleGravity(s) {
  // add(x0, x1, v0, v1, m0, m1, isFixed0, isFixed1, rad0, rad1)
  s.add(3 + 0.5, 4, 5, 3, 1, 1, false, false, 0.1, 0.1);
  s.add(3 + 1.0, 4, 4, 3, 1, 1, false, false, 0.1, 0.1);
  s.add(3 + 1.5, 4, 3, 3, 1, 1, false, false, 0.1, 0.1);
  s.add(3 + 2.0, 4, 2, 3, 1, 1, false, false, 0.1, 0.1);
  s.add(3 + 2.5, 4, 1, 3, 1, 1, false, false, 0.1, 0.1);
  s.add(3 + 3.0, 4, 0, 3, 1, 1, false, false, 0.1, 0.1);
  s.add(3 + 3.5, 4, -1, 3, 1, 1, false, false, 0.1, 0.1);
  s.add(3 + 4.0, 4, -2, 3, 1, 1, false, false, 0.1, 0.1);
  s.add(3 + 4.5, 4, -3, 3, 1, 1, false, false, 0.1, 0.1);
  s.add(3 + 5.0, 4, -4, 3, 1, 1, false, false, 0.1, 0.1);
  s.add(3 + 5.5, 4, -5, 3, 1, 1, false, false, 0.1, 0.1);
  s.add(11, 7, 0, 0, 1, 1, false, false, 0.1, 0.1);

  s.addForce(new SimpleGravityForce(0, -9.81));
}

function OrbitTest(s) {
  s.add(7, 4, 0, 0, 0.331436e6, 0.331436e6, false, false, 0.2, 0.2);
  s.add(8, 4, 0, 6.28316, 1, 1, false, false, 0.1, 0.1);
  s.addForce(new GravityForce(0.000118419, 1, 0));

  s.add(2, 4, 0,-1, 1, 1, false, false, 0.2, 0.2);
  s.add(4, 4, 0, 1, 1, 1, false, false, 0.2, 0.2);
  s.addForce(new GravityForce(4, 2, 3));
}
