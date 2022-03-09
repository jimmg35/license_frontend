import React, { useContext } from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { authStatusContext } from '../../../routes/AuthStatus/AuthStatusProvider'

const MenuBar = () => {
  const navigate = useNavigate()
  const authStatus = useContext(authStatusContext)
  return (
    <div className='iadc-menubar'>

      <div className='user-status'>
        <div
          className='hello'
        >
          <p>安安你好</p>
          <p>{authStatus.userInfo?.username}</p>
        </div>

        <div className='divider'></div>
      </div>

      <button
        className='page-btn'
        onClick={() => { navigate('/') }}
      >申請狀態</button>

      <button
        className='page-btn'
        onClick={() => { navigate('/application') }}
      >申請表格</button>

      <button
        className='page-btn'
        onClick={() => { navigate('/dashboard') }}
      >儀錶板</button>
    </div>
  )
}

export default MenuBar
