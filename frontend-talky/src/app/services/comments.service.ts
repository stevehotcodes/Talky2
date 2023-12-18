import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommentWithUserAndPostInfo } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  baseUrl:string=`http://localhost:3400/comments`

  constructor(private http:HttpClient) { }

  addComment(id:string,commentContent:string){
   return  this.http.post(this.baseUrl +`/new/${id}`,{commentContent})

  }
  getCommentsofAPost(postID:string):Observable<ICommentWithUserAndPostInfo[]>{
       return this.http.get<ICommentWithUserAndPostInfo[]>(this.baseUrl +`/${postID}`)
  }
}
