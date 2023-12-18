import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
// import  Cloudinary  from '@cloudinary/angular-1.0.0-beta.14';


import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostsService } from 'src/app/services/posts.service';
import { InewPostDetails, InewPostSuccessMessage } from 'src/app/interfaces/interfaces';
import { FlashmessagesService } from 'src/app/services/flashmessages.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit  {
   createPostForm!:FormGroup
   postContent: string = '';
   selectedFile: File | null = null;
   imagePreviewUrl: string | null = null;

   constructor(private formBuilder:FormBuilder, private route:Router, private dialogRef:MatDialogRef<PostCreateComponent>,private postSvc:PostsService,private flashMsg:FlashmessagesService){}


  
    ngOnInit() {
      const cld = new Cloudinary({cloud: {cloudName: 'dpxmkgoty'}});
    }

  



  submit(){
  
    console.log("image url ment to go to the db ",this.imagePreviewUrl)
    if(this.postContent.trim() !==""|| this.imagePreviewUrl!=""){
      const newPost:InewPostDetails={
        postContent:this.postContent,
        postImageUrl:this.imagePreviewUrl as string
      }
       console.log(newPost)
      this.postSvc.createPost(newPost).subscribe(
       (res:any)=>{
            console.log(res)
            this.flashMsg.pushMessage({
              type:'success',
              message:res.message
            })
        },
        err=>{
          console.log(err)
        }
      )
      

    }
    this.dialogRef.close()    

  }


  onFileChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedFile = files[0];
      const formData = new FormData()
            formData.append("file", files[0])
            formData.append("upload_preset", "Talky2")
            formData.append("cloud_name", "dpxmkgoty")

        

            fetch('https://api.cloudinary.com/v1_1/dpxmkgoty/image/upload', {
                method: "POST",
                body: formData
            }).then((res) => res.json()).then(res => this.imagePreviewUrl = res.url)

      // Image preview
      // this.previewImage();
    }
  }

  // previewImage(): void {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     this.imagePreviewUrl = reader.result as string;
  //   };
  //   reader.readAsDataURL(this.selectedFile as Blob);
  // }




}
