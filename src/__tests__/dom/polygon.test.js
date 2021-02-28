import polygon from '../../dom/polygon';

test('create empty polygon element', () => {
  const poly = polygon();
  expect(poly.getAttribute('points').length).toEqual(0);
});

test('create 3-polygon element', () => {
  const poly = polygon(250, 140, 100, 400, 400, 400);
  expect(poly.getAttribute('points')).toEqual('250,140 100,400 400,400');
});