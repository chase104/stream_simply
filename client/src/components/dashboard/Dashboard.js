import React from 'react'
import SignedOutDashboard from './SignedOutDashboard'
import SignedInDashboard from './signed-in-dashboard/SignedInDashboard'

const Dashboard = () => {
  const signedIn = true
  let dashboard
  if (signedIn === true) {
    dashboard = () => {
      return (
        <SignedInDashboard />
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
