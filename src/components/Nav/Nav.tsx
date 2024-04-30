import './Nav.css'
const Nav = () => {
  return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top py-lg-0 nav" >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="src/assets/hometownhoopslogo.png" alt="Logo" width="120" className="d-inline-block align-text-top" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#"><strong>Tournaments</strong></a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#"><strong>Camps</strong></a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#"><strong>Rec Leagues</strong></a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href='#'><strong>About Us</strong></a>
              </li>
              <li className="nav-item">
                <button type="button" className="btn btn-primary loginLogoutButton"><strong>Login</strong></button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default Nav