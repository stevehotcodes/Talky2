import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { TalkiesComponent } from './components/talkies/talkies.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import {DeActivateGuard } from './guards/deActivate.guard';
import { UserGuard } from './guards/user.guard';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { FollowersComponent } from './components/followers/followers.component';
import { FollowingsComponent } from './components/followings/followings.component';

const routes: Routes = [
  {path:'',component:LandingPageComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path:'reset',component:ResetPasswordComponent},
  {path:'all',component:AllPostsComponent},
  {path:'myposts',component:MyPostsComponent},
  {path:'talkies',component:TalkiesComponent},
  {path:'profile',component:ProfileViewComponent},
  {path:'followers',component:FollowersComponent},
  {path:'followings',component:FollowingsComponent},
  {path:'appreset/:token',component:PasswordResetComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
