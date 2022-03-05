import { authServiceApiConfig } from './config'
import { User } from '../DTO/User'

export const authenticateUser = async (user: User) => {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const response = await fetch(`${authServiceApiConfig.serverString}/api/Auth/authenticate`, {
    method: 'POST',
    body: `email=${user.email}&password=${user.password}`,
    headers: headersList
  })
  return response
}

export const validateToken = async (token: string) => {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const response = await fetch(`${authServiceApiConfig.serverString}/api/Auth/validate`, {
    method: 'POST',
    body: `token=${token}`,
    headers: headersList
  })
  return response
}
