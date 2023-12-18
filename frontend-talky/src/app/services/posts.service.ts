import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPostWithCommentsAndUserDetails, IPosts, IPostsWithUserDetails, InewPostDetails, InewUserDetails } from '../interfaces/interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseUrl:string= `http://localhost:3400/posts`

  // GET http://localhost:3400/posts/user

  constructor(private http:HttpClient) { }


   createPost(newPostDetails:InewPostDetails){
    return  this.http.post(this.baseUrl+`/new`,newPostDetails)
   }

   getAllPosts():Observable<IPostsWithUserDetails[]>{
     return this.http.get<IPostsWithUserDetails[]>(this.baseUrl+`/all`)
   }
   getPostsByUsers():Observable<IPostsWithUserDetails[]>{
    return this.http.get<IPostsWithUserDetails[]>(this.baseUrl +`/user`)
   }
   
   
}
