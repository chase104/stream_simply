import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
  return(


    <ul class="right">
      <li>
        <NavLink to="/settings">
            <div className="cog-container">
              <i class="material-icons settings-cog">settings</i>
            </div>
        </NavLink>
      </li>

      <li><NavLink to="/settings" className="btn btn-floating lighten-1 account-button">ZZ</NavLink></li>


    </ul>
  )
}

export default SignedInLinks
