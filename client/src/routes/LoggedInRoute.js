import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'



 const LoggedInRoute = ({component: Component, ...rest}) => {

   const [finished, setFinished] = useState(false)
   const [check, setCheck] = useState(true)



  const checker = async () => {

    const axiosCheck = await axios({
        method: "GET",
        withCredentials: true,
        url: "/checkUser"
      })

      if (axiosCheck.data.loggedIn === true){
        setCheck(true)
      } else{
        setCheck(false)
      }
      setFinished(true)
  }
  checker()

  if (finished) {
    return(
      <Route {...rest}
      render={(props) => {
        if (check) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />
        }
      }
      }

      />
     )
  } else {
    return null
  }



 }


export default LoggedInRoute
