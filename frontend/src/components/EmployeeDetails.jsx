import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployee } from '../api';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployee(id);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };
    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="employee-details">
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Department:</strong> {employee.department}</p>
    </div>
  );
};

export default EmployeeDetails;
