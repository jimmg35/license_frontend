import React from 'react'
import classNames from 'classnames'
import { Grid, Container, Paper } from '@mui/material'
import './UserProfile.scss'

export interface IUserProfileParams {
  open: boolean
}

const UserProfile = (props: IUserProfileParams) => {
  // const [open] = useState<boolean>(props.open)

  return (
    // <div className={
    //   classNames({ 'user-profile': true }, { hide: !props.open })
    // }>
    //   <div className='content-box'>
    //     <div></div>
    //     <div></div>
    //   </div>
    // </div>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} className={
      classNames({ 'user-profile': true }, { hide: !props.open })
    }>
      <Grid container spacing={3}>

        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300
            }}
            className='content-box'
          >
          </Paper>

          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 476,
              mt: 3
            }}
            className='content-box'
          >
          </Paper>
        </Grid>

        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 800
            }}
            className='content-box'
          >
          </Paper>
        </Grid>

      </Grid>
    </Container>
  )
}

export default UserProfile
