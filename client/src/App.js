import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import PrimaryContextProvider from './PrimaryContext.js'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Settings from './components/Settings'
import LoggedInRoute from './routes/LoggedInRoute'
import LoggedOutRoute from './routes/LoggedOutRoute'
import NavBar from './components/layout/Navbar'
import PrimaryDashboard from './pages/PrimaryDashboard'
import SearchDashboard from './pages/SearchDashboard.js'
import FavoriteDashboard from './pages/FavoriteDashboard'
import WatchListDashboard from './pages/WatchListDashboard'


function App() {
  return (

  <BrowserRouter>
    <div className="App">
      <PrimaryContextProvider>
        <NavBar />
        <Route exact path="/" component={PrimaryDashboard} />
        <Route path="/search" component={SearchDashboard}/>
        <LoggedOutRoute  path="/signup" component={SignUp} />
        <LoggedOutRoute path='/login' component={SignIn} />
        <LoggedInRoute path='/settings' component={Settings} />
        <LoggedInRoute path='/favorites' component={FavoriteDashboard} />
        <LoggedInRoute path='/watchlist' component={WatchListDashboard} />
      </PrimaryContextProvider >
    </div>
  </BrowserRouter>
  );
}

export default App;
