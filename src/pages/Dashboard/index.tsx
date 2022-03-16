import React, { useState, useEffect } from 'react'
import './index.scss'
import api from '../../api'

const Dashboard = () => {
  const [applicationArray, setapplicationArray] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.application.listAll()
      const content = await response.json()
      // const fakeContent = []
      // for (let i = 0; i < 15; i++) {
      //   fakeContent.push(content.response[0])
      // }
      // setapplicationArray(fakeContent)
      setapplicationArray(content.response)
    }
    fetchData()
  }, [])

  const handleApprove = async (userId: any) => {
    const response = await api.application.approveApplication(userId)
    if (response.status === 200) {
      const newApplicationArray: any[] = []
      applicationArray.forEach((user) => {
        console.log(user.userId, userId)
        if (user.userId === userId) {
          user.application.approved = true
        }
        newApplicationArray.push(user)
      })
      setapplicationArray(newApplicationArray)
    } else {
      alert('核准失敗')
    }
  }

  return (
    <div className="iadc-dashboard">
      <div className='table-container'>
        <table className='iadc-table'>
          <thead className='header'>
            <tr>
              <th>申請人</th>
              <th>ArcGIS帳號</th>
              <th>信箱</th>
              <th>修習課程</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody className='body'>
            {
              applicationArray.map((user, index) => {
                return user.application === null
                  ? <></>
                  : <tr key={index}>
                    <td>{user.application.fullname}</td>
                    <td>{user.application.arcGisUsername}</td>
                    <td>{user.email}</td>
                    <td>{user.application.course}</td>
                    <td>
                      {
                        user.application.approved
                          ? <p>已批准</p>
                          : <button onClick={() => { handleApprove(user.userId) }}>批准</button>
                      }
                    </td>
                  </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
