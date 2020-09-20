import React, {useState} from 'react'
import axios from 'axios'
import Customers from './Customers'
import FeaturedMovie from './FeaturedMovie.js'

const SignedInDashboard = () => {



    return(
      <div>
        <form id="form-id" onSubmit={''}>

          <div id="search-div" className="container">
           <input type='text' className="black-text" id='dashboard-search' placeholder="Search movie/show..."/>
             <i class="material-icons left search-button-icon search-icon-dashboard grey-text text-darken-3" onClick={''}>search</i>
          </div>
          <FeaturedMovie />

          <Customers />
        </form>
      </div>

    )






}


export default SignedInDashboard
