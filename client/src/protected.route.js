import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'



 const ProtectedRoute = ({component: Component, ...rest}) => {

   const [finished, setFinished] = useState(true)
   const [check, setCheck] = useState(true)



  const checker = async () => {

    const axiosCheck = await axios({
        method: "GET",
        withCredentials: true,
        url: "/checkUser"
      })

      console.log(axiosCheck);
      if (axiosCheck.data.loggedIn === true){
        setCheck(true)
      } else{
        setCheck(false)
      }
      console.log(check);
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


export default ProtectedRoute
