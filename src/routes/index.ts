import Loading from '../pages/Loading'
import Loadable from 'react-loadable'

export const Home = Loadable({
  loader: () => import('../pages/Home'),
  loading: Loading
})

export const Dashboard = Loadable({
  loader: () => import('../pages/Dashboard'),
  loading: Loading
})

export const LogIn = Loadable({
  loader: () => import('../pages/Login'),
  loading: Loading
})

export const PasswordReset = Loadable({
  loader: () => import('../pages/PasswordReset'),
  loading: Loading
})

export const PermissionDenied = Loadable({
  loader: () => import('../pages/PermissionDeniedPage'),
  loading: Loading
})

export const ApplicationPage = Loadable({
  loader: () => import('../pages/ApplicationPage'),
  loading: Loading
})

export const NoMatch = Loadable({
  loader: () => import('../pages/NoMatchPage'),
  loading: Loading
})

// const routes: Array<RouteItem> = [
//   {
//     path: '/home',
//     exact: true,
//     component: Home,
//     protected: true,
//     level: 1,
//     routes: [
//       { path: '/application', exact: true, component: ApplicationPage, level: 1, protected: true }
//     ]
//   },
//   { path: '/', exact: true, component: LogIn, protected: false, level: 1 },
//   { path: '/login', exact: true, component: LogIn, protected: false, level: 1 },
//   { path: '/dashboard', exact: true, component: Dashboard, protected: true, level: 2 },
//   { path: '/loading', exact: true, component: Loading, protected: false, level: 1 },
//   { path: '/passwordreset', exact: true, component: PasswordReset, protected: false, level: 1 },
//   { path: '/permissionDenied', exact: true, component: PermissionDenied, protected: false, level: 1 }
// ]

// export default routes
