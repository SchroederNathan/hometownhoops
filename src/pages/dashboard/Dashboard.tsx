import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

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
    // make sure to type the parameters of this function! isActive is a boolean 
    // const navLinkCssClasses = ({ isActive }: { isActive: boolean }): string => {
    //     return ` ${isActive ? "nav-link fs-5 dashboard my-1 py-2 py-sm-2" : "nav-link fs-5 dashboard my-1 py-2 py-sm-2"
    //         }`;
    // };

    return (
        <div className='main-div container-fluid'>
            <div className="row flex-nowrap">
                <div className="col-auto col-md-4 col-xl-3 px-sm-2 bg-light">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-4 text-white min-vh-100">
                        {/* <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-black text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">Dashboard</span>
                        </a> */}

                        {/* <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu"> */}
                        <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id="menu">
                            <li className='nav-item  w-100' >
                                <NavLink to='/dashboard/travel-teams'
                                    className="nav-link fs-6 dashboard my-1 py-2 py-sm-2"
                                    onClick={handleClick} aria-current='page'>
                                    <i className=' fs-5 bi bi-backpack d-sm-inline'></i>
                                    <span className='ms-1 d-none d-sm-inline ps-1' ><strong>Travel Teams</strong></span>
                                </NavLink>

                            </li>
                            <li className='nav-item  w-100'>
                                <NavLink to='/dashboard/rec-leagues' onClick={handleClick} className='nav-link  fs-6 dashboard my-1 py-2 py-sm-2' aria-current='page'>
                                    <i className='fs-5 bi bi-award'></i>
                                    <span className='ms-1 d-none d-sm-inline ps-1'><strong>Rec Leagues</strong></span>
                                </NavLink>
                            </li>
                            <li className='nav-item  w-100'>
                                <NavLink to='/dashboard/tournaments' onClick={handleClick} className='nav-link fs-6 dashboard my-1 py-2 py-sm-2' aria-current='page'>
                                    <i className='fs-5 bi bi-trophy'></i>
                                    <span className='ms-1 d-none d-sm-inline ps-1'><strong>Tournaments</strong></span>
                                </NavLink>
                            </li>
                            <li className='nav-item  w-100'>
                                <NavLink to='/dashboard/users' onClick={handleClick} className='nav-link fs-6 dashboard my-1 py-2 py-sm-2 ' aria-current='page'>
                                    <i className='fs-5 bi bi-people'></i>
                                    <span className='ms-1 d-none d-sm-inline ps-1  '><strong>Users</strong></span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col py-3">
                    <Outlet />

                </div>
            </div>
            {/* <div className='row flex-nowrap'>
                <div className='bg-light col-2 min-vh-100 col-auto col-md-3 col-xl-2 px-sm-2 px-0  pt-3'>
                    <a className='text-decoration-none text-black d-none d-sm-inline d-flex align-itemcenter'>
                        <span className='ms-1 fs-4'>Dashboard</span>
                    </a>
                    <hr className='text-secondary d-none d-sm-block'></hr>
                    <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'>
                        <li className='nav-item fs-4' >
                            <NavLink to='/dashboard/travel-teams'
                            className="nav-link fs-5 dashboard "
                                onClick={handleClick}  aria-current='page'>
                                <i className=' fs-4 bi bi-backpack'></i>
                                <span className='ms-2 d-none d-sm-inline'>Travel Teams</span>
                            </NavLink>
                        </li>
                        <li className='nav-item fs-4'>
                            <NavLink to='/dashboard/rec-leagues' onClick={handleClick} className='nav-link fs-5 dashboard my-1 py-2 py-sm-2' aria-current='page'>
                                <i className='bi bi-award'></i>
                                <span className='ms-3 d-none d-sm-inline'>Rec Leagues</span>
                            </NavLink>
                        </li>
                        <li className='nav-item fs-4'>
                            <NavLink to='/dashboard/tournaments' onClick={handleClick} className='nav-link fs-5 dashboard my-1 py-2 py-sm-2' aria-current='page'>
                                <i className='bi bi-trophy'></i>
                                <span className='ms-3 d-none d-sm-inline'>Tournaments</span>
                            </NavLink>
                        </li>
                        <li className='nav-item fs-4'>
                            <NavLink to='/dashboard/users' onClick={handleClick} className='nav-link fs-5 dashboard my-1 py-2 py-sm-2' aria-current='page'>
                                <i className='bi bi-people'></i>
                                <span className='ms-3 d-none d-sm-inline'>Users</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className='col-9 pt-3'>
                    <Outlet />
                </div>
            </div> */}

        </div>

    )
}

export default Dashboard
