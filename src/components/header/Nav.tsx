import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useState, useEffect } from "react";
import logo from "../../assets/hometownhoopslogo.png";
import { CloseButton, Container, Nav, Navbar } from "react-bootstrap";
import { ArrowRight, DoorOpen, List, Opencollective, X } from 'react-bootstrap-icons';

const NavBar = () => {
  const [loginStatus, setLoginStatus] = useState("");
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginStatus("Log Out");
      } else {
        setLoginStatus("Login");
      }
    });
  }, []);

  const handleLoginLogout = () => {
    if (loginStatus === "Log Out") {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  };

  const handleNavbarToggle = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary mb-3"
        expanded={!isNavbarCollapsed}
      >
        <Container fluid>
          <Navbar.Brand
            href="#"
            className={`navbar-brand ${!isNavbarCollapsed ? "center-logo" : ""}`}
          >
            <img
              src={logo}
              alt="Logo"
              width="120"
              className="d-inline-block align-text-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleNavbarToggle}
          >
            {isNavbarCollapsed ? (
              <Navbar.Toggle />
            ) : (
              <CloseButton className="me-2"/>
            )}
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3 text-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link text-black" to="/tournaments">
                    <strong>Tournaments</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-black" to="/travel-teams">
                    <strong>Travel Teams</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-black" to="/rec-leagues">
                    <strong>Rec Leagues</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-black" href="#about-us">
                    <strong>About Us</strong>
                  </a>
                </li>
                {loginStatus === "Log Out" ? (
                  <li className="nav-item">
                    <Link to="dashboard" className="nav-link text-black">
                      <strong>Dashboard</strong>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <li className="nav-item">
                  <button
                    type="button"
                    onClick={handleLoginLogout}
                    className="btn btn-primary loginLogoutButton mx-auto"
                  >
                    <strong>{loginStatus}</strong>
                  </button>
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
