import Loading from '../pages/Loading'
import { RouteItem } from './interface'
import Loadable from 'react-loadable'
// import Dashboard from '../common/Dashboard/Dashboard'

// const Home = Loadable({
//   loader: () => import('../pages/MapPage'),
//   loading: Loading
// })

// const Dashboard = Loadable({
//   loader: () => import('../pages/Dashboard'),
//   loading: Loading
// })

const LogIn = Loadable({
  loader: () => import('../pages/Login'),
  loading: Loading
})

const PasswordReset = Loadable({
  loader: () => import('../pages/PasswordReset'),
  loading: Loading
})

const routes: Array<RouteItem> = [
  // { path: '/', exact: true, component: Home, protected: true },
  { path: '/login', exact: true, component: LogIn, protected: false },
  // { path: '/dashboard', exact: true, component: Dashboard, protected: true },
  { path: '/loading', exact: true, component: Loading, protected: true },
  { path: '/passwordreset', exact: true, component: PasswordReset, protected: false }
]

export default routes
