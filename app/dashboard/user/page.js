"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.error("Fetch data error:", error);
      }
    };

    handleGetUser();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      const updatedData = data.filter((user) => user.id !== id);
      setData(updatedData);
    } catch (error) {
      console.error("Delete data error:", error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditUser = async () => {
    if (editUser) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${editUser.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editUser),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to edit data");
        }

        const updatedData = data.map((user) =>
          user.id === editUser.id ? editUser : user
        );
        setData(updatedData);
        handleCloseModal();
      } catch (error) {
        console.error("Edit data error:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>User managament page</h1>
      <Link href="/">Go back home</Link>
      <div className="d-flex justify-content-center">
        <div className="card p-3" style={{ width: "900px" }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setEditUser(user);
                        handleOpenModal();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className={`modal fade ${showModal ? "show" : ""}`}
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{
              display: showModal ? "block" : "none",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Edit user
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={editUser ? editUser.name : ""}
                      onChange={(e) => {
                        if (editUser) {
                          setEditUser({
                            ...editUser,
                            name: e.target.value,
                          });
                        }
                      }}
                    />
                    <label for="floatingInput">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={editUser ? editUser.email : ""}
                      onChange={(e) => {
                        if (editUser) {
                          setEditUser({
                            ...editUser,
                            email: e.target.value,
                          });
                        }
                      }}
                    />
                    <label for="floatingInput">Email</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={editUser ? editUser.password : ""}
                      onChange={(e) => {
                        if (editUser) {
                          setEditUser({
                            ...editUser,
                            password: e.target.value,
                          });
                        }
                      }}
                    />
                    <label for="floatingPassword">Password</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditUser}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
      </div>
    </div>
  );
}
