import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle, Email, Public, CheckCircle, Favorite, Bookmark} from '@material-ui/icons';
import {Modal, List, ListItem, ListItemIcon, ListItemText, Input, Select, FormControl, MenuItem, InputLabel, Button, Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const useStyles = makeStyles({
list: {
  width: 400,
},
fullList: {
  width: 'auto',
},
menuButton: {
  width: "3vw !important",
  height:"3vw !important",

},
gridServices: {
  padding: "0px !important",
  backgroundColor: "#F0F8FF",
  borderRadius: "5px",
  margin: "1vw 1vw",
  width: "19vw",
  display: "flex",
  justifyContent: "center",
  border: "2px solid transparent",
},

serviceButton: {
    justifyContent: "center",
    display: "flex",
    fontSize: "150%",
    textAlign: "center",
    flexDirection: "column",
    height: "100%",
    margin: "0 5%"
},
buttonOn: {

},
buttonOff: {

}
});


const SideBar = ({user, rerender}) => {
  const classes = useStyles();
  const history = useHistory();
  const countryCipher = {
    es: "Spain",
    us: "USA",
    fr: "France",
    uk: "United Kingdom"
  }

  const [sidebarState, setSidebarState] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [country, setCountry] = useState(user.country)
  const [userServices, setUserServices] = useState(user.services)
  const [filteredServices, setFilteredServices] = useState(null)
  const nonServices = ["Netflix", "Amazon Prime", "Disney+", "HBO", "Hulu", "Google Play", "Youtube Premium"]
  const [editedServices, setEditedServices] = useState(userServices ? [...userServices] : [])



  const [personalModalContent, setPersonalModalContent] = useState({
    country: null,
    firstname: null,
    lastname: null,
    email: null
  })

  const handlePersonalChange = (e) => {
    console.log(e.target);
    let id = e.target.id ?  e.target.id : "country"
    console.log(id);
    setPersonalModalContent({
      ...personalModalContent,
      [id]: e.target.value

    })
    console.log(personalModalContent);
  }




  const handlePersonalSubmit = async  () => {
    console.log("submitting..");
    let finalPersonalObject = personalModalContent

    const finalizePersonalData = async () => {
      for (var prop in finalPersonalObject) {
        if (finalPersonalObject[prop] === null || undefined) {
          delete finalPersonalObject[prop]
        }
      }
    }
    finalizePersonalData()
    console.log(finalPersonalObject);
    await axios({
      method: 'PUT',
      data: {
        ...finalPersonalObject
      },
      withCredentials: true,
      url: '/personalupdate'
    }).then((res) => {
      console.log(res);
      console.log(res.data.update);
      if (res.data.update) {
        setOpen(false)
        setSidebarState(false)
        const sent = true;
        rerender(sent)
      }
    })
  }


  const openModal = () => {
    console.log("modal opened");
    setOpen(true)
  }

  const openServicesModal = () => {
    console.log("modal opened");
    setServicesOpen(true)
  }

  const handleSelectChange = (e) => {
    setCountry(e.target.value)
  }
  const submitServices = async () => {
    console.log("services submitted");
    setServicesOpen(false)
    setSidebarState(false)
    await axios({
      method: 'PUT',
      data: {
        services: editedServices
      },
      withCredentials: true,
      url: '/servicesupdate'
    }).then((res) => {
      console.log(res);
      const sent = true;
      rerender(sent)

    })
  }

  useEffect(() => {
    userServices != null ?
    setFilteredServices(
      nonServices.filter(
        function(e){
          return this.indexOf(e) < 0;
        },
        userServices
      )
    )
    :
    setFilteredServices(nonServices)
    }, [])

    const information=["firstname", "lastname", "email", "country"]

    const personalBody = (
    <div className="modal-style">
      <h2 id="simple-modal-title">Edit Personal Information</h2>
      <div className="edit-holder">
      <div className="display-personal">
        {information.map((item) => {
          let Icon = (item == "email") ? Email : (item == "country") ? Public : PermIdentityIcon;
          return(
            <div className="personal-info-holder" key={item+"12"}>
              <Icon className="personal-icons"/>
              <div className="edit-labels">{item == "country" ? countryCipher[user.country] : user[item]}</div>
            </div>
          )

        })}

      </div>

      <FormControl  className="edit-personal">
        {["firstname", "lastname", "email"].map((item) => {
          return (
            <input type="text"
              placeholder={item}
              id={item}
              className="text-input-edit"
              value={personalModalContent.item}
              onChange={handlePersonalChange}/>

          )
        })}


        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={personalModalContent.country ? personalModalContent.country : null }
          onChange={handlePersonalChange}
          style={{marginTop: "0px !important", height: "3vw", marginBottom: "0px !important"}}
          >
          <MenuItem value={user.country}>
          </MenuItem>
          <MenuItem value={null}>Change Country</MenuItem>

          <MenuItem value={"es"}>Spain</MenuItem>
          <MenuItem value={"us"}>USA</MenuItem>
          <MenuItem value={"uk"}>United Kingdom</MenuItem>
          <MenuItem value={"fr"}>France</MenuItem>

        </Select>
      </FormControl >
      </div>
      <div className="modal-button-container">
        <Button className="edit-personal-button" variant="contained" color="primary" onClick={handlePersonalSubmit}>
        Submit Changes
        </Button>
      </div>

    </div>
  );



  const  handleMouseDown = (e) => {
      console.log("down");
      let parentDiv = e.target.parentElement.classList.contains("on-hover") ? e.target.parentElement : e.target.parentElement.parentElement.classList.contains("on-hover") ? e.target.parentElement.parentElement : e.target

      parentDiv.classList.add("mousedown")
    }
  const handleMouseOut = (e) => {
    console.log("out");
    let parentDiv = e.target.parentElement.classList.contains("on-hover") ? e.target.parentElement : e.target.parentElement.parentElement.classList.contains("on-hover") ? e.target.parentElement.parentElement : e.target

    parentDiv.classList.remove("mousedown")

  }
  const handleMouseUp = (e) => {
    console.log("up");

    let parentDiv = e.target.parentElement.classList.contains("on-hover") ? e.target.parentElement : e.target.parentElement.parentElement.classList.contains("on-hover") ? e.target.parentElement.parentElement : e.target
    console.log(parentDiv);
    console.log(e.target);
    if (parentDiv.classList.contains("button-on")){
      console.log("it contains");
      parentDiv.classList.remove("button-on")
        let updatedServices = editedServices.filter((element) => {
          return element != parentDiv.id
        })
        console.log(updatedServices);
        setEditedServices(updatedServices)
    } else {
      console.log("it doesn't contain");
      parentDiv.classList.add("button-on")
      let updatedServices = editedServices
      if (updatedServices.includes(parentDiv.id)) {
        console.log("includes already");
      } else {
        updatedServices.push(parentDiv.id)
        console.log(updatedServices);
        setEditedServices(updatedServices)
      }

    }
  }

  const handleFavoritesClick = () => {
    console.log("clicked favorite");
    setSidebarState(false)
    history.push("/favorites")
  }
  const handleBookmarkClick = () => {
    console.log("clicked bookmark");
    setSidebarState(false)
    history.push("/watchlist")
  }
    const servicesBody = (
      <div className="modal-style services-modal-style">
        <h2 id="simple-modal-title">Edit Your Services</h2>
        <div className="edit-holder">
          <Grid container spacing={2}>
            <Grid item xs={12} s={12}>
              <Grid container justify="center" spacing={2}>
              {userServices != null ? userServices.map((service) =>
                  <Grid key={service+"item"} id={service} item className={`on-hover button-on ${classes.gridServices}`} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseOut={handleMouseOut}>
                  <div  style={{width: "100%"}}>
                    <CheckCircle  className="check-circle" />
                    <div className={classes.serviceButton}>{service}</div>
                  </div>
                  </Grid>

              )
              :
              null
            }
              {
                filteredServices ?
                filteredServices.map((item) => (
                  <Grid key={item+"item"}  item  id={item} className={`on-hover ${classes.gridServices}`}  onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseOut={handleMouseOut}>
                  <div  style={{width: "100%"}}>
                    <CheckCircle className="check-circle"/>
                    <div className={classes.serviceButton} >{item}</div>
                  </div>
                  </Grid>
              ))
              :
              <div>
              </div>

            }
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className="modal-button-container">
          <Button className="edit-personal-button" variant="contained" color="primary" onClick={submitServices}>
          Submit
          </Button>
        </div>
      </div>
      );





    const toggleDrawer = (ancor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;

      }
      setSidebarState(open)
    }

    const list = () => (
      <div
        className="sidebar"
        role="presentation"
        >

        <List>
            <ListItem button key={user.initials}   onClick={openModal} style={{marginBottom: "10px"}}>
                <div className="btn btn-floating lighten-1 account-button-big" >{user.initials}</div>
            </ListItem>
            <ListItem button key={user.firstname}   onClick={openModal} className="sidebar-list-item">
              <ListItemIcon><PermIdentityIcon /></ListItemIcon>
              <ListItemText primary={user.firstname + " " + user.lastname} classname="sidebar-text"/>
            </ListItem>
            <ListItem button key={"asdf"}  onClick={openModal} className="sidebar-list-item">
              <ListItemIcon><Email /></ListItemIcon>
              <ListItemText primary={user.email} className="sidebar-text"/>
            </ListItem>
            <ListItem button key={user.country} onClick={openModal} className="sidebar-list-item">
              <ListItemIcon><Public /></ListItemIcon>
              <ListItemText primary={countryCipher[user.country]}  classname="sidebar-text"/>
            </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={"favorites-list"}   onClick={handleFavoritesClick} className="sidebar-list-item">
            <ListItemIcon><Favorite /></ListItemIcon>
            <ListItemText primary="Favorites" classname="sidebar-text"/>
          </ListItem>
          <ListItem button key={"bookmark-list"}  onClick={handleBookmarkClick} className="sidebar-list-item">
            <ListItemIcon><Bookmark /></ListItemIcon>
            <ListItemText primary="Watch List" className="sidebar-text"/>
          </ListItem>

        </List>
        <Divider />
        <List>
          {userServices != null ? userServices.map((item) => (
            <ListItem button key={item + "service"} onClick={openServicesModal} className="sidebar-list-item">
              <ListItemIcon><CheckCircle style={{color: "#419f38"}}/></ListItemIcon>
              <ListItemText primary={item} classname="sidebar-text"/>
            </ListItem>
          ))
          :
          null
        }
          {
            filteredServices ?
            filteredServices.map((item) => (
            <ListItem button key={item + "service"} onClick={openServicesModal} className="sidebar-list-item">
              <ListItemIcon><CheckCircle /></ListItemIcon>
              <ListItemText primary={item} classname="sidebar-text"/>
            </ListItem>
          ))
          :
          <div>
          </div>
        }
        </List>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {personalBody}
        </Modal>
        <Modal
          open={servicesOpen}
          onClose={() => setServicesOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {servicesBody}
        </Modal>
      </div>
)

    return (
   <div>
     {
       <React.Fragment key={"right"}>
       <AccountCircle  className={classes.menuButton} onClick={toggleDrawer("right", true)}/>
         <Drawer anchor={"right"} className="sidebar-container" open={sidebarState} onClose={toggleDrawer("right", false)}>
           {list("right")}
         </Drawer>

       </React.Fragment>
     }
   </div>
 );
}

export default SideBar
