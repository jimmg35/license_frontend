import React, { useState, useEffect, useContext } from 'react'
import './index.scss'
import { authStatusContext } from '../../routes/AuthStatus/AuthStatusProvider'
import form from '../../assets/form.png'
// import { Button } from '@mui/material'

export type IApplicationParam = {
  firstName: string
  lastName: string
  email: string
  username: string
}

const ApplicationPage = () => {
  const authStatus = useContext(authStatusContext)
  const [firstName, setfirstName] = useState<string>('')
  const [lastName, setlastName] = useState<string>('')
  const [email, setemail] = useState<string>('')
  const [username, setusername] = useState<string>('')

  useEffect(() => {
    setemail(authStatus.userInfo?.email as string)
    setusername(authStatus.userInfo?.username as string)
  }, [])

  const handleApplicate = () => {
    const submitParam: IApplicationParam = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username
    }
    console.log(submitParam)
    // console.log(firstName)
    // console.log(lastName)
    // console.log(email)
    // console.log(username)
    // alert('aa')
  }

  return (
    <div className="iadc-applicationPage">

      <div className='application-form'>

        <div className='title-set'>
          <img className='photo' src={form}></img>
          <p className='title'>ArcGIS License申請表格</p>
          <p className='description'>請依序填入以下資訊，送出前請重複確認，License申請後即無法更改</p>
        </div>

        <div className='info-input-set'>
          <div className='input-set input-long'>
            <p>First name</p>
            <input
              className='iadc-input'
              value={firstName}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setfirstName(e.target.value) }}
            ></input>
          </div>

          <div className='input-set input-long'>
            <p>Last name</p>
            <input
              className='iadc-input'
              value={lastName}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setlastName(e.target.value) }}
            ></input>
          </div>
        </div>
        <div className='info-input-set'>
          <div className='input-set input-long'>
            <p>E-mail</p>
            <input
              className='iadc-input'
              value={email}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setemail(e.target.value) }}
            ></input>
          </div>
          <div className='input-set input-long'>
            <p>Username</p>
            <input
              className='iadc-input'
              value={username}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setusername(e.target.value) }}
            ></input>
          </div>
        </div>

        <div className='submit-btn-container'>
          <button
            className='submit-btn'
            onClick={handleApplicate}
          >送出申請</button>
        </div>
      </div>

    </div>
  )
}

export default ApplicationPage
