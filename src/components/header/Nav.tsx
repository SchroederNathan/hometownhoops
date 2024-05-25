import { Link, useNavigate } from 'react-router-dom'
import './Nav.css'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useState, useEffect } from 'react'
import logo from '../../assets/hometownhoopslogo.png'

const Nav = () => {
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setLoginStatus("Log Out")
        console.log(user)
      } else {
        // User is signed out
        setLoginStatus("Login")

      }
    });

  }, [])

  const handleLoginLogout = () => {
    if (loginStatus === 'Log Out') {
      signOut(auth).then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully")
      }).catch((error: any) => {
        console.log(error)
        // An error happened.
      });
    } else {
      navigate("/login");

    }

  }

  return (
    <nav className="shadow navbar navbar-expand-lg navbar-light bg-light fixed-top py-lg-0 nav" >
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>
          <img src={logo} alt="Logo" width="120" className="d-inline-block align-text-top" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-black" to='/tournaments'><strong>Tournaments</strong></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to='/travel-teams'><strong>Travel Teams</strong></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to='/rec-leagues'><strong>Rec Leagues</strong></Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black" href='#about-us'><strong>About Us</strong></a>
            </li>

            {loginStatus === 'Log Out' ?
              <li className="nav-item">
                <Link to='dashboard' className="nav-link text-black" ><strong>Dashboard</strong></Link>
              </li>
              :
              ''}

            <li className="nav-item">
              <button type="button" onClick={handleLoginLogout} className="btn btn-primary loginLogoutButton"><strong>{loginStatus}</strong></button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav