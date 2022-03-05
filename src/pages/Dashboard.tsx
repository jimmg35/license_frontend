import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
// import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import ListItem from '@mui/material/ListItem'
// import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CssBaseline from '@mui/material/CssBaseline'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
// import NotificationsIcon from '@mui/icons-material/Notifications'
import UserProfile from '../common/Dashboard/subPages/UserProfile'
import MainBoard from '../common/Dashboard/subPages/MainBoard'
import SecondBoard from '../common/Dashboard/subPages/SecondBoard'
import './Dashboard.scss'
import { useNavigate } from 'react-router-dom'
import { authStatusContext } from '../routes/AuthStatus/AuthStatusProvider'

// const Copyright = (props: any) => {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   )
// }

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9)
        }
      })
    }
  })
)

const DashboardContent = () => {
  const navigate = useNavigate()
  const authStatus = React.useContext(authStatusContext)
  const [open, setOpen] = React.useState(false)
  const [profileOpen, setprofileOpen] = React.useState(false)
  const [mainDashOpen, setmainDashOpen] = React.useState(true)
  const [secondDashOpen, setsecondDashOpen] = React.useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleUserProfileClick = () => {
    setprofileOpen(true)
    setmainDashOpen(false)
    setsecondDashOpen(false)
  }

  const handleMainDashClick = () => {
    setprofileOpen(false)
    setmainDashOpen(true)
    setsecondDashOpen(false)
  }

  const handleSecondDashClick = () => {
    setprofileOpen(false)
    setmainDashOpen(false)
    setsecondDashOpen(true)
  }

  const handleBack2PrePage = () => {
    navigate('/')
  }

  const handleLogOut = () => {
    authStatus.isAuthenticated = false
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    // <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: 'flex' }} className='dashboard'>
      <CssBaseline />

      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{ pr: '24px' }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            感測器資料中心
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <IconButton onClick={handleBack2PrePage}>
            <ArrowBackIcon style={{ fill: 'white' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1]
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon style={{ fill: 'white' }} />
          </IconButton>
        </Toolbar>

        <Divider className='divider-dark' />

        {/* 使用者Icon */}
        <List>
          <div>
            <ListItem button onClick={() => { handleUserProfileClick() }}>
              <ListItemIcon>
                <Avatar
                  src={authStatus.userInfo?.username}
                  alt={authStatus.userInfo?.username}
                  sx={{ width: 26, height: 26 }}
                />
              </ListItemIcon>
              <ListItemText primary={`Hi！ ${authStatus.userInfo?.username}`} />
            </ListItem>
          </div>
        </List>

        <Divider className='divider-dark' />

        {/* 分頁選項 */}
        <List>
          <div>
            <ListItem button onClick={() => { handleMainDashClick() }}>
              <ListItemIcon>
                <DashboardIcon style={{ fill: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => { handleSecondDashClick() }}>
              <ListItemIcon>
                <AccountTreeIcon style={{ fill: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Data" />
            </ListItem>
          </div>
        </List>

        <Divider className='divider-dark' />

        {/* 其他選項 */}
        <List>
          <div>
            <ListItem button onClick={handleLogOut}>
              <ListItemIcon>
                <ExitToAppIcon style={{ fill: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          </div>
        </List>

      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'hidden'
        }}
        className='aaaa'
      >
        <Toolbar />
        {/* <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}> */}
        {/* <div className='content-page'> */}

        {/* <HashRouter>
            <Routes>
              {
                dashboardRoutes.map((route, i) => (
                  <Route key={i} path={route.path} element={<route.component routes={route.routes} />} />
                ))
              }
            </Routes>
          </HashRouter> */}

        <UserProfile open={profileOpen}
        ></UserProfile>

        <MainBoard open={mainDashOpen}
        ></MainBoard>

        <SecondBoard open={secondDashOpen}
        ></SecondBoard>
        {/* </div> */}
        {/* </Container> */}
      </Box>
    </Box>
    // </ThemeProvider>
  )
}

const Dashboard = () => {
  return <DashboardContent />
}

export default Dashboard
