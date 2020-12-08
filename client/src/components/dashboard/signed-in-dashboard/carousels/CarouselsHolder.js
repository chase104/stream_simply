import React, {useState, useEffect} from 'react'
import CarouselOne from './CarouselOne'
import CarouselTwo from './CarouselTwo'
import CarouselThree from './CarouselThree'
import CarouselFour from './CarouselFour'
import CarouselFive from './CarouselFive'
import axios from 'axios'






const CarouselsHolder = () => {


const [user, setUser] = useState(false)
const [dataReturn, setDataReturn] = useState(false)
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
    {
      dataReturn == false ?

      <p>loading...</p>

      :
      user == false ?
      <div key="user-carousel">
        <CarouselOne user={false}/>
        <CarouselTwo user={false}/>
        <CarouselThree  user={false}/>
        <CarouselFour user={false}/>
        <CarouselFive user={false}/>
      </div>
      :
      <div key="user-carousel">
        <CarouselOne user={user}/>
        <CarouselTwo user={user}/>
        <CarouselThree  user={user}/>
        <CarouselFour user={user}/>
        <CarouselFive user={user}/>
      </div>
    }
  </div>
)
}


export default CarouselsHolder
