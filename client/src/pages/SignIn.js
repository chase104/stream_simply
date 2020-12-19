import React, { Component, useState } from 'react'
import axios from 'axios'



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
        <div className="container">
          <form onSubmit={handleSubmit} className="signup">
            <div className="title-header">
              <h5 className=" quicksand-font yellow-font" style={{fontSize: "3rem"}}>Login</h5>
              <i class="material-icons grey-text arrow-icon yellow-font">arrow_forward</i>
              <h5 className="grey-text text-darken-1 search-h5">Search</h5>
              <i class="material-icons grey-text search-icon">search</i>
            </div>
            <div className="input-field">
              <label for="email">Email</label>
              <input style={{marginTop: "3px"}} className="grey-text" type="email" id="email" onChange={handleChange}/>
            </div>
            <div className="input-field">
              <label for="password">Password</label>
              <input className="grey-text" type="password" id="password" onChange={handleChange}/>
            </div>
            <div className="input-field">
              <button className="btn z-depth-0 signup-btn">Continue</button>
            </div>
          </form>
          <div className="padding-top">
            <h5 className="white-text">Don't have an Account?</h5>
            <a class="waves-effect waves-light btn signup-btn" onClick={() => {window.location="/signup"}}>Sign Up</a>
          </div>
        </div>
      </div>

    )
  }



export default SignIn
