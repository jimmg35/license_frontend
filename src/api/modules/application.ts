import { IApplicationParam } from '../../pages/ApplicationPage'
import { applicationServiceApiConfig } from './config'

export const newApplication = async (options: IApplicationParam) => {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const bodyContent = `token=${options.token}&firstName=${options.firstName}&lastName=${options.lastName}&email=${options.email}&username=${options.username}&grade=${options.grade}&course=${options.course}`
  const response = await fetch(`${applicationServiceApiConfig.serverString}/api/License/new`, {
    method: 'POST',
    body: bodyContent,
    headers: headersList
  })
  return response
}

export const listByUser = async () => {
  const headersList = {
    Accept: '*/*'
  }
  const response = await fetch(`${applicationServiceApiConfig.serverString}/api/License/listByUser?token=${localStorage.getItem('token')}`, {
    method: 'GET',
    headers: headersList
  })
  return response
}

export const listAll = async () => {
  const headersList = {
    Accept: '*/*'
  }
  const response = await fetch(`${applicationServiceApiConfig.serverString}/api/License/listAll?token=${localStorage.getItem('token')}`, {
    method: 'GET',
    headers: headersList
  })
  return response
}

export const approveApplication = async (_userId: string) => {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const bodyContent = `token=${localStorage.getItem('token')}&_userId=${_userId}`
  const response = fetch(`${applicationServiceApiConfig.serverString}/api/License/approveLicense`, {
    method: 'PUT',
    body: bodyContent,
    headers: headersList
  })
  return response
}
