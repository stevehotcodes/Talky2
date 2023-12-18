import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { InewUserDetails } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  baseUrl:string=`http://localhost:3400/users/signup`

  constructor(private http:HttpClient, private router:Router) { }

  registerUser(newUserDetails:InewUserDetails){
    this.http.post(this.baseUrl,newUserDetails).subscribe(
      (res)=>{
        console.log(res)
        this.router.navigate(['/login']);
      },
      err=>{
        console.log(err)
      }
    )

  }

}
