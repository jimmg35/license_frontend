import React from 'react'
import './Home.scss'
import MenuBar from '../common/Home/MenuBar'
// import RouteWithSubRoutes from '../routes/RouteWithSubRoutes'
import { Outlet } from 'react-router-dom'

// props: RouteComponentProps<any> & RouteItem
const Home = () => {
  return (
    <div className='iadc-home'>
      <MenuBar></MenuBar>

      <div className='page-body'>
        <Outlet />
      </div>

    </div>
  )
}

export default Home
