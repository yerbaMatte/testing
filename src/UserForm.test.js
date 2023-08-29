import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows two inputs and a button', () => {
  render(<UserForm />);

  // select elements
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  // assertion
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test('it calls onUserAdd when the form is submitted', () => {
  // mock function
  const mock = jest.fn();

  // rendering
  render(<UserForm onUserAdd={mock} />);

  // select elements
  const inputName = screen.getByRole('textbox', { name: /name/i });
  const inputEmail = screen.getByRole('textbox', { name: /email/i });

  // simulate typing
  user.click(inputName);
  user.keyboard('jane');

  user.click(inputEmail);
  user.keyboard('jane@gmail.com');

  // find the button and submit the form
  const button = screen.getByRole('button');
  user.click(button);

  // assertion
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: 'jane', email: 'jane@gmail.com' });
});

test('empties the two inputs when form is submitted', async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button');

  user.click(nameInput);
  user.keyboard('jane');
  user.click(emailInput);
  user.keyboard('jane@jane.gmaio.com');

  user.click(button);
  await waitFor(() => {
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  });
});
