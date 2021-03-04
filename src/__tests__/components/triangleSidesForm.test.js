import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TriangleSidesForm } from '../../components/triangleSidesForm';

beforeAll(() => {
  /**
   * jsdom does not support layouting, therefore mock getBoundingClientRect
   *  so that we can calculate the sides of our triangles.
   */
  Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', { configurable: true, value: () => {
    return { height: 500, width: 500 };
  } });
})

test('setting valid triangle sides and rendering triangle', async () => {
  const handleRender = jest.fn();

  const { container } = render(<TriangleSidesForm onRender={handleRender} />);

  userEvent.type(screen.getByLabelText(/Enter length of triangle side 1/i), '3');
  userEvent.type(screen.getByLabelText(/Enter length of triangle side 2/i), '4');
  userEvent.type(screen.getByLabelText(/Enter length of triangle side 3/i), '5');

  fireEvent.click(screen.getByText('Set sides'));

  await waitFor(() => {
    expect(container.querySelector('svg')).toBeTruthy();
    expect(handleRender).toHaveBeenCalledWith({
      sideOne: 3,
      sideTwo: 4,
      sideThree: 5,
    });
  });
});

test('should not render triangle', async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  const handleRender = jest.fn();

  const { container } = render(<TriangleSidesForm onRender={handleRender} />);

  userEvent.type(screen.getByLabelText(/Enter length of triangle side 1/i), '3');
  userEvent.type(screen.getByLabelText(/Enter length of triangle side 2/i), '4');
  userEvent.type(screen.getByLabelText(/Enter length of triangle side 3/i), '8');

  fireEvent.click(screen.getByText('Set sides'));

  await waitFor(() => {
    expect(container.querySelector('svg')).toBeFalsy();
  });
});