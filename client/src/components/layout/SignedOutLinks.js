import React from 'react'
import { NavLink } from 'react-router-dom'


const SignedOutLinks = () => {
  return (
    <ul class="right">
    <li>
      <NavLink to="/signup">
          <div className="navbar-content">
            <h5>sign upp</h5>
          </div>
      </NavLink>
    </li>
      <li>
        <NavLink to="/login">
            <div className="navbar-content">
              <h5>login</h5>
            </div>
        </NavLink>
      </li>




    </ul>
  )
}

export default SignedOutLinks
