/* eslint-disable */
import api from '../../api'

export interface IPayload {
  _userId: string
  username: string
  email: string
  alias: string
  iat: number
  exp: number
}

export interface IUserInfo {
  _userId: string
  username: string
  email: string
  alias: string
}

export class UserInfo {
  public _userId: string
  public username: string
  public email: string
  public alias: string

  constructor(options: IUserInfo) {
    this._userId = options._userId
    this.username = options.username
    this.email = options.email
    this.alias = options.alias
  }
}

export class AuthStatus {
  public userInfo: UserInfo | undefined
  public isAuthenticated: boolean

  constructor() {
    this.userInfo = undefined
    this.isAuthenticated = false
  }

  public authenticateToken = async (token: string) => {
    const response = await api.auth.validateToken(token)
    if (response.status === 200) {
      const payload = await response.json()
      this.userInfo = this.parsePayload(payload['payload'])
      this.isAuthenticated = true
      return this.isAuthenticated
    }
    this.isAuthenticated = false
    return this.isAuthenticated
  }

  public parsePayload = (payload: IPayload): UserInfo => {
    return new UserInfo({
      _userId: payload._userId,
      username: payload.username,
      email: payload.email,
      alias: payload.alias
    })
  }
}

export default new AuthStatus()
