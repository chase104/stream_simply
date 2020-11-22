import React, {useState} from 'react'
import {Modal} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import { Paper } from "@material-ui/core";



const Card = ({valid, number, content, genreFunction, search}) => {
  let cardClassname
  let imgUrl

  if (valid) {
    if (search) {
      cardClassname = "card search-card"
    } else {
      cardClassname = "card"
    }
  } else if (search) {
    cardClassname = "card search-card loading-card"
  } else {
    cardClassname = "card loading-card"
  }



const returnDate = () => {
  const d = new Date(content.release_date)
  return d.getFullYear()
}


  const [movieModal, setMovieModal] = useState(false)
  const [availabilityData, setAvailabilityData] = useState(false)
  const [availabilityDataa, setAvailabilityDataa] = useState(null)
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


  const getGenres = (genreIds) => {
    console.log(genreIds);
    for(var i=0; i<2; i++) {

      return <li className="genres-li">{genreCypher[genreIds[i]]}</li>
    }

  }

  const movieModalBody = () => (
    <div className="modal-style" style={{marginTop: "8%", color: "white"}}>
      <div className="title-holder">
        <h3 className="simple-modal-title" style={{maxWidth: "75%"}}>{content ? content.original_title : null}</h3>
        <h3 className="simple-modal-title" style={{marginLeft: 'auto'}}>{content ? returnDate() : null}</h3>
      </div>
      <div className="containerflex">
      {content ?       <img src={`https://image.tmdb.org/t/p/original${content.poster_path}`} className="modal-img"/> : null}
      <div style={{display: "flex", flexDirection: "column", marginLeft: "10px"}}>
        <div style={{display: "flex"}}>
          <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{fontSize: "24px"}} className="genres-title">Geres:</div>
          </div>
          <div style={{display: "flex", flexWrap: "wrap"}}>
            {content ? content.genre_ids.map((id) =>  (<div className="genres-li">{genreCypher[id]}</div>)) : null}
          </div>
        </div>
        <div className="divider"></div>

        <div style={{fontSize: "1.7rem"}}>{content ? content.overview : null}</div>
        <div className="divider"></div>
        <div style={{display: "flex", flexDirection: "column", marginTop: "15px"}}>
          <h5>Included in Subscription on:</h5>

          <div style={{display: "flex", flexWrap: "wrap"}}>
          { availabilityData != false ? availabilityData == undefined ? <div className="not-available">Not Available Via Subscription</div> :

            availabilityData.map((item) =>

            <a href={item.url} style={{marginLeft:"15px"}} target="_blank">
              <img src={item.icon} />
            </a>
          )
          :
          <div style={{display: "flex"}}>
            <div className="filler-div-icon"></div>
            <div className="filler-div-icon"></div>
            <div className="filler-div-icon"></div>
          </div> }



          </div>
        </div>
      </div>

      </div>
    </div>
  )

  const handleClick = () => {
    console.log("card clicked");
    movieModal == true ? setMovieModal(false) : setMovieModal(true)
    async function getApi() {
      console.log("running api");
      console.log(content.id);
      const axiosRes = await axios.post("/getMovieAvailability", {
        movieId: content.id
      }).then(response => {
        console.log(response.data.response.collection.locations)
        setAvailabilityData(response.data.response.collection.locations)
      });
      //set usestate
    }
    getApi()
  }

const modal = () => (
  <Modal
    open={movieModal}
    onClose={() => {
      console.log("closing")
      setMovieModal(false)}}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    {console.log("movie modal")}
    {movieModalBody()}
  </Modal>
)


  return (
    <div className={cardClassname} onClick={handleClick}>
      {content ?
        <div className="card-valid" style={{width: "100%", backgroundImage: `url(https://image.tmdb.org/t/p/original${content.poster_path})`}}>
        </div>

       :
        <div>{number}</div>
      }
      <Modal
        open={movieModal}
        onClose={() => setMovieModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {movieModalBody()}
      </Modal>
     </div>
  )
}

export default Card
