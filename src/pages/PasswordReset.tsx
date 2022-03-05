import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockResetIcon from '@mui/icons-material/LockReset'
import Typography from '@mui/material/Typography'
// import { authStatusContext } from '../routes/AuthStatus/AuthStatusProvider'
import classNames from 'classnames'
import './Login.scss'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import api from '../api'
import util from 'tweetnacl-util'
import sha256 from 'fast-sha256'
import { useNavigate } from 'react-router-dom'

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        IADC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const isPassWordValid = (password: string) => {
  /*
    Usernames can only have:
    - Lowercase Letters (a-z)
    - Numbers (0-9)
    - Dots (.)
    - Underscores (_)
  */
  const res = /^[a-z0-9A-Z_]+$/.exec(password)
  const valid = !!res
  if (password.length < 8) {
    return false
  }
  return valid
}

const isPassWordSame = (password: string, confirmPassword: string) => {
  if (password === confirmPassword) {
    return true
  }
  return false
}

const PasswordReset = () => {
  // const authStatus = React.useContext(authStatusContext)
  const navigate = useNavigate()
  const [alertOpen, setalertOpen] = React.useState<boolean>(false)
  const [alertContent] = React.useState<string>('')
  const [resetPassword, setresetPassword] = React.useState<string>('')
  const [isPasswordValid, setisPasswordValid] = React.useState<boolean>(false)
  const [passowrdHelperText, setpassowrdHelperText] = React.useState<string>('')
  const [confirmPassword, setconfirmPassword] = React.useState<string>('')
  const [confirmHelperText, setconfirmHelperText] = React.useState<string>('')

  const handleRegisterPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setresetPassword(event.target.value)
  }

  const handleValidatePassword = () => {
    const isPasswordValid = isPassWordValid(resetPassword)
    setisPasswordValid(isPasswordValid)
    if (isPasswordValid || resetPassword.length === 0) {
      setpassowrdHelperText('')
    } else {
      setpassowrdHelperText('需大於8個字元')
    }
  }

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setconfirmPassword(event.target.value)
  }

  const handleCheckPassword = () => {
    if (isPassWordSame(resetPassword, confirmPassword)) {
      setconfirmHelperText('')
    } else {
      setconfirmHelperText('密碼不一致')
    }
  }

  const handlePasswordReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    if (data.get('email') !== null && data.get('temp-password') !== null && data.get('password') !== null) {
      const response = await api.user.resetPassword(
        data.get('email') as string,
        util.encodeBase64(sha256(data.get('temp-password') as any)),
        util.encodeBase64(sha256(data.get('password') as any))
      )

      if (response.status === 200) {
        navigate('/', { replace: true })
      }
    }
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }} className='reset-password-page'>
      <CssBaseline />

      <Grid item xs={false} sm={4} md={7}
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1607432750402-48f85c94f63a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

        {/* 重設密碼頁面 */}
        <Box
          sx={{
            my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}
          className={
            classNames({ 'reset-password': true })
          }
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockResetIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Enter new password
          </Typography>

          <Box component="form" noValidate onSubmit={handlePasswordReset} sx={{ mt: 1 }}>

            <TextField
              margin="normal" required fullWidth id="email" label="Email Address"
              name="email" autoComplete="email" autoFocus
            />

            <TextField
              margin="normal" required fullWidth name="temp-password" label="Temp password"
              type="password" id="temp-password" autoComplete="temp-password"
            />

            <TextField
              margin="normal" required fullWidth name="password" label="New Password"
              type="password" id="password" autoComplete="current-password" value={resetPassword}
              onChange={handleRegisterPasswordChange} onBlur={handleValidatePassword}
              error={!isPasswordValid && resetPassword.length !== 0}
              helperText={passowrdHelperText}
            />

            <TextField
              margin="normal" required fullWidth name="confirm-password" label="Confirm password"
              type="password" id="confirm-password" autoComplete="current-password" value={confirmPassword}
              onChange={handleConfirmPasswordChange} onBlur={handleCheckPassword}
              error={!isPassWordSame(resetPassword, confirmPassword) && confirmPassword.length !== 0}
              helperText={confirmHelperText}
            />

            <Button
              type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </Button>

            {/* <TextField
                margin="normal" required fullWidth id="email" label="Email Address"
                name="email" autoComplete="email" autoFocus onChange={handleCheckEmailExist}
                error={!isLoginEmailExist} helperText={loginEmailHelperText}
            />
            <TextField
                margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"
            />
            <Button
                type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>

            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                        {'Forgot password?'}
                    </Link>
                </Grid>
                <Grid item>
                    <p onClick={handleSignUpOpen}>
                        {"Don't have an account? Sign Up"}
                    </p>
                </Grid>
            </Grid> */}

            <Copyright sx={{ mt: 5 }} />

          </Box>
        </Box>
      </Grid>

      {/* 警告popup */}
      <Dialog
        open={alertOpen}
        onClose={() => { setalertOpen(prev => !prev) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'錯誤'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => { setalertOpen(false) }}>
            知道了
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default PasswordReset
