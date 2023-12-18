import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IloggedUser } from '../interfaces/interfaces';
import { Observable } from 'rxjs';


export interface ISignedUserDetails{
  id: string
  fullName:string
  userName:string
  email:string
  profileImageUrl: string,
  role:'user'
  isDeleted: 0 | 1
  password:string
  isWelcomed:number
  isResetPasswordEmailSent: 0 | 1,
  resetPasswordToken: string
  bio: string
  resetTokenExpiry: string | null ,
  resetToken: string | null

}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }



  signin(loggedUser:IloggedUser) {
    localStorage.setItem('talkiLoggedUseremail', loggedUser.email)
    localStorage.setItem('talkyLoggedUserToken', loggedUser.token)
    localStorage.setItem('talkyLoggedUserID', loggedUser.id)

    // window.location.reload()
  }

  getSignedInUser():Observable<ISignedUserDetails >{
    return this.http.get<ISignedUserDetails>('http://localhost:3400/users/logged')
  }

}
