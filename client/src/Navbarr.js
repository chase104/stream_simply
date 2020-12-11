import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import Popcorn from '../../popcorn.png'
import axios from 'axios'

// -----------------Material UI IMPORTS --------------------//
import  Appbar from '@material-ui/core/Appbar'
import  Toolbar from '@material-ui/core/Toolbar'
import  MenuIcon from '@material-ui/icons/Menu'
import  IconButton from '@material-ui/core/IconButton'
import  Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import  Grid from '@material-ui/core/Grid'


const Navbar = () => {

  const [loggedIn, setLoggedIn] = useState(null);

  const getStatus = async () => {
    try{
      axios({
        method: "GET",
        withCredentials: true,
        url: "/checkUser"
      }).then((res) => {
        console.log(res);
        setLoggedIn(res.data.loggedIn)
      })
    }catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
      getStatus()
      console.log(loggedIn);
    })

  return(

    <Appbar>
      <Toolbar>
      <Grid type="container">

        <IconButton  >
          <AccountBoxIcon />
        </IconButton>
        <Typography variant="h6">
        StreamSimply
        </Typography>
        </Grid>
      </Toolbar>

    </Appbar>






    // <nav className="nav-wrapper">
    //     <div className="logo-holder">
    //       <Link to="/"><img src={Popcorn} className="popcorn-img left"/></Link>
    //       <Link className="brand-logo title-logo primary-brand" to="/">Stream Simply</Link>
    //     </div>
    //     <div className="right links">
    //     {loggedIn == true ?
    //     <SignedInLinks /> :
    //     loggedIn == false ?
    //     <SignedOutLinks /> : null
    //       }
    //     </div>
    //
    // </nav>
  )
}


export default Navbar
