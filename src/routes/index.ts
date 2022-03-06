import Loading from '../pages/Loading'
import { RouteItem } from './interface'
import Loadable from 'react-loadable'
// import Dashboard from '../common/Dashboard/Dashboard'

const Home = Loadable({
  loader: () => import('../pages/Home'),
  loading: Loading
})

const Dashboard = Loadable({
  loader: () => import('../pages/Dashboard'),
  loading: Loading
})

const LogIn = Loadable({
  loader: () => import('../pages/Login'),
  loading: Loading
})

const PasswordReset = Loadable({
  loader: () => import('../pages/PasswordReset'),
  loading: Loading
})

const routes: Array<RouteItem> = [
  { path: '/', exact: true, component: Home, protected: true, level: 1 },
  { path: '/login', exact: true, component: LogIn, protected: false, level: 1 },
  { path: '/dashboard', exact: true, component: Dashboard, protected: true, level: 2 },
  { path: '/loading', exact: true, component: Loading, protected: true, level: 1 },
  { path: '/passwordreset', exact: true, component: PasswordReset, protected: false, level: 1 }
]

export default routes
