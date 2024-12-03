import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <Link to={`/tasks/${task.id}`}>View Details</Link>
    </div>
  );
};

export default TaskCard;
