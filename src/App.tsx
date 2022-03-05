import React, { FC } from 'react'
import routes from './routes'
import authStatus from './routes/AuthStatus/AuthStatus'
import { authStatusContext } from './routes/AuthStatus/AuthStatusProvider'
import ProtectedRoute from './routes/ProtectedRoute'
import { HashRouter, Routes, Route } from 'react-router-dom'

const App: FC = () => {
  return (
    <HashRouter>
      <authStatusContext.Provider value={authStatus}>
        <Routes>
          {
            routes.map((route, i) => (
              route.protected
                ? <Route key={i} path={route.path} element={<ProtectedRoute />}>
                  <Route path={route.path} element={<route.component routes={route.routes} />} />
                </Route>
                : <Route key={i} path={route.path} element={<route.component routes={route.routes} />} />
              // <RouteWithSubRoutes key={i} {...route}/>
            ))
          }
        </Routes>
      </authStatusContext.Provider>
    </HashRouter>
  )
}

export default App
