const express = require("express");
const { body, validationResult } = require("express-validator");
const Employee = require("../models/employee");
const router = express.Router();

// Validation Middleware
const validateEmployee = [
  body("name").notEmpty().withMessage("Name is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("department").notEmpty().withMessage("Department is required"),
  body("salary")
    .isNumeric()
    .withMessage("Salary must be a number")
    .notEmpty()
    .withMessage("Salary is required"),
];

// CREATE an Employee
router.post("/", validateEmployee, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, position, department, salary } = req.body;
    const newEmployee = new Employee({ name, position, department, salary });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE an Employee
router.put("/:id", validateEmployee, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, position, department, salary } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, position, department, salary },
      { new: true } // Return the updated document
    );
    if (!updatedEmployee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ an Employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE an Employee
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
