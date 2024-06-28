import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'
export const Dashboard = () => {
  return (
    <div>
      <div>
        <NavBar/>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}
