import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'



const User = () => {
  const [data, setData] = useState(false)


    const handleSubmit = () => {
      axios({
        method: "GET",
        withCredentials: true,
        url: "/getuser"
      }).then((res) => {
        setData(res.data)
        console.log(res.data);
      })
    }
  return(
    <div>
      <h1>Get User</h1>
      {
        data ?
        <div>
          <h1>Welcome {data.name}</h1>
          <h2>Your email is {data.email}</h2>
          <h3>encrypted password: {data.password}</h3>
        </div>
        : null
      }
      <button onClick={handleSubmit}>GetUser</button>
    </div>
  )
}

export default User
