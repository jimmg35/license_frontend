import React, { FC } from 'react'
// import routes from './routes'
import authStatus from './routes/AuthStatus/AuthStatus'
import { authStatusContext } from './routes/AuthStatus/AuthStatusProvider'
import ProtectedRoute from './routes/ProtectedRoute'
import { Routes, Route, HashRouter } from 'react-router-dom'
import {
  PermissionDenied,
  PasswordReset,
  LogIn,
  Home,
  NoMatch
} from './routes'
import ApplocatopmStatus from './pages/ApplicationStatus'
import ApplicationPage from './pages/ApplicationPage'
import Dashboard from './pages/Dashboard'
import Loading from './pages/Loading'

const App: FC = () => {
  (window as any).authStatus = authStatus
  return (
    <HashRouter>
      <authStatusContext.Provider value={authStatus}>
        <Routes>

          <Route path={'/'} element={<ProtectedRoute level={1} />} >
            <Route path={'/'} element={<Home />} >
              <Route path={'/'} element={<ApplocatopmStatus />} ></Route>
              <Route path={'/application'} element={<ApplicationPage />} ></Route>
              <Route path={'/dashboard'} element={<ProtectedRoute level={2} />} >
                <Route path={'/dashboard'} element={<Dashboard />} ></Route>
              </Route>
              <Route path={'/permissionDenied'} element={<PermissionDenied />} ></Route>
            </Route>
          </Route>

          <Route path={'/login'} element={<LogIn />} ></Route>
          <Route path={'/loading'} element={<Loading />} ></Route>
          <Route path={'/passwordreset'} element={<PasswordReset />} ></Route>
          <Route path={'/permissionDenied'} element={<PermissionDenied />} ></Route>
          <Route path="*" element={<NoMatch />} />

          {/* <Route path={route.path} element={<ProtectedRoute level={route.level} />}>
            <Route path={route.path} element={<route.component routes={route.routes} />} />
          </Route> */}
          {/* {
            routes.map((route, i) => (
              route.protected
                ? <Route key={i} path={route.path} element={<ProtectedRoute level={route.level} />}>
                  <Route path={route.path} element={<route.component routes={route.routes} />} />
                </Route>
                : <Route key={i} path={route.path} element={<route.component routes={route.routes} />} >
                  {
                    route.routes ? route.routes.map((route, index) => (
                      <Route key={i}></Route>
                    )) : <></>
                  }
                </Route>
            ))
          } */}
        </Routes>
      </authStatusContext.Provider>
    </HashRouter>
  )
}

export default App
