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
