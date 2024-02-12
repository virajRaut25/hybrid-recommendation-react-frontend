import React, { useState } from "react";
import styled from "styled-components";
import backImg from "../assets/moviecover.jpg";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [credential, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const host = import.meta.env.VITE_EXPRESS_API;
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credential;
    const response = await fetch(`${host}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      alert("Sign In Successfully");
      navigate("/");
    } else {
      if (json.error) {
        alert(json.error);
      } else {
        alert(json.error[0].msg);
      }
    }
  };
  return (
    <SignInCss>
      <div className="container">
        <div className="col-5 mx-auto p-4 card shadow-lg">
          <h2 className="center">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={onChange}
                aria-describedby="emailHelp"
                value={credential.email}
                required
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
                value={credential.password}
                minLength={8}
                onChange={onChange}
                required
              />
            </div>

            <button type="submit" className="btn fw-bolder btn-outline-danger">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </SignInCss>
  );
}

const SignInCss = styled.div`
  background: url(${backImg}) no-repeat center center fixed;
  background-size: cover;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: -1;

  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 580px;
    margin: 9px;
  }

  .center {
    text-align: center;
  }

  .card {
    width: fit-content;
    height: fit-content;
    padding: 8px;
    border-radius: 35px;
    background: rgba(0, 0, 0, 0.6);
  }
`;
