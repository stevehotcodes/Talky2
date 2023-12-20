import { Component, OnInit } from '@angular/core';
import { ViewProfileComponent } from '../view-profile/view-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UsersService } from 'src/app/services/users.service';
import { IUserDetails } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  loggedinUserDetails!:IUserDetails
  id!:string

  isFollowersOn: boolean = false;
  isFollowingOn: boolean = false;
  isActive:boolean=false
  isNone:string='none'

  constructor(private matDialog:MatDialog,private userSvc:UsersService){}


  ngOnInit(){
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
  

  openDialog(){
    this.matDialog.open(EditProfileComponent,{
      width:'50%',
      height:"95svh"
    })
  }

  toggleFollowing(){
    this.isFollowersOn=true
    this.isFollowingOn=false
    this.isActive=!this.isActive
  }
  toggleViewFollowers(){
    this.isFollowingOn=true
    this.isFollowersOn=false
    this.isActive=!this.isActive
  }

}
