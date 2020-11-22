import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Settings from './components/auth/settings'
import SearchDashboard from './components/search_dashboard/search.dashboard.js'
import LoggedInRoute from './logged.in.route'
import LoggedOutRoute from './logged.out.route'
import NavBar from './components/layout/Appbar'
import PrimaryContextProvider from './PrimaryContext.js'
function App() {
  return (

  <BrowserRouter>
    <div className="App">
      <PrimaryContextProvider>
        <NavBar />
        <Route exact path="/" component={Dashboard} />
        <Route path="/search" component={SearchDashboard}/>
        <LoggedOutRoute  path="/signup" component={SignUp} />
        <LoggedOutRoute path='/login' component={SignIn} />
        <LoggedInRoute path='/settings' component={Settings} />
      </PrimaryContextProvider >
    </div>
  </BrowserRouter>
  );
}

export default App;
