import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  let location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/dashboard"
      : location.pathname
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
    console.log(e);
    setCurrent(e.key);
  }

  return (
    <div className="main-div container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-4 col-xl-3 px-sm-2 bg-light">
          <div
            className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-4 text-white"
            style={{ minHeight: "500px" }}
          >
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item  w-100">
                <NavLink
                  to="/dashboard/travel-teams"
                  className="nav-link fs-6 dashboard my-1 py-2 py-sm-2"
                  onClick={handleClick}
                  aria-current="page"
                >
                  <i className=" fs-5 bi bi-backpack d-sm-inline"></i>
                  <span className="ms-1 d-none d-sm-inline ps-1">
                    <strong>Travel Teams</strong>
                  </span>
                </NavLink>
              </li>
              <li className="nav-item  w-100">
                <NavLink
                  to="/dashboard/rec-leagues"
                  onClick={handleClick}
                  className="nav-link  fs-6 dashboard my-1 py-2 py-sm-2"
                  aria-current="page"
                >
                  <i className="fs-5 bi bi-award"></i>
                  <span className="ms-1 d-none d-sm-inline ps-1">
                    <strong>Rec Leagues</strong>
                  </span>
                </NavLink>
              </li>
              <li className="nav-item  w-100">
                <NavLink
                  to="/dashboard/tournaments"
                  onClick={handleClick}
                  className="nav-link fs-6 dashboard my-1 py-2 py-sm-2"
                  aria-current="page"
                >
                  <i className="fs-5 bi bi-trophy"></i>
                  <span className="ms-1 d-none d-sm-inline ps-1">
                    <strong>Tournaments</strong>
                  </span>
                </NavLink>
              </li>
              <li className="nav-item  w-100">
                <NavLink
                  to="/dashboard/email"
                  onClick={handleClick}
                  className="nav-link fs-6 dashboard my-1 py-2 py-sm-2 "
                  aria-current="page"
                >
                  <i className="fs-5 bi bi-envelope"></i>
                  <span className="ms-1 d-none d-sm-inline ps-1  ">
                    <strong>Email</strong>
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col py-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
