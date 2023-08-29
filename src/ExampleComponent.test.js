import { render, screen, within } from '@testing-library/react';
import ExampleComponent from './ExampleComponent';

test('the from displays two buttons', () => {
  render(<ExampleComponent />);
  const buttonNames = ['Save', 'Cancel'];

  buttonNames.forEach((element) => {
    const item = screen.getByRole('button', { name: element });
    expect(item).toBeInTheDocument();
  });
});
