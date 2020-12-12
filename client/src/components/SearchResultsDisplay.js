import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Card from './Card.js'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const SearchResultsDisplay = ({results, searchState}) => {

  const [filterState, setFilterState] = useState(false)
  const [user, setUser] = useState(false)
  const [dataReturn, setDataReturn] = useState(false)

  useEffect(() => {
    if (filterState) {
      setFilterState(false)
    } else {
      setFilterState(true)
    }
  }, searchState)

  const getUserInfo = () => {
    try{
      console.log("axios user request");
      axios({
        method: "GET",
        withCredentials: true,
        url: "/userinfo"
      }).then((res) => {
        console.log(res.data);
          console.log("rerender");
          setUser(null)
          setUser(res.data)
          if (res.data === false){
            console.log("it's false");
            setDataReturn(true)
          } else {
            setDataReturn(true)
          }
        }).then(() => {
          console.log(user);
        })
      }
    catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
      getUserInfo()
    }, [])

  const resultsProxy = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  console.log(results);
  return (
    <div  style={{marginTop: "30px"}}>
      <Grid container style={{flexGrow: 1}} spacing={1} justify="center">
        <Grid item xs={11} s={6}>
          <Grid container justify="center" style={{ justifyContent: "flex-start"}} spacing={2}>
            { results ?
                results.map((itemm) => {
                  if(itemm.poster_path)
                  return(
                    <Grid key={itemm.id} item xs={2}>
                      <Card number={8} search={true} content={itemm} user={user}/>
                    </Grid>
                  )
                }
                )
                :
            null
          }
          </Grid>
        </Grid>
      </Grid>
    </div>

  )
}

export default SearchResultsDisplay
