import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employees from the backend
    axios
      .get("http://localhost:5000/api/employees")
      .then((response) => {
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Set initial filtered employees
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
      });
  }, []);

  const deleteEmployee = (id) => {
    // Delete an employee
    axios
      .delete(`http://localhost:5000/api/employees/${id}`)
      .then(() => {
        const updatedEmployees = employees.filter(
          (employee) => employee._id !== id
        );
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees); // Update filtered list
      })
      .catch((error) => {
        console.error("There was an error deleting the employee!", error);
      });
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear token
    alert("You have been logged out.");
    navigate("/login"); // Redirect to Login page
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredEmployees(
      employees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(value) ||
          employee.position.toLowerCase().includes(value) ||
          employee.department.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Employees List</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-employee")}
        >
          Add Employee
        </button>
        <input
          type="text"
          placeholder="Search by Name, Position, or Department"
          value={search}
          onChange={handleSearch}
          className="form-control w-50"
        />
      </div>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>
              <button
                className="update-btn"
                onClick={() => navigate(`/update-employee/${employee._id}`)}
              >
                Update
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteEmployee(employee._id)}
              >
                Delete
              </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
