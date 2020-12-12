import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import Card from '../components/Card'




const FavoriteDashboard = () => {

  const [favoriteMovies, setFavoriteMovies] = useState(false)
  const [user, setUser] = useState(false)
  const [dataReturn, setDataReturn] = useState(false)

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
        setFavoriteMovies(axiosResponse.data)
    }
    getFavorites()
  }, [])

    const getUserInfo = () => {
      try{
        console.log("axios user request");

        axios({
          method: "GET",
          withCredentials: true,
          url: "/userinfo"
        }).then( (res) => {
          console.log(res.data);
            console.log(" rerender");
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

const watchListCheck = (movie) => {
  if (favoriteMovies.watchlist != null) {
    if (favoriteMovies.watchlist.includes(movie.id)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}
  return (
    <div>
      <SearchBar />
        <div className="favorites-holder">
          <div className="favorites-title" style={{fontFamily: "'Quicksand', sans-serif"}}>Favorited Movies</div>
          <div className="favorite-card-holder" style={{marginBottom: "10vw"}}>
          {
            favoriteMovies ?
            <Grid container style={{flexGrow: 1}} spacing={1} justify="center">
              <Grid item xs={11} s={6}>
                <Grid container justify="center" style={{ justifyContent: "flex-start"}} spacing={2}>
                  {favoriteMovies.movies.map((movie) =>

                    <Grid item xs={2}>
                      <Card content={movie} favoritedMovie={true} watchList={watchListCheck(movie)} user={user}/>
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

export default FavoriteDashboard
