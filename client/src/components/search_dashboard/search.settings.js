import React, { useState, useContext } from 'react'
import { FormControl, Input, InputLabel, Slider, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { PrimaryContext } from '../../PrimaryContext'
import axios from 'axios'

const SearchSettings = ({searchData, passResults}) => {


  const [search, setSearch] = useState(searchData)
  const [years, setYears] = useState([1990, 2020])
  const [scoreImdb, setScoreImdb] = useState([0, 10])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [includePrevious, setIncludePrevious] = useState(false)
  const [genresCheckbox, setGenreCheckbox] = useState(false)

  const context = useContext(PrimaryContext)

console.log("inclue: ",includePrevious);
console.log("genres: ",genresCheckbox);

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

  const getYears = (years) => {
    return `${years}`
  }

  const handleCheckbox = (e) => {
    e.preventDefault()
    setIncludePrevious(!includePrevious)
  }
  const handleGenreCheckbox = (e) => {
    e.preventDefault();
    setGenreCheckbox(!genresCheckbox)
  }




  const checkboxstuff = (e) => {

    const checkbox = document.getElementById("include-previous-checkbox");
    console.log(checkbox);
    if (checkbox.checked) {
      setIncludePrevious(true)
    } else {
      setIncludePrevious(false)
    }
  }

  const submitSearch = async (e) => {
    e.preventDefault()

    await axios({
      method: 'POST',
      data: {
        genres: selectedGenres,
        imdb: scoreImdb,
        years: years,
        include_previous: includePrevious,
        include_genres: genresCheckbox,
        previous_search: searchData,
      },
      withCredentials: true,
      url: '/getTmbd/makeCategorySearch'
    }).then((res) => {
      console.log(res);
      passResults(res.data.results)

    })
  }

  const handleSliderChange = (event, newValue) => {
    setYears(newValue)
  }
  const handleImdbChange = (event, newValue) => {
    setScoreImdb(newValue)
    console.log(scoreImdb);
  }

  const handleGenreClick = (e, key) => {
    console.log(e.target);
    if (selectedGenres.includes(key)) {
      let index = selectedGenres.indexOf(key)
        selectedGenres.splice(index, 1);
        console.log(selectedGenres);
        e.target.classList.remove("genre-border")

    } else  {
      selectedGenres.push(key)
      console.log(selectedGenres);
      e.target.classList.add("genre-border")


    }
  }





  return (
    <div className="form-containerr">
      <FormControl    >
        <div className="form-all-container">
          <div className="form-left-container">

            <div style={{width: "200px"}}>
              <Typography id="range-slider" gutterBottom>
                Year range
              </Typography>
              <Slider
                value={years}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={getYears}
                min={1970}
                max={2020}
                step={5}
                />
                <Typography id="Imdb-slider" gutterBottom>
                  IMDB Score
                </Typography>
                <Slider
                  value={scoreImdb}
                  onChange={handleImdbChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="Imdb-slider"
                  getAriaValueText={getYears}
                  min={0}
                  max={10}
                  step={0.1}
                  />
            </div>
          </div>
          <div className="form-right-container">
            <div style={{fontSize: "24px"}}>Genres</div>
            <div className="genre-button-holder">
              {Object.keys(genreCypher).map((function(key,index){
                return <div className="genre-button" onClick={(e) => handleGenreClick(e, key)}>{genreCypher[key]}</div>
              }))}
              <div className="submit-button-holder">



              </div>

            </div>

          </div>
        </div>

      </FormControl>
      <FormControl style={{width: "100%", display: "flex", flexDirection: "row-reverse"}}>
          <Button className="search-submit-button" onClick={submitSearch}>Submit</Button>

          <FormControlLabel
          style={{color: 	"#ffdb84", marginRight: "15px"}}
          value="start"

          control={<Checkbox  id="include-previous-checkbox"  checked={includePrevious} onClick={(e) => handleCheckbox(e)}/>}
          label="Include Previous Search Term"
          labelPlacement="start"
          />
          <FormControlLabel
          style={{color: 	"#ffdb84", marginRight: "15px"}}
          value="start"

          control={<Checkbox  id="all-genres-checkbox"  checked={genresCheckbox} onClick={(e) => handleGenreCheckbox(e)}/>}
          label="Find movie with ALL selected genres"
          labelPlacement="start"
          />
      </FormControl>
    </div>
  )
}

export default SearchSettings
