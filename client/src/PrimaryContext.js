import React, { Component, createContext } from 'react'

export const PrimaryContext = createContext()

class PrimaryContextProvider extends Component {
  state = {
    hellocontext: "Hello Context",
    contextArray: [1,2,3,4,5],
    genreCypher: {
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
  }

  changeTheme = (edits) => {
    this.setState({...this.state,
      ...edits
    })
  }

  render() {
    return (
      <PrimaryContext.Provider value={{...this.state, changeTheme: this.changeTheme}}>
        {this.props.children}
      </PrimaryContext.Provider>
    )
  }
}

export default PrimaryContextProvider
