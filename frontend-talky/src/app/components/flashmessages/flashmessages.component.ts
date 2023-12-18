import { Component, Input } from '@angular/core';
import { IflashMessage } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-flashmessages',
  templateUrl: './flashmessages.component.html',
  styleUrls: ['./flashmessages.component.css']
})
export class FlashmessagesComponent {


  @Input () message!:IflashMessage

}
