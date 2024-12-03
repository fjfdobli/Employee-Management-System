import { render, screen } from '@testing-library/react';
import axios from 'axios';
import TaskList from './TaskList';

jest.mock('axios');

test('displays task list', async () => {
  const tasks = [{ id: 1, title: 'Test Task', description: 'Test Description', completed: false }];
  axios.get.mockResolvedValue({ data: tasks });

  render(<TaskList />);

  expect(await screen.findByText('Test Task')).toBeInTheDocument();
});
