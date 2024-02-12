import React, { useState } from "react";
import styled from "styled-components";
import backImg from "../assets/moviecover.jpg";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
    cpassword: "",
    dob: "",
    gender: "Male",
  });

  let navigate = useNavigate();
  const host = import.meta.env.VITE_EXPRESS_API;

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, cpassword, dob, gender } = credential;
    if (password === cpassword) {
      const response = await fetch(`${host}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          dob,
          gender,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        alert("Account Successfully Created");
        navigate("/");
      } else {
        if (json.error) {
          alert(json.error);
        } else {
          alert(json.error[0].msg);
        }
      }
    } else {
      alert("Password don't Match");
    }
  };

  return (
    <SignUpCss>
      <div className="container">
        <div className="col-5 mx-auto p-4 card shadow-lg">
          <h2 className="center">Sign Up</h2>
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
                aria-describedby="emailHelp"
                value={credential.email}
                onChange={onChange}
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
                onChange={onChange}
                minLength={8}
                required
              />

              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                value={credential.cpassword}
                onChange={onChange}
                minLength={8}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                name="dob"
                id="dob"
                className="form-control"
                value={credential.dob}
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="gender">Gender</label>
              <select
                className="form-select form-control"
                aria-label="Default select example"
                id="gender"
                name="gender"
                onChange={onChange}
              >
                <option defaultValue={"Male"} value="Male">
                  Male
                </option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="btn fw-bolder btn-outline-danger">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </SignUpCss>
  );
}

const SignUpCss = styled.div`
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
    width: 550px;
    margin: 9px;
  }

  .center {
    text-align: center;
  }

  input {
    width: 550px;
    margin: 10px;
    height: 35px;
  }

  label {
    margin: 6px;
    font: 18px;
  }

  .card {
    width: 620px;
    height: fit-content;
    padding: 8px;
    border-radius: 35px;
    background: rgba(0, 0, 0, 0.6);
  }
`;
