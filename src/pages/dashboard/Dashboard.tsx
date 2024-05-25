import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Dashboard = () => {

        let location = useLocation();
        const [current, setCurrent] = useState(
            location.pathname === "/" || location.pathname === ""
                ? "/dashboard"
                : location.pathname,
        );
        //or simply use const [current, setCurrent] = useState(location.pathname)        

        useEffect(() => {
            // console.log(location)
            if (location) {
                if (current !== location.pathname) {
                    setCurrent(location.pathname);
                }
            }
        }, [location, current]);

        function handleClick(e: any) {
            console.log(e)
            setCurrent(e.key);
        }
    

    return (
        <div className='main-div container-fluid'>
            <div className='row'>
                <div className='bg-light col-3 col-md-3 min-vh-100 pt-3'>
                    <a className='text-decoration-none text-black d-none d-sm-inline d-flex align-itemcenter'>
                        <span className='ms-1 fs-4'>Dashboard</span>
                    </a>
                    <hr className='text-secondary d-none d-sm-block'></hr>
                    <ul className='nav nav-pills flex-column'>
                        <li className='nav-item fs-4' >
                            <Link to='/dashboard/travel-teams' onClick={handleClick} className='nav-link active dashboard fs-5 my-1 py-2 py-sm-2' aria-current='page'>
                                <i className='bi bi-backpack'></i>
                                <span className='ms-3 d-none d-sm-inline'>Travel Teams</span>
                            </Link>
                        </li>
                        <li className='nav-item fs-4'>
                            <Link to='/dashboard/rec-leagues' onClick={handleClick} className='nav-link fs-5 dashboard my-1 py-2 py-sm-2' aria-current='page'>
                                <i className='bi bi-award'></i>
                                <span className='ms-3 d-none d-sm-inline'>Rec Leagues</span>
                            </Link>
                        </li>
                        <li className='nav-item fs-4'>
                            <Link to='/dashboard/tournaments' onClick={handleClick} className='nav-link fs-5 dashboard my-1 py-2 py-sm-2' aria-current='page'>
                                <i className='bi bi-trophy'></i>
                                <span className='ms-3 d-none d-sm-inline'>Tournaments</span>
                            </Link>
                        </li>
                        <li className='nav-item fs-4'>
                            <Link to='/dashboard/users' onClick={handleClick} className='nav-link fs-5 dashboard my-1 py-2 py-sm-2' aria-current='page'>
                                <i className='bi bi-people'></i>
                                <span className='ms-3 d-none d-sm-inline'>Users</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='col-9 pt-3'>
                    <Outlet />
                </div>
            </div>

        </div>

    )
}

export default Dashboard
