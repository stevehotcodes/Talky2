import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserLogincredntials } from '../interfaces/interfaces';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  baseUrl:string=`http://localhost:3400/users/login`

  constructor(private http:HttpClient, private authSvc:AuthService,private route:Router) { }

  logIn(userCredntial:IUserLogincredntials){

    this.http.post(this.baseUrl,userCredntial).subscribe(
      (res:any)=>{
        console.log(res)
        this.authSvc.signin({email:res.email,token:res.token,id:res.id})

         if(res.token){
          this.route.navigate(['/all'])
         }
        
      },
      (err:any)=>{
        console.log(err)
      }
    )
  }
 




}
