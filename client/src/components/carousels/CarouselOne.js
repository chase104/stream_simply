import React, {useState, useEffect, useContext} from 'react';
import Carousel from 'react-elastic-carousel';
import {Paper, Button} from '@material-ui/core';
import { PrimaryContext } from '../../PrimaryContext'

import Card from '../Card.js'
import axios from "axios";

const CarouselOne = ({user}) => {

  const [carouselMedia, setCarouselMedia] = useState(false)
  const [fillerMedia, setFillerMedia] = useState([1,2,3,4,5,6])

  const context = useContext(PrimaryContext)

  console.log(user);
  useEffect(() => {
    console.log(context);
    async function getApi() {
      const axiosRes = await axios.get("/getTmbd/carousel_one").then(response => {
        console.log({ response });
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





  return (
    <div>
      <h2  className="carousel-title">Popular movies</h2>
      {
        <Carousel breakPoints={breakPoints}>
          {
            !carouselMedia ? fillerMedia.map((item) => {
              return (
                <Card valid={false} number="1" key={item.id} user={user}/>
              )
            })
            : carouselMedia.map((item) => {
              return (
                <Card valid={true} number="2" content={item} user={user} isOne={true} key={"media"+item.id}/>
              )
            })
          }
        </Carousel>

      }

    </div>

  )
}

export default CarouselOne
