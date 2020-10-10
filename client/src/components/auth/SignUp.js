import React, { Component, useState } from 'react';
import AlreadyHave from './AlreadyHave';
import axios from 'axios';

const SignUp = () => {



  const [signUpState, setSignUpState] = useState();
  let getState = (signupState) => {
    return signUpState
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (signUpState.password === signUpState.confirmpassword && signUpState.email) {
      console.log(signUpState);
      console.log(e);
      axios({
        method: "POST",
        data: {
          ...signUpState
        },
        withCredentials: true,
        url: "/signup"
      }).then((res) => {console.log(res);})
    } else {
      console.log('password error');
    }
  }


  const handleChange = (e) => {
    let id = e.target.id
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
            <h5 className="white-text text-darken-1">Sign Up</h5>
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
            <label for="confirmpassword">Confirm Password</label>
            <input className="white-text" type="password" id="confirmpassword" onChange={handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn z-depth-0 signup-btn">Continue</button>
          </div>
        </form>
        <AlreadyHave />
      </div>
    )
  }



export default SignUp
