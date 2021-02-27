import React, {useState, useEffect, useContext} from 'react'
import {Modal} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import { PrimaryContext } from '../PrimaryContext'
import { Paper } from "@material-ui/core";
import {FavoriteBorder, Favorite, BookmarkBorder, Bookmark} from '@material-ui/icons/';

const Card = ({valid, content, genreFunction, search, user, isOne, favoritedMovie, watchList, selectedGenres}) => {

  const context = useContext(PrimaryContext)
  const genreCypher = context.genreCypher
  let cardClassname
  let imgUrl
  if (favoritedMovie || watchList){

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

    if (user && content) {
      console.log("we have user", user)
        if (user.favorites) {
          if (user.favorites.includes(content.id)) {
            setIsFavorite(true)
          }
        }
        if (user.watchlist) {
          if (user.watchlist.includes(content.id)){
            setIsBookmarked(true)
          }
        }
    } else if (content) {
      console.log("we have no user", user);
    }
  }, [])




  const getGenres = (genreIds) => {
    for(var i=0; i<2; i++) {

      return <li className="genres-li">{genreCypher[genreIds[i]]}</li>
    }
  }


  const favoriteClassName = `favorite-container`

  const handleFavoriteClick = async (boolean) => {
    if (user) {
      let typeOf
      if (boolean === true) {

        setIsFavorite(false)
        typeOf = "REMOVE"
      } else {

        setIsFavorite(true)
        typeOf = "ADD"
      }
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

      })
    } else {
      alert("Please log in to use this feature")
      setLogInModal(true)
    }


  }

  const handleBookmarkClick = async (boolean) => {

    if (user) {
      let typeOf
      if (boolean === true) {
        setIsBookmarked(false)
        typeOf = "REMOVE"
      } else {
        setIsBookmarked(true)
        typeOf = "ADD"
      }
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

      })
    } else {
      alert("Please log in to use this feature")

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
        {isFavorite  ? <Favorite className="favorite" onClick={() => handleFavoriteClick(true)}/> : <FavoriteBorder className="favorite-option" onClick={() => handleFavoriteClick(false)}/>}
        </div>
        <div className="favorite-container">
        {isBookmarked ? <Bookmark className="favorite-bookmark" onClick={() => handleBookmarkClick(true)}/> : <BookmarkBorder className="favorite-option" onClick={() => handleBookmarkClick(false)}/>}
        </div>
        <h3 className="simple-modal-title" style={{marginLeft: 'auto'}}>{content ? returnDate() : null}</h3>
      </div>
      <div className="containerflex">
      {content ?       <img src={`https://image.tmdb.org/t/p/original${content.poster_path}`} className="modal-img"/> : null}
      <div style={{display: "flex", flexDirection: "column", marginLeft: "10px"}}>
        <div style={{display: "flex", paddingBottom: "5px"}}>
          <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{fontSize: "24px"}} className="genres-title">Geres:</div>
          </div>
          <div style={{display: "flex", flexWrap: "wrap"}}>
            { content ?
              content.genre_ids ?
              content.genre_ids.map((id) =>  {
                const idCheck = id.toString()
                if (selectedGenres != null && selectedGenres != undefined) {
                  if (selectedGenres.includes(idCheck)) {
                    return (<div className="genres-li highlight-genres" key={id+content.title+1}>{genreCypher[id]}</div>)
                  } else {
                    return (<div className="genres-li" key={id+content.title+1}>{genreCypher[id]}</div>)
                  }
                } else {
                  return (<div className="genres-li" key={id+content.title+1}>{genreCypher[id]}</div>)

                }
              })
              :
              content.genres.map((id) => (<div className="genres-li" key={id+content.title}>{id.name}</div>))
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
            availabilityData.map((item) => {
              let classnames = null
              console.log(user);
              if (user == undefined || user == false) {
                classnames = "serviceImg"
              } else {
                if (user.services != undefined && user.services != null) {
                  if (user.services.includes(item.display_name)){
                    classnames = "serviceImg highlight-genres"
                  } else {
                    classnames = "serviceImg"
                  }
                }
              }
              console.log(classnames);
              return (
                <a href={item.url} style={{marginLeft:"15px"}} target="_blank" className={classnames}>
                  <img src={item.icon} />
                </a>
              )
            }
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
    if (movieModal == false){
      setMovieModal(true)
    }
    async function getApi() {
      const axiosRes = await axios.post("/getMovieAvailability", {
        movieId: content.id
      }).then(response => {
        setAvailabilityData(response.data.response.collection.locations)
      });
    }
    getApi()
  }

const modal = () => (
  <Modal
    open={movieModal}
    onClose={(e) => {
    }}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    {movieModalBody()}
  </Modal>
)
const LogInModal = () => (
  <Modal
    open={logInModal}
    onClose={(e) => {
    setLogInModal(false)
    }}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    {logInModalBody()}
  </Modal>
)

  return (
    <div className={cardClassname} onClick={() => {handleClick()}} >
      {content ?
        <div className="card-valid" style={{width: "100%", backgroundImage: `url(https://image.tmdb.org/t/p/original${content.poster_path})`}}>
        </div>

       :
        <div></div>
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
