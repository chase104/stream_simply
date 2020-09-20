import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Settings from './components/auth/settings'

function App() {
  return (

  <BrowserRouter>
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Dashboard} />
      <Route  path="/signup" component={SignUp} />
      <Route path='/signin' component={SignIn} />
      <Route path='/settings' component={Settings} />
    </div>
  </BrowserRouter>
  );
}

export default App;
