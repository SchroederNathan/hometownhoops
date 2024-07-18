import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const TeamsCreateRecLeague = () => {


  const { state } = useLocation();
  const navigate = useNavigate();

  const name = state.name;
  const location = state.location;
  const startDate = state.startDate;
  const endDate = state.endDate;
  const rules = state.rules;

  function preview(event: any, tabName: string) {
    event.preventDefault();
    if (tabName === 'info') {
      navigate("/dashboard/rec-leagues/create", { state: { name, location, startDate, endDate, rules } });
    } else if (tabName === 'preview') {
      navigate("/dashboard/rec-leagues/create/preview", {
        state: {
          name,
          location,
          startDate,
          endDate,
          rules,
        },
      });
    }
  }


return (
  <div>
    <ul className="nav nav-tabs mb-3 ">
      <li className="nav-item" style={{ marginRight: "2px" }}>
        <a
          className="nav-link tab activeTab"
          onClick={(event) => preview(event, 'info')}
          href="#"
        >
          Information
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link active tab"
          href="#"
        >
          Teams
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link tab"
          onClick={(event) => preview(event, 'preview')}
          href="#"
        >
          Preview
        </a>
      </li>
    </ul>
  </div>
)
}

export default TeamsCreateRecLeague