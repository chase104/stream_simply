import React, {useContext, useState} from 'react'
import {PrimaryContext} from '../PrimaryContext'
import Button from "@material-ui/core/Button";


import axios from 'axios'

const SearchBar = ({props, searchFunction, searchState, fromSearch}) => {

  const [searchContents, setSearchContents] = useState(null)
  const context = useContext(PrimaryContext)

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchContents(e.target.value)
  }

  const handleBrowseClick = () => {
    window.location = '/search'
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
      console.log("running context edit...");
      context.changeTheme({searchData: searchContents})
      if (props.props) {
        props.props.history.push("/search")
      } else {
        if (searchState === false) {
          searchFunction(true)
        } else {
          searchFunction(false)
        }
      }
    })
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
