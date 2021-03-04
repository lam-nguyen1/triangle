import { translateStartPoints } from '../../math/translate-start-points';

let p1, p2;

beforeAll(() => {
  p1 = { x: 0, y: 0 };
  p2 = { x: 15, y: 0 };
})

test('should translate line towards middle of x-axis', () => {
  const width = 500;
  const height = 410;
  const length = 15;
  const x = -2;
  
  expect(translateStartPoints(p1, p2, { width, height, x, length })).toEqual({
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
  const length = 200;
  const x = 20;
  
  expect(translateStartPoints(p1, p2, { width, height, x, length })).toEqual({
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