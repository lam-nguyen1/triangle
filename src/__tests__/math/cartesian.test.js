import { getDist } from '../../math/cartesian'

test('should get distance between two points', () => {
  const p1 = { x: 0, y: 0 };
  const p2 = { x: 15, y: 20 };

  expect(getDist(p1, p2)).toEqual(25);
});

test('should get distance in x-direction', () => {
  const p1 = { x: 0, y: 0 };
  const p2 = { x: 15, y: 0 };

  expect(getDist(p1, p2)).toEqual(15);
});

test('should get distance in y-direction', () => {
  const p1 = { x: 0, y: 0 };
  const p2 = { x: 0, y: 15 };

  expect(getDist(p1, p2)).toEqual(15);
});

test('should be zero for the same point', () => {
  const p1 = { x: 30, y: 30 };
  const p2 = { x: 30, y: 30 };

  expect(getDist(p1, p2)).toEqual(0);
});
