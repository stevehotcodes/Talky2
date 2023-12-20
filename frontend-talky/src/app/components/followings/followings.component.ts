import { Component, OnInit } from '@angular/core';
import { IgetFollowers } from 'src/app/interfaces/interfaces';
import { FlashmessagesService } from 'src/app/services/flashmessages.service';
import { FollowersService } from 'src/app/services/followers.service';

@Component({
  selector: 'app-followings',
  templateUrl: './followings.component.html',
  styleUrls: ['./followings.component.css']
})
export class FollowingsComponent implements OnInit {

  followingList:IgetFollowers[]=[]
  isNone:string='none'
  followingStates: { [followingID: string]: boolean } = {};


  constructor (private followerSvc:FollowersService, private flashMsg:FlashmessagesService){}

  ngOnInit(): void {
    this.followerSvc.getFollwers().subscribe(
      data=>{
         console.log(data)
         this.followingList=data
         console.log(this.followingList);
         
      }
    )
  }

  toggleFollowingState(followingID: string) {
    this.followingStates[followingID] = !this.followingStates[followingID];
    const actionType = this.followingStates[followingID] ? 'unfollow' : 'follow';
    this.updateFollowStateOnServer(followingID, actionType);
  }

  getButtonText(followingID: string): string {
    return this.followingStates[followingID] ? 'follow' : 'unfollow';
  }





updateFollowStateOnServer(followingID:string,actionType:string){
  if(actionType=='follow'){
    this.followerSvc.followOtherUser(followingID).subscribe(
      (res:any)=>{
        console.log(res)
        console.log(`You are following user ${followingID} now`)
        this.flashMsg.pushMessage({
          type:'success',
          message:res.message
        })

      },
      err=>{
        console.error(`Error following user ${followingID}`, err)
      }
    )

  }
  else if(actionType=='unfollow'){
    this.followerSvc.unfollowOtherUser(followingID).subscribe(
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



 


}
