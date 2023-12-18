import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEditUserDetails, IUserDetails, IresetPasswordUserData } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // POST http://localhost:3400/users/all
//POST http://localhost:3400/users/forgot-password
 baseUrl:string=`http://localhost:3400/users`
  constructor(private http:HttpClient) { }

  getAllUser():Observable<IUserDetails[]>{
    return this.http.post<IUserDetails[]>(this.baseUrl+`/all`,{})
  }
  getUserByID(id:string):Observable<IUserDetails>{
    return this.http.get<IUserDetails>(this.baseUrl +`/${id}`)

  }
  updateUser(userDetails:IEditUserDetails){
    return this.http.patch(this.baseUrl+`/update`,userDetails)
  }
  forgotPassword(email:string){
    return this.http.post(this.baseUrl+`/forgot-password`,{email})

  }

  resetPassword(resetPasswordPayload:IresetPasswordUserData){
    return this.http.post(this.baseUrl+`/reset-password`,resetPasswordPayload)
  }
  



}

