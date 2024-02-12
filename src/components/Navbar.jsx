import React from "react";
import logo from "../assets/hrs_logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  const goToProfile = () => {
    navigate("/profile");
  };
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="HRS" width="100" height="40" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? "active" : ""} fs-5 nav-link`
                  }
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? "active" : ""} fs-5 nav-link`
                  }
                  to="/movies"
                >
                  Movies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? "active" : ""} fs-5 nav-link`
                  }
                  to="/tvshows"
                >
                  TV Shows
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? "active" : ""} fs-5 nav-link`
                  }
                  to="/search"
                >
                  Search
                </NavLink>
              </li>
            </ul>

            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-danger mx-1"
                  to="/signin"
                  role="button"
                >
                  SignIn
                </Link>
                <Link
                  className="btn btn-danger mx-1"
                  to="/signup"
                  role="button"
                >
                  SignUp
                </Link>
              </form>
            ) : (
              <button className="btn btn-danger mx-1" onClick={goToProfile}>
                Profile
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
