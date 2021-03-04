import { getDist } from './cartesian';

/**
 * Anchors the first two points along the x-axis 
 * @param {number} width 
 * @param {number} height 
 * @returns object representing the first two points and the maximum distance between them
 */
export const getAnchoringPoints = (width, height) => {
  let p1, p2;
  let dist;

  // Account for margin
  if (0.8 * width >= height) {
    // Use smallest of 0.8 * width and height to not overflow triangle 
    p1 = {
      x: 0.1 * height,
      y: 0.9 * height,
    };

    p2 = {
      x: 0.9 * height,
      y: 0.9 * height,
    };

    dist = getDist(p1, p2);
  } else {
    p1 = {
      x: 0.1 * width,
      y: 0.9 * height,
    };

    p2 = {
      x: 0.9 * width,
      y: 0.9 * height,
    };

    dist = getDist(p1, p2);
  }

  return { p1, p2, dist };
}