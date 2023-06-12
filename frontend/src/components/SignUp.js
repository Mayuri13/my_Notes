import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "" });
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password}),
    });
    const json = await response.json();
      // Save the auth token and navigate to the desired route
    if (json.success) {
        // Save the auth token and navigate to the desired route
        localStorage.setItem("token", json.authToken);
        props.showAlert("Account created successfully","success");
        navigate("/");
      }else {
        props.showAlert("Invalid credentials","danger");
      }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
        <form className = "my-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange = {onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            autoComplete="email"
            onChange = {onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            autoComplete="current-password"
            onChange = {onChange}
            required minLength={5}
          />
        </div>
        <button type="submit"  onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
