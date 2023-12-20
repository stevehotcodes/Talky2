import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostCreateComponent } from './components/post-create/post-create.component';
// import { HeaderComponent } from './components/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'
import{ ReactiveFormsModule} from '@angular/forms';
import { MyPostsComponent } from './components/my-posts/my-posts.component'
import { RouterModule } from '@angular/router';
import { TalkiesComponent } from './components/talkies/talkies.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { ProfileViewComponent } from './components/profile-view/profile-view.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { FlashmessagesComponent } from './components/flashmessages/flashmessages.component';
import { CommentComponent } from './components/comment/comment.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { FollowersComponent } from './components/followers/followers.component';
import { FollowingsComponent } from './components/followings/followings.component';
import { SearchPipe } from './pipes/search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ResetPasswordComponent,
    AllPostsComponent,
    SideNavigationComponent,
    PostCreateComponent,
    MyPostsComponent,
    TalkiesComponent,
    EditProfileComponent,
    ViewProfileComponent,
    LandingPageComponent,

    ProfileViewComponent,
     FlashmessagesComponent,
     CommentComponent,
     PasswordResetComponent,
     FollowersComponent,
     FollowingsComponent,
     SearchPipe,
    
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule ,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CloudinaryModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
