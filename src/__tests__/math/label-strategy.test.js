import { getLabelStartForSide1, getLabelStart } from '../../math/label-strategy';

test('should place label for side 1', () => {
  const p1 = { x: 0, y: 0 };
  const p2 = { x: 15, y: 20 };

  expect(getLabelStartForSide1(p1, p2, 10)).toEqual({ x: 7.5, y: 10 });
});

test('should place label for side 1 with no padding', () => {
  const p1 = { x: 0, y: 0 };
  const p2 = { x: 15, y: 20 };

  expect(getLabelStartForSide1(p1, p2, 0)).toEqual({ x: 7.5, y: 0 });
});

test('should place label in the middle of two points with no padding', () => {
  const p1 = { x: 10, y: 20 };
  const p2 = { x: 30, y: 60 };

  expect(getLabelStart(p1, p2, 0)).toEqual({ x: 20, y: 40 });
});

test('should place label in the middle of two points with padding to the right', () => {
  const p1 = { x: 10, y: 20 };
  const p2 = { x: 30, y: 60 };

  expect(getLabelStart(p1, p2, 5)).toEqual({ x: 25, y: 40 });
});

test('should place label in the middle of two points with padding to the left', () => {
  const p1 = { x: 30, y: 60 };
  const p2 = { x: 10, y: 20 };

  expect(getLabelStart(p1, p2, -5)).toEqual({ x: 15, y: 40 });
});