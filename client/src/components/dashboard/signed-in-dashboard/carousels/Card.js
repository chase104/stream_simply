import React from 'react'

const Card = ({valid, number, content}) => {
  console.log(content);
  let cardClassname
  let imgUrl
  if (valid) {
     cardClassname = "card";

  } else {
    cardClassname = "card loading-card"
  }

  return (
    <div className={cardClassname}>
      {content ?
        <div className="card-valid" style={{width: "100%", backgroundImage: `url(https://image.tmdb.org/t/p/original${content.poster_path})`}}>
        </div>
       :
        <div>{number}</div>
      }

    </div>
  )
}

export default Card
