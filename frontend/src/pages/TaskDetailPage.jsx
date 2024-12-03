import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const TaskDetailPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/tasks/${id}/`)
      .then(response => {
        setTask(response.data);
      })
      .catch(error => {
        console.error("Error fetching task details:", error);
      });
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Due Date: {task.due_date}</p>
      <p>Status: {task.completed ? "Completed" : "Not Completed"}</p>
      <Link to={`/edit/${task.id}`}>Edit Task</Link>
    </div>
  );
};

export default TaskDetailPage;
