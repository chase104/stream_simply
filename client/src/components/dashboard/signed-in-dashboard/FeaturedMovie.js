import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";

const FeaturedMovie = () => {
  let [featuredMedia, setFeaturedMedia] = useState(false);

  useEffect(() => {
    async function getApi() {
      const axiosRes = await axios.get("/getFeaturedMovie").then(response => {
        console.log({ response });
        return response.data.results;
      });
      setFeaturedMedia(axiosRes);
    }

    getApi();
  }, []);

  return (
    <div className="featured-movie">
      <p
        className="black-text center featured-title"
        style={{ fontSize: "3rem" }}
      >
        Featured Shows
      </p>
      {renderShow()}
    </div>
  );

  function renderShow() {
    if (!featuredMedia) return <p className="black-text">'Loading media...'</p>;
    return (
      <Carousel interval="3000">
        {featuredMedia.map(show => {
          return (
            <React.Fragment>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    height: 500,
                    width: 800,
                    backgroundImage: `url('https://image.tmdb.org/t/p/original${_.get(
                      show,
                      "backdrop_path",
                      ""
                    )}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                  }}
                ></div>
              </div>
              <h5 style={{ textAlign: "center" }}>{_.get(show, "name", "")}</h5>
            </React.Fragment>
          );
        })}
      </Carousel>
      // <div className="featured-movie-block center">
      //   <img
      //     className="featuredImg"
      //     src={featuredMedia.picture}
      //     style={{ width: "40vh", height: "30vh" }}
      //   />
      //   <div className="title-and-joint-holder">
      //     <h6 className="white-text featured-media-title center">
      //       {featuredMedia.name}
      //     </h6>
      //     <div className="joint-holder">
      //       <div className="genres-div">
      //         <h5 className="featured-media-genres-title">Genres</h5>
      //         <ul className="white-text">
      //           <li>Comedy</li>
      //           <li>Action</li>
      //           <li>Drama</li>
      //         </ul>
      //       </div>
      //       <div className="available-on-div center">
      //         <h5 className="featured-media-genres-title">Available On</h5>
      //         <img src={featuredMedia.locations[0].icon} />
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
};

export default FeaturedMovie;
