import React from 'react'
import './Dashboard.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const Dashboard = () => {
    return (
        <div className='main-div container-fluid'>
            <div className='row'>
                <div className='bg-light col-auto col-md-3 min-vh-100 pt-3'>
                    <a className='text-decoration-none text-black d-none d-sm-inline d-flex align-itemcenter'>
                        <span className='ms-1 fs-4'>Dashboard</span>
                    </a>
                    <hr className='text-secondary d-none d-sm-block'></hr>
                    <ul className='nav nav-pills flex-column'>
                        <li className='nav-item fs-4'>
                            <a href='#' className='nav-link active dashboard fs-5 my-1 py-2 py-sm-2' aria-current='page'>
                                <i className='bi bi-backpack'></i>
                                <span className='ms-3 d-none d-sm-inline'>Travel Teams</span>
                            </a>
                        </li>
                        <li className='nav-item fs-4'>
                            <a href='#' className='nav-link fs-5 dashboard my-1 py-2 py-sm-2' aria-current='page'>
                                <i className='bi bi-award'></i>
                                <span className='ms-3 d-none d-sm-inline'>Rec Leagues</span>
                            </a>
                        </li>
                        <li className='nav-item fs-4'>
                            <a href='#' className='nav-link fs-5 dashboard my-1 py-2 py-sm-2' aria-current='page'>
                                <i className='bi bi-trophy'></i> 
                                <span className='ms-3 d-none d-sm-inline'>Tournaments</span>
                            </a>
                        </li>
                        <li className='nav-item fs-4'>
                            <a href='#' className='nav-link fs-5 dashboard my-1 py-2 py-sm-2' aria-current='page'>
                                <i className='bi bi-people'></i>
                                <span className='ms-3 d-none d-sm-inline'>Users</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard