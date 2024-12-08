import React, { useState, useEffect } from 'react';
import { updateEmployee } from '../api';

const EmployeeEditForm = ({ employee, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    department: ''
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        department: employee.department
      });
    }
  }, [employee]);

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
      await updateEmployee(employee.id, formData); // Update employee
      onCancel(); // Go back to the employee list
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Update Employee</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EmployeeEditForm;
