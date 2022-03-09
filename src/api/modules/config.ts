/* eslint space-before-function-paren: ["error", "never"] */
/* eslint-env es6 */

export interface IApiConfigParam {
  protocol: 'http' | 'https' | string
  domain: string
  port: string
}

export default class ApiConfig {
  protocol: 'http' | 'https' | string
  domain: string
  port: string
  serverString: string

  constructor(options: IApiConfigParam) {
    this.protocol = options.protocol
    this.domain = options.domain
    this.port = options.port
    this.serverString = `${this.protocol}://${this.domain}:${this.port}`
  }
}

export const authServiceApiConfig = new ApiConfig({
  protocol: process.env.REACT_APP_API_PROTOCOL as string,
  domain: process.env.REACT_APP_API_DOMAIN as string,
  port: process.env.REACT_APP_API_PORT as string
  // domain: '140.122.82.98',
  // port: '86'
})

export const userServiceApiConfig = new ApiConfig({
  protocol: process.env.REACT_APP_API_PROTOCOL as string,
  domain: process.env.REACT_APP_API_DOMAIN as string,
  port: process.env.REACT_APP_API_PORT as string
  // domain: '140.122.82.98',
  // port: '86'
})
