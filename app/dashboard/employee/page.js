"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "",
    startdate: "",
    photo: null,
  });
  const [formattedData, setFormattedData] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    const handleGetEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/employees", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const employeeData = await response.json();

        const formattedEmployeeData = employeeData.map((employee) => ({
          ...employee,
          startdate: formatDate(employee.startdate),
        }));

        setData(employeeData);
        setFormattedData(formattedEmployeeData);
      } catch (error) {
        console.error("Fetch data error:", error);
      }
    };

    handleGetEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        setNewEmployee({ ...newEmployee, photo: file });
      }
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", newEmployee.name);
      formData.append("email", newEmployee.email);
      formData.append("role", newEmployee.role);
      formData.append("startdate", newEmployee.startdate);
      formData.append("photo", newEmployee.photo);

      const response = await fetch("http://localhost:3000/api/employees", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create employee");
      }

      setNewEmployee({
        name: "",
        email: "",
        role: "",
        startdate: "",
        photo: null,
      });

      handleGetEmployees();
    } catch (error) {
      console.error("Create employee error:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-light">Employee managament page</h1>
      <div className="d-flex gap-3 mb-4">
        <Link href="/dashboard/user">User</Link>
        <Link href="/dashboard/employee">Employee</Link>
        <Link href="/">Log out</Link>
      </div>
      <div className="d-flex flex-column mb-3 align-items-center">
        <div className="card p-3 mb-5" style={{ width: "900px" }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newEmployee.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={newEmployee.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <input
                type="text"
                className="form-control"
                id="role"
                name="role"
                value={newEmployee.role}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startdate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                id="startdate"
                name="startdate"
                value={newEmployee.startdate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Photo (max 300kb, jpg/jpeg)
              </label>
              <input
                type="file"
                className="form-control"
                id="photo"
                name="photo"
                accept="image/jpeg,image/jpg"
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Employee
            </button>
          </form>
        </div>
        <div className="card p-3" style={{ width: "1200px" }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Photo</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Start date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {formattedData.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.photo}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                  <td>{employee.startdate}</td>
                  <td className="d-flex gap-2">
                    <button className="btn btn-outline-primary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
