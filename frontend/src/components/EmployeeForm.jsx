import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../api';
import '../styles.css';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    department: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>Create Employee</h2>
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        required
        placeholder="First Name"
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        required
        placeholder="Last Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Email"
      />
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
        placeholder="Department"
      />
      <button type="submit">Create Employee</button>
    </form>
  );
};

export default EmployeeForm;
