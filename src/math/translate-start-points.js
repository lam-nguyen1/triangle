/**
 * Translate the line between p1 and p2 to the middle of the x-axis 
 * if x is smaller than p1.x. 
 * Translate the line to the beginning of the x-axis to the left if x is larger than p2.x. 
 * @param {number} p1 - start point in cartesian coordinates
 * @param {number} p2 - end point in cartesian coordinates
 * @param {number} width - width of view port
 * @param {number} height - height of view port
 * @param {number} height - x coordinate of the last point
 * @param {number} length - distance between p1 and p2
 */
export const translateStartPoints = (p1, p2, { width, height, x, length }) => {
  const calcWidth = Math.min(0.8 * width, height);

  if (x < p1.x) {
    const updatedX = p1.x + (calcWidth / 2);
    return {
      start: {
        x: updatedX,
        y: p1.y,
      },
      end: {
        x: updatedX + length,
        y: p2.y,
      },
    }
  }

  return {
    start: p1,
    end: {
      x: p1.x + length,
      y: p2.y,
    },
  }
}