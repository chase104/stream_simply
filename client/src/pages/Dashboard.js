import React from 'react'
import SignedOutDashboard from './SignedOutDashboard'
import SignedInDashboard from './signed-in-dashboard/SignedInDashboard'

const Dashboard = (props) => {
  const signedIn = true
  let dashboard
  if (signedIn === true) {
    dashboard = () => {
      return (
        <SignedInDashboard props={props}/>
      )
    }
  } else {
    dashboard = () => {
      return(
        <SignedOutDashboard />
      )
    }
  }

  return(
    <div>
      {dashboard()}
    </div>
  )
}

export default Dashboard
