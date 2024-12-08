import React, { useState, useEffect } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api';
import EmployeeEditForm from './EmployeeEditForm';
import EmployeeCreateForm from './EmployeeCreateForm'; // Import the create form

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);  // State to control form visibility

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedEmployee(null);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateEmployee(id, updatedData);
      const response = await getEmployees();
      setEmployees(response.data);
      setIsEditing(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleCreate = async (newEmployee) => {
    try {
      await createEmployee(newEmployee);
      const response = await getEmployees();
      setEmployees(response.data);
      setIsCreating(false);  // Hide create form after successful creation
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <EmployeeEditForm
          employee={selectedEmployee}
          onCancel={handleCancelEdit}
          onUpdate={handleUpdate}
        />
      ) : isCreating ? (
        <EmployeeCreateForm onCreate={handleCreate} onCancel={() => setIsCreating(false)} />
      ) : (
        <>
          <h1>Employee List</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.first_name} {employee.last_name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>
                    <button onClick={() => handleEdit(employee)}>Edit/Update</button>
                    <button onClick={() => handleDelete(employee.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setIsCreating(true)}>Create Employee</button>  {/* Show create form */}
        </>
      )}
    </div>
  );
};

export default EmployeeList;
