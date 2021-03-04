import { getAnchoringPoints } from '../../math/anchoring-points';

test('should use height as basis to draw line', () => {
  const width = 780;
  const height = 600;
  
  expect(getAnchoringPoints(width, height)).toEqual({
    p1: {
      x: 60,
      y: 540,
    },
    p2: {
      x: 540,
      y: 540,
    },
    dist: 480,
  });
});

test('should use width as basis to draw line', () => {
  const width = 500;
  const height = 600;
  
  expect(getAnchoringPoints(width, height)).toEqual({
    p1: {
      x: 50,
      y: 540,
    },
    p2: {
      x: 450,
      y: 540,
    },
    dist: 400,
  });
});

test('should not draw line since width and height are zero', () => {
  const width = 0;
  const height = 0;
  
  expect(getAnchoringPoints(width, height)).toEqual({
    p1: {
      x: 0,
      y: 0,
    },
    p2: {
      x: 0,
      y: 0,
    },
    dist: 0,
  });
});