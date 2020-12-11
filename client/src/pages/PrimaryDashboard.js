import React, { useState, useContext } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { PrimaryContext } from '../PrimaryContext'
import FeaturedMovie from "../components/FeaturedMovie.js";
import CarouselsHolder from '../components/carousels/CarouselsHolder.js'
import SearchBar from '../components/SearchBar'



const PrimaryDashboard = (props) => {
  const [searchContents, setSearchContents] = useState(null)

  const context = useContext(PrimaryContext)
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

        <SearchBar props={props}/>
        <FeaturedMovie />
        <CarouselsHolder />

    </div>
  );
};

export default PrimaryDashboard;
