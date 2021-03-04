import { translateStartPoints } from '../../math/translate-start-points';

let p1, p2;

beforeAll(() => {
  p1 = { x: 0, y: 0 };
  p2 = { x: 15, y: 0 };
})

test('should translate line towards middle of x-axis', () => {
  const width = 500;
  const height = 410;
  const alpha = 15;
  
  expect(translateStartPoints(p1, p2, width, height, alpha)).toEqual({
    start: {
      x: 200,
      y: 0,
    },
    end: {
      x: 215,
      y: 0,
    },
  });
});

test('should keep the line starting at the beginning(to the left) of x-axis', () => {
  const width = 500;
  const height = 410;
  const alpha = 200;
  
  expect(translateStartPoints(p1, p2, width, height, alpha)).toEqual({
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 200,
      y: 0,
    },
  });
});