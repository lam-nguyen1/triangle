export const isTriangle = (s1, s2, s3) => {
  return s1 + s2 > s3 && s1 + s3 > s2 && s2 + s3 > s1;
}

/**
 * Returns the last point to draw the triangle
 * @param {number} x1 - x-coordinate of known point
 * @param {number} y1 - y-coordinate of known point
 * @param {number} alpha - side of triangle
 * @param {number} beta - different side of triangle
 * @param {number} gamma - last side of triangle
 */
export const getLastPoint = (x1, y1, alpha, beta, gamma) => {
  const x = (beta ** 2 - gamma ** 2 + 2 * x1 * alpha + alpha ** 2) / (2 * alpha);
  const y = y1 - Math.sqrt(beta ** 2 - (x - x1) ** 2);

  return { x, y };
}