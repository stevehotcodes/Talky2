import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IgetFollowers } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FollowersService {

  baseUrl:string=`http://localhost:3400/followers`


  constructor(private http:HttpClient) { }


   followOtherUser(followingID:string){
    return this.http.post(this.baseUrl +`/${followingID}`,{})
   }
   
   unfollowOtherUser(followingID:string){
    return this.http.delete(this.baseUrl +`/${followingID}`,{})
   }

   getFollwers():Observable<IgetFollowers[]>{
    return this.http.get<IgetFollowers[]>(this.baseUrl)
   }


}
