import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Customers = () => {

  let [movieDetails, setMovieDetails] = useState(null)
  let netflixImg = null
  let movieImg = null
  let finalImg = null

    useEffect(() => {
      console.log('Running fetch...');
    }, [])



  return(
    <div>
      {movieDetails &&
          <div>
            <img src={movieDetails.movieImg} style={{width:'200px', height:'200px'}}/>
            <img src={movieDetails.netflixImg} />
          </div>

      }
    </div>
  )
}

export default Customers
