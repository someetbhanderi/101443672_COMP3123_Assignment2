import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-employee/:id"
          element={
            <ProtectedRoute>
              <UpdateEmployee />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
