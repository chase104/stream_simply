import React, {useState, useEffect} from 'react'
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const useStyles = makeStyles({
list: {
  width: 400,
},
fullList: {
  width: 'auto',
},
});


const SideBar = () => {
  const classes = useStyles();
  console.log(classes);
  const [sidebarState, setSidebarState] = useState(false)


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
        onClick={toggleDrawer("right", false)}
        onKeyDown={toggleDrawer("right", false)}
        >

        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        </div>
    )

    return (
   <div>
     {
       <React.Fragment key={"right"}>
       <AccountCircleIcon  className={classes.menuButton} onClick={toggleDrawer("right", true)}/>
         <Drawer anchor={"right"} open={sidebarState} onClose={toggleDrawer("right", false)}>
           {list("right")}
         </Drawer>
       </React.Fragment>
     }
   </div>
 );
}

export default SideBar
