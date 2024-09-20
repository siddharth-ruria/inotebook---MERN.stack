import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const submitFunc = async (e) => {
    e.preventDefault();
    // api call
    const response = await fetch(
      "http://localhost:5000/api/auth/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth-token and redirect [ login successful ]
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("login successful", "success");
    } else {
      // alert pop up [ failed ]
      props.showAlert("invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  return (
    <div className="container position-relative">
      <h2 className=" position-absolute start-50 translate-middle">
        login to open your iNotebook
      </h2>
      <form className="py-5 my-3" onSubmit={submitFunc}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary my-3">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
