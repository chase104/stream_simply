import React, { Component, useState } from 'react'
import axios from 'axios'

const SignIn = () => {



  const [signUpState, setSignUpState] = useState();
  let getState = (signupState) => {
    return signUpState
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (signUpState.password === signUpState.confirmpassword) {
      console.log(signUpState);
      await axios({
        method: 'POST',
        data: {
          ...signUpState
        },
        withCredentials: true,
        url: '/'
      }).then((res) => {console.log(res);})
    } else {
      console.log('password error');
    }
  }
  console.log(signUpState);

  const handleChange = (e) => {
    let id = e.target.id
    let state = getState()
    console.log(state.id);
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
            <h5 className="white-text text-darken-1">Login</h5>
            <i class="material-icons white-text arrow-icon">arrow_forward</i>
            <h5 className="grey-text text-darken-1 search-h5">Search</h5>
            <i class="material-icons grey-text search-icon">search</i>

          </div>

          <div className="input-field">
            <label for="email">Email</label>
            <input className="white-text" type="email" id="email" onChange={handleChange}/>
          </div>
          <div className="input-field">
            <label for="password">Password</label>
            <input className="white-text" type="password" id="password" onChange={handleChange}/>
          </div>

          <div className="input-field">
            <button className="btn z-depth-0 signup-btn">Continue</button>
          </div>
        </form>
      </div>
    )
  }



export default SignIn
