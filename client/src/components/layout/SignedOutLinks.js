import React from 'react'
import { NavLink } from 'react-router-dom'


const SignedOutLinks = () => {
  return (
    <ul class="right navbar-ul">
    <li>
      <NavLink to="/signup" className="li-height">
        <div className="vertical-align-container">
          <div className="vertical-align-holder">
              <div>sign up</div>
          </div>
        </div>
      </NavLink>
    </li>



      <li>
        <NavLink to="/login" className="li-height">
          <div className="vertical-align-container">
            <div className="vertical-align-holder">
              <div>login</div>
            </div>
          </div>
        </NavLink>
      </li>




    </ul>
  )
}

export default SignedOutLinks
