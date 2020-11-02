import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button';


const SignedOutLinks = () => {
  return (
    <ul class="right navbar-ul">
    <li>
      <NavLink to="/signup" className="li-height">
        <div className="vertical-align-container">
          <div className="vertical-align-holder">
              <Button variant='contained' className='appbar-button'>Sign up</Button>
          </div>
        </div>
      </NavLink>
    </li>



      <li>
        <NavLink to="/login" className="li-height">
          <div className="vertical-align-container">
            <div className="vertical-align-holder">
              <Button variant='contained' className='appbar-button'>Login</Button>
            </div>
          </div>
        </NavLink>
      </li>




    </ul>
  )
}

export default SignedOutLinks
