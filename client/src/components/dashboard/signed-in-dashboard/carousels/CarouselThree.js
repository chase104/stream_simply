import React, {useState, useEffect} from 'react';
import Carousel from 'react-elastic-carousel';
import {Paper, Button} from '@material-ui/core';
import Card from './Card.js'
import axios from "axios";

const CarouselThree = () => {

  const [carouselMedia, setCarouselMedia] = useState(null)
  const [fillerMedia, setFillerMedia] = useState([1,2,3,4,5,6])


  useEffect(() => {
    async function getApi() {
      const axiosRes = await axios.get("/getTmbd/carousel_three").then(response => {
        return response.data.results;
      });
      setCarouselMedia(axiosRes);
    }

    getApi();
  }, []);

  const breakPoints = [
    {width: 500, itemsToShow: 3},
    {width: 786, itemsToShow: 4},
    {width: 1200, itemsToShow: 5},
    {width: 1500, itemsToShow: 6}
  ]

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
    <div>
      <h2 className="carousel-title">Action</h2>
      <Carousel breakPoints={breakPoints}>
        {
          !carouselMedia ? fillerMedia.map((item) => {
            return (
              <Card valid={false} number="1"  key={"filler"+item}/>
            )
          })
          : carouselMedia.map((item) => {
            return (
              <Card valid={true} number="2" content={item} key={"media"+item.id}/>
            )
          })
        }
      </Carousel>
    </div>

  )
}

export default CarouselThree
