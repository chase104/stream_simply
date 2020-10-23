import React, { Component, useState } from 'react';
import AlreadyHave from './AlreadyHave';
import axios from 'axios';

const SignUp = () => {



  const [signUpState, setSignUpState] = useState();
  let getState = (signupState) => {
    return signUpState
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (signUpState.password === signUpState.confirmpassword && signUpState.email) {
      console.log(signUpState);
      await axios({
        method: "POST",
        data: {
          ...signUpState
        },
        withCredentials: true,
        url: "/signup"
      }).then((res) => {
        console.log(res);
        window.location='/login'
      })
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
            <h5 className="black-text text-darken-1">Sign Up</h5>
            <i class="material-icons black-text arrow-icon">arrow_forward</i>
            <h5 className="grey-text text-darken-1 search-h5">Search</h5>
            <i class="material-icons grey-text search-icon">search</i>

          </div>

          <div className="input-field">
            <label for="firstname">First Name</label>
            <input className="black-text" type="text" id="firstname" onChange={handleChange}/>
          </div>
          <div className="input-field">
            <label for="lastname">Last Name</label>
            <input className="black-text" type="text" id="lastname" onChange={handleChange}/>
          </div>
          <div className="input-field">
            <label for="email">Email</label>
            <input className="black-text" type="email" id="email" onChange={handleChange}/>
          </div>
          <div className="input-field">
            <label for="password">Password</label>
            <input className="black-text" type="password" id="password" onChange={handleChange}/>
          </div>
          <div className="input-field">
            <label for="confirmpassword">Confirm Password</label>
            <input className="black-text" type="password" id="confirmpassword" onChange={handleChange}/>
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
