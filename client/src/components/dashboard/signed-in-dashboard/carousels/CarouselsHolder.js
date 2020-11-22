import React from 'react'
import CarouselOne from './CarouselOne'
import CarouselTwo from './CarouselTwo'
import CarouselThree from './CarouselThree'
import CarouselFour from './CarouselFour'
import CarouselFive from './CarouselFive'

const CarouselsHolder = () => {

  const genreCypher = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  }
  return (
    <div style={{marginBottom: "300px"}}>
      <CarouselOne />
      <CarouselTwo />
      <CarouselThree />
      <CarouselFour />
      <CarouselFive />
    </div>
  )
}
export default CarouselsHolder
