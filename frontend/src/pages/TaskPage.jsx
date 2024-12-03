import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTasks } from '../services/taskService';
import TaskCard from '../components/TaskCard';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasks();
      setTasks(tasksData);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <Link to="/tasks/create">Create New Task</Link>
      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
