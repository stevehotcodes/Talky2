import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewProfileComponent } from '../view-profile/view-profile.component';
import { UsersService } from 'src/app/services/users.service';
import { IUserDetails } from 'src/app/interfaces/interfaces';
import { FollowersService } from 'src/app/services/followers.service';

@Component({
  selector: 'app-talkies',
  templateUrl: './talkies.component.html',
  styleUrls: ['./talkies.component.css']
})
export class TalkiesComponent implements OnInit{
  talkies:IUserDetails[]=[]
  filteredTalkiesArray:IUserDetails[]=[]
  _searchText:string='';
  isFollowing:boolean =false
  followingStates: { [followingID: string]: boolean } = {};

  constructor(private matDialog:MatDialog,private userSvc:UsersService,private followSvc:FollowersService){}

  ngOnInit(): void {
    this.getAllTalkies()
  }



  getAllTalkies(){
    this.userSvc.getAllUser().subscribe(
      res=>{
       this.talkies=res
       console.log(this.talkies)

      }
     )
  }

  openDialog(id:string){
    this.matDialog.open(ViewProfileComponent,{
      width:'500px'
    })
  }

  toggleFollowingState(followingID: string) {
    this.followingStates[followingID] = !this.followingStates[followingID];
    const actionType = this.followingStates[followingID] ? 'follow' : 'unfollow';
    this.updateFollowStateOnServer(followingID, actionType);
  }

  getButtonText(followingID: string): string {
    return this.followingStates[followingID] ? 'unfollow' : 'follow';
  }





updateFollowStateOnServer(followingID:string,actionType:string){
  if(actionType=='follow'){
    this.followSvc.followOtherUser(followingID).subscribe(
      res=>{
        console.log(res)
        console.log(`You are following user ${followingID} now`)

      },
      err=>{
        console.error(`Error following user ${followingID}`, err)
      }
    )

  }
  else if(actionType=='unfollow'){
    this.followSvc.unfollowOtherUser(followingID).subscribe(
      res=>{
        console.log(res)
        console.log(`You unfollowed user ${followingID}`);

      },
      error => {
        console.error(`Error unfollowing user ${followingID}`, error);
        // Revert the state on error
        this.followingStates[followingID] = !this.followingStates[followingID];
      }
    )
  }
}






  
  followThisUser(followingID:string, i:number){
    this.followingStates[followingID]=!this.followingStates[followingID]
    // this.toggleFolowingEvent(i)
    this.followSvc.followOtherUser(followingID).subscribe(
      res=>{
        console.log(followingID)
        console.log(res)
        console.log("you are following this user now")
        

      }
    )
  }
  unfollowerThisUser(followingID:string, i:number){
    this.followingStates[followingID]=!this.followingStates[followingID]
    // this.toggleFolowingEvent(i)
     this.followSvc.unfollowOtherUser(followingID).subscribe(
      res=>{
        console.log(followingID);
        console.log(res);
     
        
      }
     )

  }

  // toggleFolowingEvent(i:number){
  //   this.isFollowing=!this.isFollowing
  // }
   tagFilter(filterBy:string){
    filterBy=filterBy.toLowerCase()
    return this.talkies.filter((talky)=>{
      talky.userName.toLowerCase().includes(filterBy)
    })
   }

    get searchText(){
      return this._searchText
    }

    set searchText(value:string){
      this._searchText=value
      console.log("this is the setter value",value);
      this.filteredTalkiesArray=this.tagFilter(value)
      console.log('this is the filter array', this.filteredTalkiesArray)


    }

}
