import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {NavLink} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import popcorn from '../../assets/popcorn.png'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    width: '3rem',
    height: '3rem'
  },
  toolbar:{
    paddingLeft: '0px !important',
  },
  title:{
    fontSize: '3vw',
    textAlign: 'center',
    marginTop: '5px',
    marginBottom: '5px',
    fontFamily: "'Quicksand', sans-serif"
  },
  titleHolder:{
    display: "flex",
    maxHeight: "10vh",
    alignItems: "center",
  },
  popcornImage: {
    margin: "4px 0px",
    maxHeight: "inherit",
  }
}));

export default function NavBar() {
  const classes = useStyles();

  const [loggedIn, setLoggedIn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);


  const getStatus = async () => {
    try{
      axios({
        method: "GET",
        withCredentials: true,
        url: "/checkUser"
      }).then((res) => {
        setLoggedIn(res.data.loggedIn)
      })
    }catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
      getStatus()
      console.log("logged in?", loggedIn);
    }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar classname='toolbar'>
          <Grid container justify="center">
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
              <NavLink to="/" style={{color: 'white', textAlign: 'center'}}>
                <div className={classes.titleHolder}>
                  <img className={classes.popcornImage} src={popcorn} />
                  <Typography variant="h3" className={classes.title} >
                    Stream Simply
                  </Typography>
                </div>
              </NavLink>
            </Grid>
            <Grid item xs={4}>
              {loggedIn != null ? loggedIn == true ? <SignedInLinks classes={classes} user={userInfo} /> : <SignedOutLinks /> : null  }
            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>
    </div>
  );
}
