import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';
import userEvent from '@testing-library/user-event';

function renderComponent() {
  const users = [
    { name: 'Sam', email: 'sam@gmail.com' },
    { name: 'Joanna', email: 'joanna@gmail.com' },
  ];
  const { container } = render(<UserList users={users} />);

  return { users, container };
}

test('render one row per user', () => {
  // render the component
  const { container } = renderComponent();
  // container - top wrapping div of the rendered component

  // use container html doc
  // eslint-disable-next-line
  const rows = container.querySelectorAll('tbody tr');

  // assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
});

test('render the email and name of each user', () => {
  const { users } = renderComponent();

  users.forEach((user) => {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
});
