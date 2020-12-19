import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import {Modal} from '@material-ui/core';
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";

const FeaturedMovie = () => {
  let [featuredMedia, setFeaturedMedia] = useState(false);
  const [movieModal, setMovieModal] = useState(false)
  const [availabilityData, setAvailabilityData] = useState(false)
  const [timer, setTimer] = useState(3000)


  useEffect(() => {
    async function getApi() {
      const axiosRes = await axios.get("/getFeaturedMovie").then(response => {
        return response.data.results;
      });
      setFeaturedMedia(axiosRes);
    }

    getApi();
  }, []);

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

  const handleClick = (content) => {
    console.log("card clicked");
    movieModal == true ? setMovieModal(false) : setMovieModal(true)
    if (timer === 3000) {
      setTimer(300000)
    }
    async function getApi() {
      console.log("running api");
      console.log(content.id);
      const axiosRes = await axios.post("/getMovieAvailability", {
        movieId: content.id
      }).then(response => {
        console.log(response.data.response.collection.locations)
        setAvailabilityData(response.data.response.collection.locations)
      });
    }
    getApi()
  }

  const handleModalClose = () => {
    setMovieModal(false)
    setTimer(3000)
  }
  const returnDate = (content) => {
    const d = new Date(content.release_date)
    return d.getFullYear()
  }



  const movieModalBody = (content) => (
    <div className="modal-style" style={{marginTop: "8%", color: "white"}} >
      <div className="title-holder">
        <h3 className="simple-modal-title" style={{maxWidth: "75%"}}>{content ? content.original_title : null}</h3>
        <h3 className="simple-modal-title" style={{marginLeft: 'auto'}}>{content ? returnDate(content) : null}</h3>
      </div>
      <div className="containerflex">
      {content ?       <img src={`https://image.tmdb.org/t/p/original${content.poster_path}`} className="modal-img"/> : null}
      <div style={{display: "flex", flexDirection: "column", marginLeft: "10px"}}>
        <div style={{display: "flex"}}>
          <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{fontSize: "24px"}} className="genres-title">Geres:</div>
          </div>
          <div style={{display: "flex", flexWrap: "wrap"}}>
            {content ? content.genre_ids.map((id) =>  (<div className="genres-li" key={id+content.title}>{genreCypher[id]}</div>)) : null}
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

  return (
    <div className="featured-movie">

      {renderShow()}
    </div>
  );

  function renderShow() {
    if (!featuredMedia) return <p className="black-text">'Loading media...'</p>;
    return (
      <Carousel interval={timer}>
        {featuredMedia.map(content => {

          return (
            <div onClick={() => handleClick(content)} className="main-carousel" key={content.id+content.title}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    height: "29vw",
                    width: "52vw",
                    backgroundImage: `url('https://image.tmdb.org/t/p/original${_.get(
                      content,
                      "backdrop_path",
                      ""
                    )}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                  }}
                ></div>
              </div>
              <h5 style={{ textAlign: "center", fontSize: "2.64rem", maxWidth: "50vw", color: "white"}}>{content.title}</h5>
              <Modal
                open={movieModal}
                onClose={() => handleModalClose()}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {movieModalBody(content)}
              </Modal>
            </div>
          );
        })}
      </Carousel>

    );
  }
};

export default FeaturedMovie;
