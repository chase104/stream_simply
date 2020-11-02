import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Modal from './ModalCheck'
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SideBar from './sideBar'




const SignedInLinks = ({classes}) => {


const [user, setUser] = useState(null)

  const getUserInfo = async () => {
    try{
      axios({
        method: "GET",
        withCredentials: true,
        url: "/userinfo"
      }).then((res) => {
        console.log(res);
        setUser(res.data)
      })
    }catch (err) {
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



  return(
    <ul className="right navbar-ul">
      <li>
      <div className="vertical-align-container">
        <div className="vertical-align-holder">
      <IconButton className="sidebar-button" edge="start" color="inherit" aria-label="menu" >
        { user ?  <SideBar user={user} className="sidebar-button" /> : null}

      </IconButton>
      </div>
    </div>
      </li>

      <li>
      <NavLink to="" className="li-height" onClick={() => handleClick()}>
        <div className="vertical-align-container">
          <div className="vertical-align-holder">
            <div>Logout</div>
          </div>
        </div>
      </NavLink>
      </li>





    </ul>
  )
}

export default SignedInLinks
