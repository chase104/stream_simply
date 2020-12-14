import React, {useContext, useState, useEffect} from 'react'
import {PrimaryContext} from '../PrimaryContext'
import Button from "@material-ui/core/Button";


import axios from 'axios'

const SearchBar = ({props, searchFunction, searchState, fromSearch, searchFromSettings}) => {

  const [searchContents, setSearchContents] = useState(null)
  const context = useContext(PrimaryContext)


  useEffect(() => {
    console.log("this is SearchBar!");
    console.log(props.history);
    console.log(props.history.location.pathname);
  }, [])

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchContents(e.target.value)
  }

  const handleBrowseClick = () => {
    window.location = '/search'
  }
  const handleSearch = async (e) => {
    e.preventDefault()
    if (props.history.location.pathname == "/search"){
      console.log("running setting search");
      searchFromSettings(searchContents)
    } else {
      console.log("running normal search");
      console.log(searchContents);
      await axios({
        method: 'POST',
        data: {
          input: searchContents
        },
        withCredentials: true,
        url: '/search'
      }).then((res) => {
        console.log("running context edit...");
        context.changeTheme({searchData: searchContents})
        if (searchContents) {
          props.history.push("/search")
        } else {
          if (searchState === false) {
            searchFunction(true)
          } else {
            searchFunction(false)
          }
        }
      })
    }
  }
  return (
    <div>
      <form id="form-id" onSubmit={handleSearch}>
        <div id="search-div" className="container">
          <div className="input-search-container">
            <input
              type="text"
              className="black-text input-field main-search quicksand-font"
              id="dashboard-search"
              placeholder="Search movie..."
              onChange={handleChange}
            />

            <div
              className="icon-holder-search"
              onClick={() => {
                console.log("hello");
              }}
            >
          </div>

            <Button variant="contained" className="inner-holder " style={{boxShadow: "none !important"}} onClick={handleSearch}>
              <i className="material-icons left search-button-icon search-icon-dashboard grey-text text-darken-3">
                search
              </i>
            </Button>
          </div>
        </div>
      </form>
      <div className="container browse-button-holder">
      <Button size="large" style={{padding: "10px", backgroundColor: "#cb861a"}}
        className="quicksand-font"
        onClick={handleBrowseClick}
        >Browse By Category
      </Button>
      </div>
    </div>
  )
}

export default SearchBar
