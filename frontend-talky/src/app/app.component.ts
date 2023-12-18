import { Component } from '@angular/core';
import { PostCreateComponent } from './components/post-create/post-create.component';
import {MatDialog} from '@angular/material/dialog'
import { FlashmessagesService } from './services/flashmessages.service';
import { IflashMessage } from './interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-talky';
  messages:IflashMessage[]


  constructor(private matDialog:MatDialog,public flashMsgSvc:FlashmessagesService){
    this.messages=flashMsgSvc.getMessages()
  }

  openDialog(){
    this.matDialog.open(PostCreateComponent,{
      width:'350px',
      
    });
    
  }


}
