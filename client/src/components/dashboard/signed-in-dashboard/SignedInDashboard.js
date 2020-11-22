import React, { useState, useContext } from "react";
import axios from "axios";
import Customers from "./Customers";
import FeaturedMovie from "./FeaturedMovie.js";
import Button from "@material-ui/core/Button";
import CarouselsHolder from './carousels/CarouselsHolder.js'
import { PrimaryContext } from '../../../PrimaryContext'
import Search from '../../layout/Search'



const SignedInDashboard = (props) => {
  const [searchContents, setSearchContents] = useState(null)

  const context = useContext(PrimaryContext)
  console.log(context);
  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchContents(e.target.value)
  }
  const handleSearch = async (e) => {
    e.preventDefault()
    console.log(searchContents);
    await axios({
      method: 'POST',
      data: {
        input: searchContents
      },
      withCredentials: true,
      url: '/search'
    }).then((res) => {
      console.log(res);
      console.log("running context edit...");
      context.changeTheme({hellocontext: "Hellooooo"})
      console.log(props);
      props.props.history.push("/search")
    })
  }
  return (
    <div>

        <Search props={props}/>
        <FeaturedMovie />

      <CarouselsHolder />
    </div>
  );
};

export default SignedInDashboard;
