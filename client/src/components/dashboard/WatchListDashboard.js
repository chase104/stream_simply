import React, {useState, useEffect} from 'react'
import Search from '../layout/Search'
import Card from './signed-in-dashboard/carousels/Card'
import Grid from '@material-ui/core/Grid';
import axios from 'axios'




const WatchListDashboard = () => {


  const [watchList, setWatchList] = useState(false)

  useEffect(() => {
    async function getWatchList() {
      const axiosResponse =  await axios({
              method: "GET",
              withCredentials: true,
              url: "/getWatchList"
            }).then((res) => {
              return res
            })
        console.log(axiosResponse);
        setWatchList(axiosResponse.data)
    }
    getWatchList()
  }, [])

  return (
    <div>
      <Search />
        <div className="favorites-holder">
          <div className="favorites-title" style={{fontFamily: "'Quicksand', sans-serif"}}>Watch List</div>
          <div className="favorite-card-holder" style={{marginBottom: "10vw"}}>
          {
            watchList ?

            <Grid container style={{flexGrow: 1}} spacing={1} justify="center">
              <Grid item xs={11} s={6}>
                <Grid container justify="center" style={{ justifyContent: "flex-start"}} spacing={2}>
                  {watchList.movies.map((movie) =>

                    <Grid item xs={2}>
                      <Card content={movie} favoritedMovie={watchList.favorited.includes(movie.id) ? true : false} watchList={true}/>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
            :
            <p>loading...</p>


          }



          </div>
        </div>
    </div>
  )
}

export default WatchListDashboard
