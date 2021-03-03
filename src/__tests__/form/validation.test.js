import { validate } from '../../form/validation';

let values;

beforeEach(() => {
  values = {
    sideOne: 3,
    sideTwo: 4,
    sideThree: 5,
  };
});

test('all sides are of length zero', () => {
  values.sideOne = 0;
  values.sideTwo = 0;
  values.sideThree = 0;

  expect(validate(values)).toEqual({
    sideOne: 'Length must be larger than zero. Example: 3',
    sideTwo: 'Length must be larger than zero. Example: 3',
    sideThree: 'Length must be larger than zero. Example: 3',
  });
});

test('two sides are valid. One is zero', () => {
  values.sideThree = 0;

  expect(validate(values)).toEqual({
    sideThree: 'Length must be larger than zero. Example: 3',
  });
});

test('one side is NaN', () => {
  values.sideThree = 'Hello';

  expect(validate(values)).toEqual({
    sideThree: 'Must be a number',
  });
});

test('valid sides, should return empty error object', () => {
  expect(Object.keys(validate(values)).length).toEqual(0);
});