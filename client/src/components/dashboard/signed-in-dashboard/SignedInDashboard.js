import React, { useState } from "react";
import axios from "axios";
import Customers from "./Customers";
import FeaturedMovie from "./FeaturedMovie.js";
import Button from "@material-ui/core/Button";

const SignedInDashboard = () => {
  return (
    <form id="form-id" onSubmit={""}>
      <div id="search-div" className="container">
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
          <Button variant="contained" className="inner-holder">
            <i class="material-icons left search-button-icon search-icon-dashboard grey-text text-darken-3">
              search
            </i>
          </Button>
        </div>
      </div>
      <FeaturedMovie />

      <Customers />
    </form>
  );
};

export default SignedInDashboard;
