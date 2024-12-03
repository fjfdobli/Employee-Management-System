import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ taskId, onFormSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (taskId) {
      axios.get(`http://127.0.0.1:8000/tasks/${taskId}/`)
        .then(response => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCompleted(response.data.completed);
        })
        .catch(error => console.log(error));
    }
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, description, completed };
    if (taskId) {
      axios.put(`http://127.0.0.1:8000/tasks/${taskId}/`, task)
        .then(response => onFormSubmit())
        .catch(error => console.log(error));
    } else {
      axios.post('http://127.0.0.1:8000/tasks/', task)
        .then(response => onFormSubmit())
        .catch(error => console.log(error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Task Description"
        required
      />
      <label>
        Completed:
        <input
          type="checkbox"
          checked={completed}
          onChange={e => setCompleted(e.target.checked)}
        />
      </label>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
