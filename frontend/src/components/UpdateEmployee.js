import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the employee data to pre-fill the form
    axios
      .get(`http://localhost:5000/api/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((err) => {
        console.error("Error fetching employee:", err);
      });
  }, [id]);

  const validate = () => {
    const validationErrors = {};
    if (!employee.name) validationErrors.name = "Name is required";
    if (!employee.position) validationErrors.position = "Position is required";
    if (!employee.department)
      validationErrors.department = "Department is required";
    if (!employee.salary || isNaN(employee.salary) || employee.salary <= 0)
      validationErrors.salary = "Salary must be a positive number";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios
      .put(`http://localhost:5000/api/employees/${id}`, employee)
      .then(() => {
        alert("Employee updated successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating employee:", err);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="form-control"
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={employee.position}
            onChange={handleChange}
            className="form-control"
          />
          {errors.position && <p className="text-danger">{errors.position}</p>}
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            className="form-control"
          />
          {errors.department && (
            <p className="text-danger">{errors.department}</p>
          )}
        </div>
        <div className="form-group">
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            className="form-control"
          />
          {errors.salary && <p className="text-danger">{errors.salary}</p>}
        </div>
        <button type="submit" className="btn btn-success mr-2">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
