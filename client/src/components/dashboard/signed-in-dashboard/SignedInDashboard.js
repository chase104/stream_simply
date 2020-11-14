import React, { useState } from "react";
import axios from "axios";
import Customers from "./Customers";
import FeaturedMovie from "./FeaturedMovie.js";
import Button from "@material-ui/core/Button";
import CarouselsHolder from './carousels/CarouselsHolder.js'

const SignedInDashboard = () => {
  return (
    <div>
      <form id="form-id" onSubmit={""}>
        <div id="search-div" className="container">
          <div className="input-search-container">
            <input
              type="text"
              className="black-text input-field main-search"
              id="dashboard-search"
              placeholder="Search movie/show..."
            />

            <div
              className="icon-holder-search"
              onClick={() => {
                console.log("hello");
              }}
            >
          </div>

            <Button variant="contained" className="inner-holder">
              <i class="material-icons left search-button-icon search-icon-dashboard grey-text text-darken-3">
                search
              </i>
            </Button>
          </div>
        </div>
        <FeaturedMovie />

      </form>
      <CarouselsHolder />
    </div>
  );
};

export default SignedInDashboard;
