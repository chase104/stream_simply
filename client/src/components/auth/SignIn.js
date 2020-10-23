import React, { Component, useState } from 'react'
import axios from 'axios'
import User from '../user'
const SignIn = () => {



  const [signUpState, setSignUpState] = useState();
  let getState = (signupState) => {
    return signUpState
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (signUpState.password) {
      console.log(signUpState);
      await axios({
        method: 'POST',
        data: {
          ...signUpState
        },
        withCredentials: true,
        url: '/login'
      }).then((res) => {
        console.log(res);
        if (res.data.loggedIn == true) {
          window.location = "/"
        }
      })
    } else {
      console.log('password error');
    }
  }
  console.log(signUpState);

  const handleChange = (e) => {
    let id = e.target.id
    let state = getState()
    console.log(id);
    setSignUpState({
      ...signUpState,
      [e.target.id]: e.target.value
    })
  }



    return(
      <div className="container">
        <form onSubmit={handleSubmit} className="signup">
          <div className="title-header">
            <h5 className="grey-text text-darken-1">Login</h5>
            <i class="material-icons grey-text arrow-icon">arrow_forward</i>
            <h5 className="grey-text text-darken-1 search-h5">Search</h5>
            <i class="material-icons grey-text search-icon">search</i>

          </div>

          <div className="input-field">
            <label for="email">Email</label>
            <input className="grey-text" type="email" id="email" onChange={handleChange}/>
          </div>
          <div className="input-field">
            <label for="password">Password</label>
            <input className="grey-text" type="password" id="password" onChange={handleChange}/>
          </div>

          <div className="input-field">
            <button className="btn z-depth-0 signup-btn">Continue</button>
          </div>
        </form>
        <User />

      </div>
    )
  }



export default SignIn
