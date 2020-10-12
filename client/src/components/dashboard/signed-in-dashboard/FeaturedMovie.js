import React, {useState, useEffect} from 'react'
import axios from 'axios'

const FeaturedMovie = () => {


    let [featuredMedia, setFeaturedMedia] = useState(false)

      useEffect(() => {
        console.log('Running FM fetch...')


        async function getApi() {
          const axiosRes = await axios.get('/getFeaturedMovie').then(response => {
            return response.data.results[0]
            console.log(response)
          })
          setFeaturedMedia(axiosRes)
          console.log(axiosRes);
        }

        getApi();


      }, [])



  return(
    <div className="featured-movie">
      <p className="white-text center featured-title">Featured Show</p>
      {renderShow()}
    </div>
  )

  function renderShow(){
    if (!featuredMedia) return <p className="white-text">'Loading media...'</p>
    return (
      <div className="featured-movie-block center">
        <img className="featuredImg" src={featuredMedia.picture} style={{width: '40vh', height: '30vh'}} />
        <div className="title-and-joint-holder">
          <h6 className="white-text featured-media-title center">{featuredMedia.name}</h6>
          <div className="joint-holder">
            <div className="genres-div">
              <h5 className="featured-media-genres-title">Genres</h5>
              <ul className="white-text">
                <li>Comedy</li>
                <li>Action</li>
                <li>Drama</li>
              </ul>
            </div>
            <div className="available-on-div center">
              <h5 className="featured-media-genres-title">Available On</h5>
              <img src={featuredMedia.locations[0].icon} />
            </div>
          </div>

        </div>
      </div>
    )
  }
}


export default FeaturedMovie
