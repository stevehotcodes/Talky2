import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEditUserDetails, IPostsWithUserDetails, IUserDetails, IgetFollowers } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { FollowersService } from 'src/app/services/followers.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  editProfileForm!:FormGroup
  followers: IgetFollowers[]=[]
  posts:IPostsWithUserDetails[]=[]
  id!:string
  loggedinUserDetails!:IUserDetails
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;
  editUserDetails!:IEditUserDetails
  // profileImageUrl?:string | null

  constructor(private formBuilder:FormBuilder, private dialogRef:DialogRef<EditProfileComponent>,private route:Router,private followerSvc:FollowersService,private postsSvc:PostsService,private userSvc:UsersService){}

  ngOnInit(){
    this.editProfileForm=this.formBuilder.group({
       fullName:['',[Validators.required]],
       userName:['',[Validators.required]],
       email:['',[Validators.required]],
       bio:['',[Validators.required]],
       password:['',[Validators.required]],
       profileImageUrl:['',[Validators.required]]


    })

    this.followerSvc.getFollwers().subscribe(
      res=>{
        console.log(res)
        this.followers=res
      }
    )

    this.postsSvc.getPostsByUsers().subscribe(
      res=>{
        console.log(res);
        
        this.posts=res
      }
    )
  this.id=localStorage.getItem('talkyLoggedUserID') as string
  console.log(this.id)

  this.userSvc.getUserByID(this.id).subscribe(
    res=>{
      console.log(res)
      // console.log(user);
      this.loggedinUserDetails=res
      console.log(this.loggedinUserDetails);
      
    }
  )
  
  
   
}


submit(){
  delete this.editProfileForm.value.fullName
  this.editProfileForm.value.profileImageUrl=this.imagePreviewUrl

  this.editUserDetails={
    userName:this.editProfileForm.value.userName as string,
    email:this.editProfileForm.value.email as string,
    profileImageUrl:this.editProfileForm.value.profileImageUrl as string,
    bio:this.editProfileForm.value.bio as string,
    password:this.editProfileForm.value.password as string

  }
  console.log("data of username",this.editProfileForm.value.userName)

  this.userSvc.updateUser(this.editUserDetails).subscribe(
    res=>{
      console.log(res)
    },
    err=>{
      console.log(err)
    }
  )


  this.dialogRef.close()
  this.route.navigate(['profile'])
  

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

    
  }
}




}
