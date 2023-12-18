import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { PostCreateComponent } from '../post-create/post-create.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { PostsService } from 'src/app/services/posts.service';
import { ICommentWithUserAndPostInfo, IPostsWithUserDetails } from 'src/app/interfaces/interfaces';
import { CommentsService } from 'src/app/services/comments.service';
import { FlashmessagesComponent } from '../flashmessages/flashmessages.component';
import { FlashmessagesService } from 'src/app/services/flashmessages.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  posts:IPostsWithUserDetails[]=[]
  comments:ICommentWithUserAndPostInfo[]=[]
  commentContent:string=""
  showCommentInput!:boolean
  constructor(private matDialog:MatDialog,private postSvsc:PostsService,private commentSvc:CommentsService,private flashSvc:FlashmessagesService ){}


  openDialog(){
    this.matDialog.open(EditProfileComponent,{
      width:'43.75rem',
      
      
    });
  }

  ngOnInit(): void {
    this.postSvsc.getPostsByUsers().subscribe(
      res=>{
        this.posts=res
        console.log(this.posts);
        
        
      }
    )
  }



  submitComment(postID:string){
    console.log(this.commentContent)
    console.log(postID)
  this.commentSvc.addComment(postID,this.commentContent).subscribe(
    (res:any)=>{
      console.log(res)
      this.flashSvc.pushMessage({
        type:'success',
        message:res.message
      })
      
      this.commentContent=''
      
    },
  
    err=>{
      console.log(err)
    }
  )
    

  }


}
