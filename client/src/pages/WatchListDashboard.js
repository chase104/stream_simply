import React, {useState, useEffect} from 'react'
import SearchBar from '../components/SearchBar'
import Card from '../components/Card'
import Grid from '@material-ui/core/Grid';
import axios from 'axios'




const WatchListDashboard = () => {


  const [watchList, setWatchList] = useState(false)
  const [user, setUser] = useState(false)
  const [dataReturn, setDataReturn] = useState(false)

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

    const checkIfFavorite = (movie) => {
      if (watchList.favorited != null) {
        if (watchList.favorited.includes(movie.id)) {
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
          <div className="favorites-title" style={{fontFamily: "'Quicksand', sans-serif"}}>Watch List</div>
          <div className="favorite-card-holder" style={{marginBottom: "10vw"}}>
          {
            watchList ?

            <Grid container style={{flexGrow: 1}} spacing={1} justify="center">
              <Grid item xs={11} s={6}>
                <Grid container justify="center" style={{ justifyContent: "flex-start"}} spacing={2}>
                  {watchList.movies.map((movie) =>

                    <Grid item xs={2}>
                      <Card content={movie} favoritedMovie={checkIfFavorite(movie)} watchList={true} user={user}/>
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
