import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import {IconButton, Button} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SideBar from './sideBar'




const SignedInLinks = ({classes}) => {


const [user, setUser] = useState(null)
const [functionSwitch, setFunctionSwitch] = useState(true)
  const checkUser = () => {
    console.log(user);
  }

  const getUserInfo = async (sent) => {
    try{
      console.log("axios request");
      axios({
        method: "GET",
        withCredentials: true,
        url: "/userinfo"
      }).then((res) => {
        console.log(res.data);
          console.log(" rerender");
          setUser(null)
          setUser(res.data)

        })
      }
    catch (err) {
      console.log(err.message);
    }
  }


  useEffect(() => {
      getUserInfo()

    }, [])


  const handleClick = () => {
    console.log("clicked");
      axios({
        method: "GET",
        withCredentials:true,
        url: "/logout"
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          window.location = '/login'
        }
      })
  }

  const callUserRerender = (sent) => {
    console.log("rerendering!");
    getUserInfo(sent)
  }

  return(
    <ul className="right navbar-ul">


      <li style={{marginRight: "1.5vw", marginLeft: "1vw"}}>
      <div className="vertical-align-container">
        <div className="vertical-align-holder">
      <IconButton className="sidebar-button" edge="start" color="inherit" aria-label="menu" >
        { user ?  <SideBar user={user} className="sidebar-button" rerender={(sent) => callUserRerender(sent)}/> : null}

      </IconButton>
      </div>
    </div>
      </li>

      <li>
      <NavLink to="" className="li-height" onClick={() => handleClick()}>
        <div className="vertical-align-container">
          <div className="vertical-align-holder">
          <Button variant='contained' className='appbar-button'>Logout</Button>
          </div>
        </div>
      </NavLink>
      </li>





    </ul>
  )
}

export default SignedInLinks
