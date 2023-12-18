import { Component, OnInit } from '@angular/core';
import { PostCreateComponent } from '../../components/post-create/post-create.component';
import {MatDialog} from '@angular/material/dialog'
import { PostsService } from 'src/app/services/posts.service';
import { ICommentWithUserAndPostInfo, IPostLikeCount, IPostWithCommentsAndUserDetails, IPosts, IPostsWithUserDetails } from 'src/app/interfaces/interfaces';
import { CommentsService } from 'src/app/services/comments.service';
import { FlashmessagesService } from 'src/app/services/flashmessages.service';
import { LikesService } from 'src/app/services/likes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

  posts:IPostsWithUserDetails[]=[]
  postID:string | null=""
  comments:ICommentWithUserAndPostInfo[]=[]
  likesCount:IPostLikeCount[]=[]
  commentContent:string=""
  showCommentInput!:boolean
  postCommentStates: { [postID: string]: boolean } = {};
  isClicked:boolean=false

  constructor(private matDialog:MatDialog, private postSvc:PostsService, private commentSvc:CommentsService,private flashSvc:FlashmessagesService,private likesSvc:LikesService, private route:ActivatedRoute){}

  ngOnInit(){
    this.postSvc.getAllPosts().subscribe(
      res=>{
          console.log(res) 
          this.posts=res
          console.log(this.posts)
          
      },
      err=>{
        console.log(err)
      }
    )
    this.route.paramMap.subscribe((params) => {
      this.postID = params.get('postID');
      console.log('Post ID:', this.postID);
    });
    
    


  }

  openDialog(){
    this.matDialog.open(PostCreateComponent,{
      width:'43.75rem',
      
    });
    
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

addAliketoPost(postID:string){
  this.likesSvc.addLikeToPost(postID).subscribe(
    res=>{
       console.log(res)
    }
  )
}

  

}
