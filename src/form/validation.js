const validateTriLen = (errors, values, val) => {
  if (!values[val] && Number.isNaN(values[val])) {
    errors[val] = 'This field is required.';
  } else if (Number.isNaN(values[val])) {
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