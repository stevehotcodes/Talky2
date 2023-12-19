import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { PostCreateComponent } from '../post-create/post-create.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { PostsService } from 'src/app/services/posts.service';
import { ICommentWithUserAndPostInfo, IPostLikeCount, IPostsWithUserDetails } from 'src/app/interfaces/interfaces';
import { CommentsService } from 'src/app/services/comments.service';
import { FlashmessagesComponent } from '../flashmessages/flashmessages.component';
import { FlashmessagesService } from 'src/app/services/flashmessages.service';
import { LikesService } from 'src/app/services/likes.service';

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
  postID:string | null=""
  likesCount:IPostLikeCount[]=[]
  postCommentStates: { [postID: string]: boolean } = {};
  isClicked:boolean=false
  constructor(private matDialog:MatDialog,private postSvsc:PostsService,private commentSvc:CommentsService,private flashSvc:FlashmessagesService , private likesSvc:LikesService ){}


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
      // window.location.reload()
    },
  
    err=>{
      console.log(err)
    }
  )
    

  }

  addAliketoPost(postID:string){
    this.likesSvc.addLikeToPost(postID).subscribe(
      (res:any)=>{
         this.flashSvc.pushMessage({
          type:'success',
          message:res.message
         })
         
      },
      (message:any)=>{
        this.flashSvc.pushMessage({
          type:'error',
          message:'You already liked this post'
        })
        // window.location.reload()
      }
    )
    window.location.reload()
  }


  
  toggleCommentInput(postID:string) {
    this.postCommentStates[postID] = !this.postCommentStates[postID];
    this.isClicked=!this.isClicked
    this.likesSvc.getAllLiketoPost(postID).subscribe(
      res=>{
         console.log(res)
      }
    )
        
  }

  
  toggleShowComment(postID:string,i:number) {
    this.postCommentStates[postID] = !this.postCommentStates[postID];
    this.toggleClickEvent(i)
    this.commentSvc.getCommentsofAPost(postID).subscribe(
      res=>{
        console.log(res)
        this.comments=res
        console.log("comments array",this.comments)
        
      }
    ) 
        
  }
  
toggleClickEvent(i:number){
  this.isClicked=!this.isClicked
}

  


}
