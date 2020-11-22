import React, { Component, createContext } from 'react'

export const PrimaryContext = createContext()

class PrimaryContextProvider extends Component {
  state = {
    hellocontext: "Hello Context",
    contextArray: [1,2,3,4,5]
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
