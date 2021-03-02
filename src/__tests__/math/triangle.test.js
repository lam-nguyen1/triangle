import { isTriangle, getLastPoint } from '../../math/triangle'

test('should be a triangle', () => {
  const s1 = 3;
  const s2 = 4;
  const s3 = 5;

  expect(isTriangle(s1, s2, s3)).toEqual(true);
});

test('should not be a triangle', () => {
  const s1 = 3;
  const s2 = 4;
  const s3 = 8;

  expect(isTriangle(s1, s2, s3)).toEqual(false);
});

test('should get valid last point', () => {
  const x1 = 10;
  const y1 = 20;
  const alpha = 3;
  const beta = 4;
  const gamma = 5;

  expect(getLastPoint(x1, y1, alpha, beta, gamma)).toEqual({ x: 10, y: 16 });
});
