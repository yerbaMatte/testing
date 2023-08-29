import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

test('can receive a new user and show it on a list', async () => {
  render(<App />);

  //select input elements
  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button');

  //click and type into input
  //nameInput
  user.click(nameInput);
  user.keyboard('Guba');

  user.click(emailInput);
  user.keyboard('Kufa');

  user.click(button);

  // debbugging !!!!! overview how the test environment behaves
  await waitFor(() => {
    screen.debug();
  });
});
