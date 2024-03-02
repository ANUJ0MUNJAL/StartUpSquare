import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../css/register.css"; // Import the CSS file for registration form styling

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "investor",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const temp = user.role;
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        localStorage.setItem('role',temp);
     
        setUser({ name: "", email: "", phone: "", role: "", password: "" });

        if (temp === "pitcher") {
          navigate("/pitches");
        } else {
          navigate("/investor");
        }
      }
    } catch (err) {
      console.log("register", err);
    }
  };

  return (
    <section id="colorback">
    <div className="registration-container">
      <div className="registration-form">
        <h1 className="main-heading mb-3">
          <center>SignUp Form</center>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInput}
              placeholder="Name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInput}
              placeholder="Email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="number"
              name="phone"
              value={user.phone}
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              name="role"
              value={user.role}
              onChange={handleInput}
              className="form-control"
            >
              <option value="investor">Investor</option>
              <option value="pitcher">Pitcher</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Password"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-submit">
            Register Now
          </button>
        </form>
      </div>
      <div className="check">
    <img className="size" src="images/check.png" alt=""/>
  </div>
    </div>
    </section>
  );
};
