import React, {useContext, useEffect, useState} from 'react'
import SearchFilter from './search.filter'
import { PrimaryContext } from '../../PrimaryContext'
import axios from 'axios'
import Search from '../layout/Search'
import {ExpandMore, ExpandLess} from '@material-ui/icons';
import SearchSettings from './search.settings.js'
const SearchDashboard = (props) => {


    const [searchResults, setSearchResults] = useState(null)
    const [searchState, setSearchState] = useState(false)
    const [menuIsOpen, setMenuIsOpen] = useState(false)

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
      <Search props={props} searchFunction={() => searchFunction()} fromSearch={true}/>
      <div className="container">
        <div className="menu-container">
          <div className="closed-menu" onClick={(e) => handleMenuClick(e)}>
            {!menuIsOpen ? <ExpandMore className="expand-icon"/>
            : <ExpandLess className="expand-icon" />
}
            <div className="search-title">Search Settings</div>
          </div>
          <div className="search-settings search-settings-hidden" id="search-settings">
            <SearchSettings searchData={context.searchData} passResults={(res) => passResults(res)} previousSearch={context.searchData}/>
          </div>


        </div>
      </div>
      <SearchFilter results={searchResults} searchState={searchState}/>
    </div>
  )
}

export default SearchDashboard
