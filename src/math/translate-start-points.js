/**
 * Translate the line between p1 and p2 to the middle of the x-axis 
 * if alpha is small enough. 
 * @param {number} p1 - start point in cartesian coordinates
 * @param {number} p2 - end point in cartesian coordinates
 * @param {number} width - width of view port
 * @param {number} height - height of view port
 * @param {number} alpha - distance between p1 and p2
 */
export const translateStartPoints = (p1, p2, width, height, alpha) => {
  const calcWidth = Math.min(0.8 * width, height);

  if (alpha < 0.5 * calcWidth) {
    const updatedX = p1.x + (calcWidth / 2);
    return {
      start: {
        x: updatedX,
        y: p1.y,
      },
      end: {
        x: updatedX + alpha,
        y: p2.y,
      },
    }
  }

  return {
    start: p1,
    end: {
      x: p1.x + alpha,
      y: p2.y,
    },
  }
}