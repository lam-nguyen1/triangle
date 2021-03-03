const validateTriLen = (errors, values, val) => {
  if (values[val].length === 0) {
    errors[val] = 'This field is required. Please input a number.';
  } else if (typeof values[val] !== 'number') {
    errors[val] = 'Must be a number';
  } else if (values[val] <= 0) {
    errors[val] = 'Length must be larger than zero. Example: 3';
  }
}

export const validate = values => {
  const errors = {};
  validateTriLen(errors, values, 'sideOne');
  validateTriLen(errors, values, 'sideTwo');
  validateTriLen(errors, values, 'sideThree');

  return errors;
};