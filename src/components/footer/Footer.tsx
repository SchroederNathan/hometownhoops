import './Footer.css'

import React from 'react'

const Footer = () => {
    return (

        <div className="">
            <footer className="row bg-light row-cols-1 row-cols-sm-2 row-cols-md-5 py-5  border-top footer">
                <div className="col mb-3" >
                    <a href="/" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
                        <img src='src/assets/hometownhoopslogo.png' style={{ width: '150px' }} />
                    </a>
                    <p className="text-body-secondary" style={{marginLeft:'40px'}}>&copy; 2024</p>
                </div>

                <div className="col mb-3"></div>
                <div className="col mb-3"></div>


                <div className="col mb-3">
                    <h5>Get Started</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Tournaments</a></li>
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Camps</a></li>
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Leagues</a></li>
                    </ul>
                </div>

                <div className="col mb-3">
                    <h5>Company</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Abous Us</a></li>
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Privacy Policy</a></li>
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Terms & Conditions</a></li>
                    </ul>
                </div>
            </footer>
        </div>

    )
}

export default Footer