import React from 'react'
import { Link } from 'react-router-dom'


const SignedOutDashboard = () => {
  return (
    <div className="center dashboard-container row">
      <Link to='/signup'><a class="waves-effect waves-light btn-large dashboard-button col s4 offset-s2 left">
      <i class="material-icons left search-button-icon">search</i>Start Search (Sign Up)
      </a>
</Link>
      <div className="col-s1"></div>
      <Link to='/signin'><a class="waves-effect waves-light btn-large dashboard-button col s4  center">
      Login
      </a>
      </Link>
    </div>


  )
}
export default SignedOutDashboard
