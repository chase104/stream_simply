import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import Popcorn from '../../popcorn.png'

const Navbar = () => {
  return(
    <nav className="nav-wrapper">
        <div className="logo-holder">
          <img src={Popcorn} className="popcorn-img left"/>
          <Link className="brand-logo title-logo primary-brand" to="/">Stream Simply</Link>
        </div>

        <SignedOutLinks className="right " />
        <SignedInLinks className="right" />
    </nav>
  )
}


export default Navbar
