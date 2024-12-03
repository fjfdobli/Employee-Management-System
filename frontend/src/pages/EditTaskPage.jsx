import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditTaskPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/tasks/${id}/`)
      .then(response => {
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.due_date);
      })
      .catch(error => {
        console.error("Error fetching task:", error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTask = { title, description, due_date: dueDate };

    axios.put(`http://localhost:8000/api/tasks/${id}/`, updatedTask)
      .then(response => {
        navigate(`/`);
      })
      .catch(error => {
        console.error("Error updating task:", error);
      });
  };

  return (
    <div>
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
        />
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTaskPage;
