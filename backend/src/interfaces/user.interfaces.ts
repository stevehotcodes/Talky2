import { Request } from "express";

export interface User {
  id: string;
  fullName: string;
  userName:string
  email: string;
  password: string;
  role: string;
  
}
export interface LoginUser extends Request {
  email: string;
  password: string;
}

export interface IUserDetails{
  id: string;
  fullName: string;
  userName:string;
  email: string;
  password: string;
  role: string;
  profileImageUrl:string
  isWelcomed?: 0 |1,
  isResetPasswordEmailSent?: 0,
  resetPasswordToken?: string
  isDeleted?: 0 | 1
  dateJoined?:string
  
}


export interface IresetPasswordData {
  id:string
  password:string

}
export interface IresetPasswordData {
  id:string
  password:string

}