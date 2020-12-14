import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {ExpandMore, ExpandLess} from '@material-ui/icons';
import { PrimaryContext } from '../PrimaryContext'
import SearchResultsDisplay from '../components/SearchResultsDisplay'
import SearchBar from '../components/SearchBar'
import SearchSettings from '../components/SearchSettings'

const SearchDashboard = (props) => {

    const [searchResults, setSearchResults] = useState(null)
    const [searchState, setSearchState] = useState(false)
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [onSearchDashboard, setOnSearchDashboard] = useState(false)
    const [searchBoolean, setSearchBoolean] = useState(false)
    const [contentsOfSearch, setContentsOfSearch] = useState(false)
    const context = useContext(PrimaryContext)

  const axiosCall = async (context) => {
    console.log(context.searchData);
    await axios({
      method: 'POST',
      data: {
        data: context.searchData
      },
      withCredentials: true,
      url: '/getTmbd/makeSearch'
    }).then((res) => {
      console.log("response:", res);
      setSearchResults(res.data.results)
    })
  }

  const passResults = (information) => {
    console.log("passed information: ", information);
    setSearchResults(information)
  }

  useEffect(() => {
    let mounted = true;
    console.log(context);
    axiosCall(context)
    return () => mounted = false
  }, [context.searchData])



const searchFunction = (boolean) => {
  if (boolean === false) {
    setSearchResults(true)
  } else {
    setSearchState(false)
  }
}

let element = document.getElementById("search-settings")

const searchFromSettings = (searchContents) => {
  console.log(searchContents);
  setContentsOfSearch(searchContents)
  console.log("changing boolean");
  setSearchBoolean(!searchBoolean)
}
const handleMenuClick = (e) => {
  console.log("menu clicked")
  console.log(e.target);
  console.log(e.target.parentNode);
  console.log(element);
  if (element.classList.contains('search-settings-hidden')){
    element.classList.remove('search-settings-hidden')
    setMenuIsOpen(true)
  } else {
    element.classList.add('search-settings-hidden')
    setMenuIsOpen(false)
  }
}
  return (
    <div style={{marginTop: "2rem", marginBottom: "10vw"}} className="search-dashboard">
      <SearchBar props={props} searchFunction={() => searchFunction()} fromSearch={true} searchFromSettings={searchFromSettings}/>
      <div className="container">
        <div className="menu-container">
          <div className="closed-menu" onClick={(e) => handleMenuClick(e)}>
            {!menuIsOpen ? <ExpandMore className="expand-icon"/>
            : <ExpandLess className="expand-icon" />
            }
            <div className="search-title">Search Settings</div>
          </div>
          <div className="search-settings search-settings-hidden" id="search-settings">
            <SearchSettings searchData={context.searchData} passResults={(res) => passResults(res)} previousSearch={context.searchData} searchBoolean={searchBoolean} searchContents={contentsOfSearch}/>
          </div>
        </div>
      </div>
      <SearchResultsDisplay results={searchResults} searchState={searchState}/>
    </div>
  )
}

export default SearchDashboard
