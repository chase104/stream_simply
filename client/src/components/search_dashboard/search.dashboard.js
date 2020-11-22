import React, {useContext, useEffect, useState} from 'react'
import SearchFilter from './search.filter'
import { PrimaryContext } from '../../PrimaryContext'
import axios from 'axios'
import Search from '../layout/Search'
import {ExpandMore, ExpandLess} from '@material-ui/icons';

const SearchDashboard = (props) => {


    const [searchResults, setSearchResults] = useState(null)
    const [searchState, setSearchState] = useState(false)


    const context = useContext(PrimaryContext)
    console.log(context);
    console.log(context.searchData);
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

  return (
    <div style={{marginTop: "2rem"}}>
      <Search props={props} searchFunction={() => searchFunction()}/>
      <div className="container">
        <div className="closed-menu">
          <ExpandMore className="expand-icon"/>
          <div className="search-title">Search Settings</div>
        </div>
      </div>
      <SearchFilter results={searchResults} searchState={searchState}/>
    </div>
  )
}

export default SearchDashboard
