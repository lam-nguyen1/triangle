import { element, removeNode } from '../../dom/dom';

test('create div element', () => {
  const div = element('div');

  expect(div.tagName).toEqual('DIV');
});

test('create div element with class name', () => {
  const div = element('div', { className: 'foo' });

  expect(div.tagName).toEqual('DIV');
  expect(div.className).toEqual('foo');
});

test('create div element with text content', () => {
  const div = element('div', { className: 'foo' }, ['bar']);

  expect(div.tagName).toEqual('DIV');
  expect(div.className).toEqual('foo');
  expect(div.textContent).toEqual('bar');
});

test('create div element with a span element as child', () => {
  const span = element('span', { className: 'baz' }, ['Hello there']);
  const div = element('div', { className: 'foo' }, [span]);

  expect(div.tagName).toEqual('DIV');
  expect(div.className).toEqual('foo');
  expect(div.children[0].tagName).toEqual('SPAN');
  expect(div.children[0].className).toEqual('baz');
  expect(div.children[0].textContent).toEqual('Hello there');
});

test('create svg element', () => {
  const svg = element('svg');

  expect(svg.tagName).toEqual('svg');
});

test('create svg element', () => {
  const svg = element('svg');

  expect(svg.tagName).toEqual('svg');
});

test('create svg element with width and height', () => {
  const svg = element('svg', { width: '100', height: '100' });

  expect(svg.tagName).toEqual('svg');
  expect(svg.getAttribute('width')).toEqual('100');
  expect(svg.getAttribute('height')).toEqual('100');
});

test('create svg element with polygon element as child', () => {
  const polygon = element(
    'polygon', 
    { points: '250, 140, 100, 400, 400, 400', class: 'n-polygon' },
  );
  const svg = element('svg', { width: '100', height: '100' }, [polygon]);

  expect(svg.tagName).toEqual('svg');
  expect(svg.getAttribute('width')).toEqual('100');
  expect(svg.getAttribute('height')).toEqual('100');
  expect(svg.children[0].getAttribute('points')).toEqual('250, 140, 100, 400, 400, 400');
  expect(svg.children[0].getAttribute('class')).toEqual('n-polygon');
});

test('remove node', () => {
  const span = element('span', { className: 'baz' }, ['Hello there']);
  const div = element('div', { className: 'foo' }, [span]);

  removeNode(div, span);
  expect(div.children.length).toEqual(0);
});

test('try to remove non-existing node', () => {
  const span = element('span', { className: 'baz' }, ['Hello there']);
  const div = element('div', { className: 'foo' }, [span]);
  const a = element('a');

  removeNode(div, a);
  // a does not exist in the container of div
  expect(div.children.length).toEqual(1);
});