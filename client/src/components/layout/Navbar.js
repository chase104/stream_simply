import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'

const Navbar = () => {
  return(
    <nav className="nav-wrapper">
        <Link className="brand-logo center title-logo primary-brand" to="/">Stream Simply</Link>
        <SignedInLinks className="right" />
    </nav>
  )
}


export default Navbar
