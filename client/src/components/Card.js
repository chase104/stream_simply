import React, {useState, useEffect} from 'react'
import {Modal} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import { Paper } from "@material-ui/core";
import {FavoriteBorder, Favorite, BookmarkBorder, Bookmark} from '@material-ui/icons/';

const Card = ({valid, number, content, genreFunction, search, user, isOne, favoritedMovie, watchList}) => {
  let cardClassname
  let imgUrl
  if (favoritedMovie || watchList){
    console.log("card content:", content);
    console.log("watchlist:", watchList);
    console.log("favortied: ", favoritedMovie);
  }



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
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [logInModal, setLogInModal] = useState(false)
  useEffect(() => {
    console.log(user);
    if (user && content) {
      console.log("we have user", user)
      console.log(content.title);
      if (user.favorites.includes(content.id)) {
        setIsFavorite(true)
      }
      if (user.watchlist.includes(content.id)){
        setIsBookmarked(true)
      }
    } else if (content) {
      console.log("we have no user", user);
      console.log(content.title);
    }
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


  const getGenres = (genreIds) => {
    console.log(genreIds);
    for(var i=0; i<2; i++) {

      return <li className="genres-li">{genreCypher[genreIds[i]]}</li>
    }
  }


  const favoriteClassName = `favorite-container`

  const handleFavoriteClick = async (boolean) => {
    console.log("favorite clicked");
    console.log(user);
    if (user) {
      let typeOf
      if (boolean === true) {
        console.log("false remove");

        setIsFavorite(false)
        typeOf = "REMOVE"
      } else {
        console.log("true add");

        setIsFavorite(true)
        typeOf = "ADD"
      }
      console.log(content.id);
      await axios({
        method: 'PUT',
        data: {
          favorited: true,
          movieId: content.id,
          typeOf: typeOf
        },
        withCredentials: true,
        url: '/setfavorite'
      }).then((res) => {
        console.log(res);

      })
    } else {
      console.log("Please log in");
      setLogInModal(true)
    }


  }

  const handleBookmarkClick = async (boolean) => {
    console.log("bookmark clicked");
    console.log(user);
    if (user) {
      let typeOf
      if (boolean === true) {
        console.log("It's true, turn to false bookmark");
        setIsBookmarked(false)
        typeOf = "REMOVE"
      } else {
        console.log("It's false, change to true bookmark");
        setIsBookmarked(true)
        typeOf = "ADD"
      }
      console.log(content.id);
      await axios({
        method: 'PUT',
        data: {
          favorited: true,
          movieId: content.id,
          typeOf: typeOf
        },
        withCredentials: true,
        url: '/setbookmark'
      }).then((res) => {
        console.log(res);

      })
    } else {
      console.log("Please log in");
      setLogInModal(true)
    }


  }

    const movieModalBody = () => (
    <div className="modal-style" style={{marginTop: "8%", color: "white"}}>
      <div className="title-holder">
        <div style={{maxWidth: "75%"}}>
          <div className="simple-modal-title" >{content ? content.original_title : null}</div>

        </div>
        <div className="favorite-container">
        {isFavorite || favoritedMovie ? <Favorite className="favorite" onClick={() => handleFavoriteClick(true)}/> : <FavoriteBorder className="favorite-option" onClick={() => handleFavoriteClick(false)}/>}
        </div>
        <div className="favorite-container">
        {isBookmarked || watchList ? <Bookmark className="favorite-bookmark" onClick={() => handleBookmarkClick(true)}/> : <BookmarkBorder className="favorite-option" onClick={() => handleBookmarkClick(false)}/>}
        </div>
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
            { content ?
              content.genre_ids ?
              content.genre_ids.map((id) =>  (<div className="genres-li" key={id+content.title}>{genreCypher[id]}</div>))
              :
              content.genres.map((id) =>  (<div className="genres-li" key={id+content.title}>{id.name}</div>))
              :
              null
            }
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
            <a href={item.url} style={{marginLeft:"15px"}} target="_blank" className="serviceImg">
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

  const logInModalBody = () => (
    <div>
      Please log in to add movie to favorites or watch list
    </div>
  )
  const handleClick = () => {
    console.log("card clicked");
    if (movieModal == false){
      setMovieModal(true)
    }
    // async function getApi() {
    //   console.log("running api");
    //   const axiosRes = await axios.post("/getMovieAvailability", {
    //     movieId: content.id
    //   }).then(response => {
    //     console.log(response.data.response.collection.locations)
    //     setAvailabilityData(response.data.response.collection.locations)
    //   });
    // }
    // getApi()
  }

const modal = () => (
  <Modal
    open={movieModal}
    onClose={(e) => {
    console.log(e);
    }}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    {console.log("movie modal")}
    {movieModalBody()}
  </Modal>
)
const LogInModal = () => (
  <Modal
    open={logInModal}
    onClose={(e) => {
    console.log(e);
    setLogInModal(false)
    }}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    {console.log("please log in modal")}
    {logInModalBody()}
  </Modal>
)

  return (
    <div className={cardClassname} onClick={() => {handleClick()}} >
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
