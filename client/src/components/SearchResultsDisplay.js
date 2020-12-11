import React, {useState, useEffect} from 'react'
import Card from './Card.js'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const SearchResultsDisplay = ({results, searchState}) => {

  const [filterState, setFilterState] = useState(false)

  useEffect(() => {
    if (filterState) {
      setFilterState(false)
    } else {
      setFilterState(true)
    }
  }, searchState)
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
                      <Card number={8} search={true} content={itemm}/>
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
