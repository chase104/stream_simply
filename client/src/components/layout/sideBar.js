import React, {useState, useEffect} from 'react'
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle, Email, Public, CheckCircle} from '@material-ui/icons';
import {Modal, List, ListItem, ListItemIcon, ListItemText, Input, Select, FormControl, MenuItem, InputLabel, Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

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
  width: "3vw",
  height:" 3vw",

}
});


const SideBar = ({user}) => {
  const classes = useStyles();


  const countryCipher = {
    es: "Spain",
    us: "USA",
    fr: "France",
    uk: "United Kingdom"
  }


  const [sidebarState, setSidebarState] = useState(false)
  const [open, setOpen] = useState(false)
  const [country, setCountry] = useState(user.country)
  const [userServices, setUserServices] = useState(user.services)
  const [filteredServices, setFilteredServices] = useState(null)
  const nonServices = ["Netflix", "Amazon Prime", "Disney+", "HBO", "Hulu", "Google Play", "Youtube Premium"]

  const [personalModalContent, setPersonalModalContent] = useState({
    country: country,
    firstname: "hello",
    lastname: null,
    email: null
  })

  const handlePersonalChange = (e) => {
    let id = e.target.id == "demo-simple-select-helper" ? "country" : e.target.id;
    setPersonalModalContent({
      ...personalModalContent,
      [id]: e.target.value

    })
    console.log(personalModalContent);
  }

  const openModal = () => {
    console.log("modal opened");
    setOpen(true)
  }
  const handleSelectChange = (e) => {
    setCountry(e.target.value)
  }

  useEffect(() => {
    setFilteredServices(
      nonServices.filter(
        function(e){
          return this.indexOf(e) < 0;
        },
        userServices
      )
    )
    }, [])

    const information=["firstname", "lastname", "email", "country"]
    const body = (
    <div           className="modal-style">
      <h2 id="simple-modal-title">Edit Personal Information</h2>
      <div className="edit-holder">
      <div className="display-personal">
        {information.map((item) => {
          let Icon = (item == "email") ? Email : (item == "country") ? Public : PermIdentityIcon;
          return(
            <div className="personal-info-holder">
              <Icon className="personal-icons"/>
              <div className="edit-labels">{item == "country" ? countryCipher[user.country] : user[item]}</div>
            </div>
          )

        })}

      </div>
      <FormControl  className="edit-personal">
        {["firstname", "lastname", "email"].map((item) => {
          return (
            <input type="text" placeholder={item} id={item} className="text-input-edit" value={personalModalContent.item}onChange={handlePersonalChange}/>

          )
        })}

        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={personalModalContent.country}
          onChange={handlePersonalChange}
          style={{marginTop: "0px !important"}}
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
      <Button className="edit-personal-button" variant="contained" style={{marginTop: "5%"}}>
      Submit Changes
      </Button>
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
            <ListItem button key={user.initials}   onClick={openModal}>
                <div className="btn btn-floating lighten-1 account-button-big" >{user.initials}</div>
            </ListItem>
            <ListItem button key={user.firstname}   onClick={openModal}>
              <ListItemIcon><PermIdentityIcon /></ListItemIcon>
              <ListItemText primary={user.firstname + " " + user.lastname} />
            </ListItem>
            <ListItem button key={"asdf"}  onClick={openModal}>
              <ListItemIcon><Email /></ListItemIcon>
              <ListItemText primary={user.email} />
            </ListItem>
            <ListItem button key={"Spain"} onClick={openModal}>
              <ListItemIcon><Public /></ListItemIcon>
              <ListItemText primary={"Spain"} />
            </ListItem>
        </List>
        <Divider />
        <List>
          {userServices.map((item) => (
            <ListItem button key={item + "service"}>
              <ListItemIcon><CheckCircle style={{color: "#419f38"}}/></ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
          {
            filteredServices ?
            filteredServices.map((item) => (
            <ListItem button key={item + "service"}>
              <ListItemIcon><CheckCircle /></ListItemIcon>
              <ListItemText primary={item} />
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
          {body}
        </Modal>
      </div>
)

    return (
   <div>
     {
       <React.Fragment key={"right"}>
       <AccountCircle  className={classes.menuButton} onClick={toggleDrawer("right", true)}/>
         <Drawer anchor={"right"} open={sidebarState} onClose={toggleDrawer("right", false)}>
           {list("right")}
         </Drawer>

       </React.Fragment>
     }
   </div>
 );
}

export default SideBar
