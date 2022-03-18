import React, { useState, useEffect, useContext } from 'react'
import './index.scss'
import { authStatusContext } from '../../routes/AuthStatus/AuthStatusProvider'
import form from '../../assets/form.png'
import { AuthStatus } from '../../routes/AuthStatus/AuthStatus'
import { Select, MenuItem } from '@mui/material'
import api from '../../api'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

type statusOption = {
  [key: number]: { title: string, description: string }
}

const responseStatusAlert: statusOption = {
  200: {
    title: 'Yeah!',
    description: '申請成功'
  },
  400: {
    title: 'GG!',
    description: '不允許重複申請'
  },
  500: {
    title: 'QAQ',
    description: '伺服器死去，請聯繫jim60308@gmail.com'
  }
}

export type IApplicationParam = {
  token: string
  firstName: string
  lastName: string
  grade: string
  course: string
  email: string
  username: string
}

const ApplicationPage = () => {
  const authStatus = useContext(authStatusContext)
  const [firstName, setfirstName] = useState<string>('')
  const [lastName, setlastName] = useState<string>('')
  const [grade, setgrade] = useState<string>('')
  const [course, setcourse] = useState<string>('')
  const [email, setemail] = useState<string>('')
  const [username, setusername] = useState<string>('')
  const [dialogOpen, setdialogOpen] = useState<boolean>(false)
  const [dialogTitle, setdialogTitle] = useState<string>('')
  const [dialogContent, setdialogContent] = useState<string>('')

  useEffect(() => {
    const { userEmail, arcGisUserName } = parseUserInfo(authStatus)
    setemail(userEmail)
    setusername(arcGisUserName)
  }, [])

  const parseUserInfo = (authStatus: AuthStatus) => {
    const userEmail = authStatus.userInfo?.email as string
    const arcGisUserName = userEmail.split('@')[0] + '_NTNUGIS'
    return { userEmail, arcGisUserName }
  }

  const handleApplicate = async () => {
    if (firstName.trim() === '' || lastName.trim() === '') {
      alert('請輸入姓名')
      return
    }
    if (course.trim() === '' || grade.trim() === '') {
      alert('請輸入年級與修習課程')
      return
    }
    const submitParam: IApplicationParam = {
      token: localStorage.getItem('token') as string,
      firstName: firstName,
      lastName: lastName,
      grade: grade,
      course: course,
      email: email,
      username: username
    }
    const response = await api.application.newApplication(submitParam)
    setdialogOpen(true)
    setdialogTitle(responseStatusAlert[response.status].title)
    setdialogContent(responseStatusAlert[response.status].description)
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
            <p>First name(名)</p>
            <input
              className='iadc-input'
              value={firstName}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setfirstName(e.target.value) }}
            ></input>
          </div>
          <div className='input-set input-long'>
            <p>Last name(姓)</p>
            <input
              className='iadc-input'
              value={lastName}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setlastName(e.target.value) }}
            ></input>
          </div>
        </div>

        <div className='info-input-set'>
          <div className='input-set input-long'>
            <p>年級</p>
            <Select
              value={grade}
              onChange={(e) => { setgrade(e.target.value) }}
              className='iadc-input mui-select-patch'
            >
              <MenuItem value={'學士1年級'}>學士1年級</MenuItem>
              <MenuItem value={'學士2年級'}>學士2年級</MenuItem>
              <MenuItem value={'學士3年級'}>學士3年級</MenuItem>
              <MenuItem value={'學士4年級'}>學士4年級</MenuItem>
              <MenuItem value={'碩士班'}>碩士班</MenuItem>
              <MenuItem value={'博士班'}>博士班</MenuItem>
              <MenuItem value={'延畢'}>延畢</MenuItem>
            </Select>
          </div>
          <div className='input-set input-long'>
            <p>修習課程</p>
            <input
              className='iadc-input'
              value={course}
              onChange={(e) => { setcourse(e.target.value) }}
            ></input>
          </div>
        </div>

        <div className='info-input-set'>
          <div className='input-set input-long'>
            <p>E-mail</p>
            <input
              className='iadc-input input-disable'
              value={email}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setemail(e.target.value) }}
              disabled
            ></input>
          </div>
          <div className='input-set input-long'>
            <p>Username</p>
            <input
              className='iadc-input input-disable'
              value={username}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setusername(e.target.value) }}
              disabled
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

      <Dialog
        fullScreen={false}
        open={dialogOpen}
        onClose={() => { setdialogOpen(false) }}
      >
        <DialogTitle>
          {dialogTitle}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {dialogContent}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => { setdialogOpen(false) }} autoFocus>
            好ㄉ
          </Button>
        </DialogActions>

      </Dialog>

    </div>
  )
}

export default ApplicationPage
