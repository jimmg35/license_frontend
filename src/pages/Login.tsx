import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined'
import Typography from '@mui/material/Typography'
import api from '../api'
import { User, RegisterUser } from '../api/DTO/User'
import { useNavigate } from 'react-router-dom'
import { authStatusContext } from '../routes/AuthStatus/AuthStatusProvider'
import classNames from 'classnames'
import './Login.scss'
import * as EmailValidator from 'email-validator'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import util from 'tweetnacl-util'
import sha256 from 'fast-sha256'
// React.useContext()

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

const isUserNameValid = (username: string) => {
  /*
    Usernames can only have:
    - Lowercase Letters (a-z)
    - Numbers (0-9)
    - Dots (.)
    - Underscores (_)
  */
  const res = /^[a-z0-9_]+$/.exec(username)
  const valid = !!res
  if (username.length < 6) {
    return false
  }
  if (/^\d/.test(username)) {
    return false
  }
  return valid
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

const SignInSide = () => {
  const authStatus = React.useContext(authStatusContext)
  const navigate = useNavigate()
  const [signInOpen, setsignInOpen] = React.useState<boolean>(true)
  const [signUpOpen, setsignUpOpen] = React.useState<boolean>(false)
  const [verifyOpen, setverifyOpen] = React.useState<boolean>(false)
  const [resetOpen, setresetOpen] = React.useState<boolean>(false)
  const [sentOpen, setsentOpen] = React.useState<boolean>(false)
  const [resetEmail, setresetEmail] = React.useState<string>('')

  const [registerEmail, setregisterEmail] = React.useState<string>('')
  const [isEmailValid, setisEmailValid] = React.useState<boolean>(false)
  const [emailHelperText, setemailHelperText] = React.useState<string>('')
  const [isEmailUsed, setisEmailUsed] = React.useState<boolean>(false)

  const [registerUsername, setregisterUsername] = React.useState<string>('')
  const [isUsernameValid, setisUsernameValid] = React.useState<boolean>(false)
  const [usernameHelperText, setusernameHelperText] = React.useState<string>('')
  const [isUserNameExists, setisUserNameExists] = React.useState<boolean>(false)

  const [registerPassword, setregisterPassword] = React.useState<string>('')
  const [isPasswordValid, setisPasswordValid] = React.useState<boolean>(false)
  const [passowrdHelperText, setpassowrdHelperText] = React.useState<string>('')

  const [confirmPassword, setconfirmPassword] = React.useState<string>('')
  const [confirmHelperText, setconfirmHelperText] = React.useState<string>('')

  const [phoneNumber, setphoneNumber] = React.useState<string>('')

  const [alertOpen, setalertOpen] = React.useState<boolean>(false)
  const [alertContent, setalertContent] = React.useState<string>('')

  // const [loginEmail, setloginEmail] = React.useState<string>('')
  const [isLoginEmailExist, setisLoginEmailExist] = React.useState<boolean>(false)
  const [loginEmailHelperText, setloginEmailHelperText] = React.useState<string>('')

  const [loginFailShow, setloginFailShow] = React.useState<boolean>(false)
  React.useEffect(() => {
    localStorage.removeItem('token')
  }, [])

  React.useEffect(() => {
    if (registerEmail.length === 0) {
      setemailHelperText('')
    }
  }, [registerEmail])

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (data.get('password') !== null && data.get('email') !== null) {
      const response = await api.auth.authenticateUser(
        new User({
          email: data.get('email') as string,
          password: util.encodeBase64(sha256(data.get('password') as any))
        })
      )
      if (response.status === 200) {
        setloginFailShow(false)
        const content = await response.json()
        localStorage.setItem('token', content.token)
        await authStatus.authenticateToken(content.token)
        navigate('/', { replace: true })
      }
      setloginFailShow(true)
    }
  }

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isFormValid = isEmailValid && isUsernameValid && isPasswordValid && isPassWordSame(registerPassword, confirmPassword) && phoneNumber.length !== 0
    if (!isFormValid) {
      setalertOpen(true)
      setalertContent('請確認表格內容正確性')
      return
    }

    const data = new FormData(event.currentTarget)
    const response = await api.user.registerUser(
      new RegisterUser({
        email: data.get('email') as string,
        username: data.get('username') as string,
        password: util.encodeBase64(sha256(data.get('password') as any)),
        phoneNumber: data.get('phonenumber') as string
      })
    ) //
    if (response.status === 200) {
      const response = await api.user.sendVerifyEmail(data.get('username') as string)
      if (response.status === 200) {
        setverifyOpen(true)
        setsignUpOpen(false)
      } else {
        setalertContent('驗證信寄送失敗，請聯繫server team')
        setalertOpen(true)
      }
    } else {
      setalertContent('註冊失敗，請聯繫server team')
      setalertOpen(true)
    }
  }

  // const handleContinueSignIn = async () => {
  //   setverifyOpen(false)
  //   setsignInOpen(true)
  // }

  const handleSignUpOpen = () => {
    setsignInOpen(prev => !prev)
    setsignUpOpen(prev => !prev)
  }

  const handleResetOpen = () => {
    setresetOpen(true)
    setsignInOpen(false)
  }

  const handleSendResetMail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (data.get('email') !== null) {
      console.log(data.get('email'))
      const response = await api.user.sendPasswordResetEmail(data.get('email') as string)
      console.log(response)
    }
    setsentOpen(true)
    setresetOpen(false)
    setresetEmail(data.get('email') as string)
  }

  const handleRegisterEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setregisterEmail(event.target.value)
  }

  const handleValidateEmail = async () => {
    const isEmailValid = EmailValidator.validate(registerEmail)
    setisEmailValid(isEmailValid)
    const response = await api.user.isEmailUsed(registerEmail)
    if ((isEmailValid && response.status === 404) || registerEmail.length === 0) {
      setisEmailUsed(false)
      setemailHelperText('')
    } else if (response.status === 200) {
      setisEmailUsed(true)
      setemailHelperText('email已被使用過')
    } else {
      setisEmailUsed(true)
      setemailHelperText('email格式不正確')
    }
  }

  const handleRegisterUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setregisterUsername(event.target.value)
  }

  const handleValidateUsername = async () => {
    const isUsernameValid = isUserNameValid(registerUsername)
    setisUsernameValid(isUsernameValid)
    const response = await api.user.isUserExist(registerUsername)
    if ((isUsernameValid && response.status === 404) || registerUsername.length === 0) {
      setisUserNameExists(false)
      setusernameHelperText('')
    } else if (response.status === 200) {
      setisUserNameExists(true)
      setusernameHelperText('帳號已存在')
    } else {
      setisUserNameExists(true)
      setusernameHelperText('需大於5個字元，不可數字開頭')
    }
  }

  const handleRegisterPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setregisterPassword(event.target.value)
  }

  const handleValidatePassword = () => {
    const isPasswordValid = isPassWordValid(registerPassword)
    setisPasswordValid(isPasswordValid)
    if (isPasswordValid || registerPassword.length === 0) {
      setpassowrdHelperText('')
    } else {
      setpassowrdHelperText('需大於8個字元')
    }
  }

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setconfirmPassword(event.target.value)
  }

  const handleCheckPassword = () => {
    if (isPassWordSame(registerPassword, confirmPassword)) {
      setconfirmHelperText('')
    } else {
      setconfirmHelperText('密碼不一致')
    }
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setphoneNumber(event.target.value)
  }

  const handleCheckEmailExist = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const response = await api.user.isEmailUsed(event.target.value)
    if (response.status === 200) {
      setisLoginEmailExist(true)
      setloginEmailHelperText('')
    } else {
      setisLoginEmailExist(false)
      setloginEmailHelperText('帳號不存在')
    }
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }} className='login-page'>
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

        {/* 登入頁面 */}
        <Box
          sx={{
            my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}
          className={
            classNames({ 'sign-in': true }, { hide: !signInOpen })
          }
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" noValidate onSubmit={handleSignIn} sx={{ mt: 1 }}>
            <TextField
              margin="normal" required fullWidth id="email" label="Email Address"
              name="email" autoComplete="email" autoFocus onChange={handleCheckEmailExist}
              error={!isLoginEmailExist} helperText={loginEmailHelperText}
            />
            <TextField
              margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"
            />

            <div className={
              classNames(
                { 'login-fail-caption': true },
                { hide: !loginFailShow }
              )
            }>
              <Typography variant='subtitle2' color='red'>
                登入失敗
              </Typography>
            </div>

            <Button
              type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <p onClick={handleResetOpen}>
                  {'Forget password?'}
                </p>
              </Grid>
              <Grid item>
                <p onClick={handleSignUpOpen}>
                  {"Don't have an account? sign up here"}
                </p>
              </Grid>
            </Grid>

            <Copyright sx={{ mt: 5 }} />

          </Box>
        </Box>

        {/* 註冊頁面 */}
        <Box
          sx={{
            my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}
          className={
            classNames({ 'sign-up': true }, { hide: !signUpOpen })
          }
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <HowToRegOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 1 }}>

            <TextField
              margin="normal" required fullWidth id="email" label="Email Address"
              name="email" autoComplete="email" autoFocus value={registerEmail}
              onChange={handleRegisterEmailChange} onBlur={handleValidateEmail}
              error={(!isEmailValid || isEmailUsed) && registerEmail.length !== 0}
              helperText={emailHelperText}
            />

            <TextField
              margin="normal" required fullWidth id="username" label="Username"
              name="username" autoComplete="username" autoFocus value={registerUsername}
              onChange={handleRegisterUsernameChange} onBlur={handleValidateUsername}
              error={(!isUsernameValid || isUserNameExists) && registerUsername.length !== 0}
              helperText={usernameHelperText}
            />

            <TextField
              margin="normal" required fullWidth name="password" label="Password"
              type="password" id="password" autoComplete="current-password" value={registerPassword}
              onChange={handleRegisterPasswordChange} onBlur={handleValidatePassword}
              error={!isPasswordValid && registerPassword.length !== 0}
              helperText={passowrdHelperText}
            />

            <TextField
              margin="normal" required fullWidth name="confirm-password" label="Confirm password"
              type="password" id="confirm-password" autoComplete="current-password" value={confirmPassword}
              onChange={handleConfirmPasswordChange} onBlur={handleCheckPassword}
              error={!isPassWordSame(registerPassword, confirmPassword) && confirmPassword.length !== 0}
              helperText={confirmHelperText}
            />

            <TextField
              margin="normal" required fullWidth name="phonenumber" label="Phone number"
              type="phonenumber" id="phonenumber" autoComplete="phonenumber" value={phoneNumber}
              onChange={handlePhoneChange}
            />

            <Button
              type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>

            <Grid container>
              <Grid item>
                <a onClick={handleSignUpOpen}>
                  {'Already have an account? Sign In'}
                </a>
              </Grid>
            </Grid>

            <Copyright sx={{ mt: 5 }} />

          </Box>
        </Box>

        {/* 驗證信頁面 */}
        <Box
          sx={{
            my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}
          className={
            classNames({ 'verify-email': true }, { hide: !verifyOpen })
          }
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <HowToRegOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            驗證信已寄至{registerEmail}，請前往收信。
          </Typography>

          {/* <Box component="form" noValidate onSubmit={handleContinueSignIn} sx={{ mt: 1 }}>
            <Button
              type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
            >
              Log In!
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box> */}
        </Box>

        {/* 重設密碼寄信頁面 */}
        <Box
          sx={{
            my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}
          className={
            classNames({ 'reset-email': true }, { hide: !resetOpen })
          }
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <HowToRegOutlinedIcon />
          </Avatar>

          <Box component="form" noValidate onSubmit={handleSendResetMail} sx={{ mt: 1 }}>

            <TextField
              margin="normal" required fullWidth id="email" label="Email Address"
              name="email" autoComplete="email" autoFocus
            />
            <Button
              type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>

        {/* 重設密碼寄信寄出頁面 */}
        <Box
          sx={{
            my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}
          className={
            classNames({ 'reset-email-sent': true }, { hide: !sentOpen })
          }
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <HowToRegOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            驗證信已寄至{resetEmail}，請前往收信。
          </Typography>
          <Copyright sx={{ mt: 5 }} />
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

export default SignInSide
