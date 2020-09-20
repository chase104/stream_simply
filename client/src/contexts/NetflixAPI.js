import React, {useState} from 'react'

const [ movieData, setMovieData ] = useState(null)

export function getMovieData() {
  setMovieData(
    axios({
    "method":"GET",
    "url":"https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
    "x-rapidapi-key":"12e1e06344mshbbfb57c2be00fdfp16c653jsnc7ee0c0aab1d",
    "useQueryString":true
    },"params":{
    "term":"bojack",
    "country":"uk"
    }
    })
    .then((response)=>{

       finalImg =netflixImg
       setImage(finalImg)

    })
    .catch((error)=>{
      console.log(error)
    })

  )
}
