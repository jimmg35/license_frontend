import React, { useState, useEffect } from 'react'
import './index.scss'
import api from '../../api'
import photo from '../../assets/notfound.png'

const ApplicationStatus = () => {
  const [recordStatus, setrecordStatus] = useState<number>(404)
  const [applicant, setapplicant] = useState<string>('')
  const [arcGisUsername, setarcGisUsername] = useState<string>('')
  const [email, setemail] = useState<string>('')
  const [course, setcourse] = useState<string>('')
  const [approved, setapproved] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.application.listByUser()
      setrecordStatus(response.status)
      const content: any = await response.json()
      console.log(content)
      setapplicant(content.application.fullname)
      setarcGisUsername(content.application.arcGisUsername)
      setemail(content.email)
      setcourse(content.application.course)
      setapproved(content.application.approved)
    }
    fetchData()
  }, [])
  return (
    <div className="iadc-applicationStatus">
      {
        recordStatus === 200
          ? <table className='iadc-table'>
            <thead className='header'>
              <tr>
                <th>申請人</th>
                <th>ArcGIS帳號</th>
                <th>信箱</th>
                <th>修習課程</th>
                <th>申請狀態</th>
              </tr>
            </thead>
            <tbody className='body'>
              <tr>
                <td>{applicant}</td>
                <td>{arcGisUsername}</td>
                <td>{email}</td>
                <td>{course}</td>
                <td>{approved === true ? '已通過' : '審核中'}</td>
              </tr>
            </tbody>
          </table>
          : <div className='notfound'>
            <img src={photo}></img>
            <p>找不到申請紀錄</p>
          </div>
      }

    </div>
  )
}

export default ApplicationStatus
