/* eslint-disable */

export interface IUser {
  email: string
  password: string
}

export class User {
  email: string
  password: string

  constructor(options: IUser) {
    this.email = options.email
    this.password = options.password
  }
}

export interface IRegisterUser {
  email: string
  username: string
  password: string
  phoneNumber: string
}

export class RegisterUser {
  email: string
  username: string
  password: string
  phoneNumber: string

  constructor(options: IRegisterUser) {
    this.email = options.email
    this.username = options.username
    this.password = options.password
    this.phoneNumber = options.phoneNumber
  }

}