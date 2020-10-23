import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Settings from './components/auth/settings'
import LoggedInRoute from './logged.in.route'
import LoggedOutRoute from './logged.out.route'
import NavBar from './components/layout/Appbar'

function App() {
  return (

  <BrowserRouter>
    <div className="App">
      <NavBar />
      <Route exact path="/" component={Dashboard} />
      <LoggedOutRoute  path="/signup" component={SignUp} />
      <LoggedOutRoute path='/login' component={SignIn} />
      <LoggedInRoute path='/settings' component={Settings} />
    </div>
  </BrowserRouter>
  );
}

export default App;
