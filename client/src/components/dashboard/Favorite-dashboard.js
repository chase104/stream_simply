import React, {useState, useEffect} from 'react'
import Search from '../layout/Search'
import Card from './signed-in-dashboard/carousels/Card'
import Grid from '@material-ui/core/Grid';
import axios from 'axios'




const FavoriteDashboard = () => {


  const [favoriteMovies, setFavoriteMovies] = useState(null)

  useEffect(() => {
    async function getFavorites() {
      const axiosResponse =  await axios({
              method: "GET",
              withCredentials: true,
              url: "/getFavorites"
            }).then((res) => {
              return res
            })
        console.log(axiosResponse);
    }
    getFavorites()
  }, [])

  return (
    <div>
      <Search />
        <div className="favorites-holder">
          <div className="favorites-title">Favorited Movies</div>
          <div className="favorite-card-holder">
          <Grid container style={{flexGrow: 1}} spacing={1} justify="center">
            <Grid item xs={11} s={6}>
              <Grid container justify="center" style={{ justifyContent: "flex-start"}} spacing={2}>
                <Grid item xs={2}>
                  <Card />
                </Grid>
                <Grid item xs={2}>
                  <Card />
                </Grid>
                <Grid item xs={2}>
                  <Card />
                </Grid>
                <Grid item xs={2}>
                  <Card />
                </Grid>
                <Grid item xs={2}>
                  <Card />
                </Grid>
                <Grid item xs={2}>
                  <Card />
                </Grid>
                <Grid item xs={2}>
                  <Card />
                </Grid>
                <Grid item xs={2}>
                  <Card />
                </Grid>


              </Grid>
            </Grid>
          </Grid>


          </div>
        </div>
    </div>
  )
}

export default FavoriteDashboard
