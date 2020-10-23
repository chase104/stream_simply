import React, { useState, useEffect} from 'react'
import axios from 'axios'

const Settings = () => {

  const [accountState, setAccountState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subscriptions: ['Netflix', 'Amazon', 'Hulu'],
    country: 'US'
  })
 

  useEffect(() => {
    axios({
      method: "GET",
      url: '/userinfo',
      withCredentials: true,

    }).then((res) => {
      console.log(res)
      let initials = res.data.firstname.charAt(0).toUpperCase() + res.data.lastname.charAt(0).toUpperCase()
      setAccountState({
        ...accountState,
        ...res.data,
        initials: initials
      })
    })
  }, [])
  console.log(accountState);


  const handleMouseOver = () => {
    let countryExplainer = document.getElementById('explain-country')
    countryExplainer.classList.remove('hide')
    }

  const handleMouseOut = () => {
      let countryExplainer = document.getElementById('explain-country')
      countryExplainer.classList.add('hide')
    }

  const handleColorSave = () => {
      let countryExplainer = document.getElementById('explain-country')
      countryExplainer.classList.add('hide')
    }

  const handleEditClick = () => {

  }

  const handleClick = (e) => {
    console.log('clicked', e.target.parentNode.parentNode.classList.add('hide'));
  }

  const handleSubmit = (e) => {
    let select = document.getElementById('select-input').value;
    console.log(select)
    let colorForm = document.getElementById('change-color')
    colorForm.classList.add('hide')
  }

  const handleColorClick = () => {
    let colorForm = document.getElementById('change-color')
    console.log(colorForm)
    colorForm.classList.contains('hide') ? colorForm.classList.remove('hide') : colorForm.classList.add('hide')
  }


  return(
    <div className="container settings-container">
    <div className="account-block">
      <div className="btn btn-floating lighten-1 account-button-big" onClick={handleColorClick}>{accountState.initials}</div>
      <div className="info-holder">
        <form id="change-color" className="change-color hide" onSubmit={handleSubmit}>
          <div className="form-container">
            <label for="cars">Select Your Color Theme:</label>
            <i class="material-icons right close-icon" onClick={handleClick}>close</i>

            <select style={{display: "inline-block"}} name="cars" id="select-input">
              <option className="yellow-color" value="#cb861a">Deep-yellow</option>
              <option className="red-color white-text" value="#460b0b">Myrtle</option>
              <option  className="light-color" value="#ffdb84">Light-yellow</option>
            </select>
            <div className="btn save-color right" onClick={handleSubmit}>Save</div>
          </div>

        </form>
          <h6 className="white-text featured-media-title">{accountState.firstname} {accountState.lastname}
              <i class="material-icons edit-icon" onClick={handleEditClick}>edit</i>
          </h6>
          <div className="account-info-holder">
            <h5 className="settings-titles">Email:</h5>
            <div className="white-text center email-field">{accountState.email}</div>
            <i class="material-icons edit-icon white-text field-icon" onClick={handleEditClick}>edit</i>

          </div>
          <div className="account-info-holder">
            <h5 className="settings-titles">Subscriptions:</h5>
            {accountState.subscriptions.map(subscription => {
              return(
                <div className="white-text center email-field">{subscription}</div>
              )
            }
            )}


          </div>
          <div className="account-info-holder">
            <h5 className="settings-titles">Country:</h5>
            <div className="white-text center email-field">{accountState.country}</div>
            <div className="extra-info center" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>?</div>
            <i class="material-icons edit-icon white-text field-icon" onClick={handleEditClick}>edit</i>
            <div id="explain-country" className="hide country-explainer">Display availability for this country</div>

          </div>
          <div>
            <div className="change-password">change password</div>
          </div>

      </div>



      </div>
    </div>
  )
}

export default Settings
