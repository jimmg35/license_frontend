/* eslint-disable */
import api from '../../api'

export interface IRole {
  id: number
  roleName: string
}

export interface IPayload {
  _userId: string
  username: string
  email: string
  alias: string
  iat: number
  exp: number
  roles: IRole[]
}

export interface IUserInfo {
  _userId: string
  username: string
  email: string
  alias: string
  roles: IRole[]
}

export class UserInfo {
  public _userId: string
  public username: string
  public email: string
  public alias: string
  public roles: IRole[]

  constructor(options: IUserInfo) {
    this._userId = options._userId
    this.username = options.username
    this.email = options.email
    this.alias = options.alias
    this.roles = options.roles
  }
}

export class AuthStatus {
  public userInfo: UserInfo | undefined
  public isAuthenticated: boolean
  public level: number

  constructor() {
    this.userInfo = undefined
    this.isAuthenticated = false
    this.level = 1
  }

  public authenticateToken = async (token: string) => {
    const response = await api.auth.validateToken(token)
    if (response.status === 200) {
      const payload = await response.json()
      this.userInfo = this.parsePayload(payload['payload'])
      this.level = this.parseUserLevel(payload['payload'])
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
      alias: payload.alias,
      roles: payload.roles
    })
  }

  public parseUserLevel = (payload: IPayload): number => {
    let biggestLevel = 1
    payload.roles.forEach((role) => {
      if (role.id > biggestLevel)
        biggestLevel = role.id
    })
    return biggestLevel
  }
}

export default new AuthStatus()
