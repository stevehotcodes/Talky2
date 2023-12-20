import { Pipe, PipeTransform } from '@angular/core';
import { IUserDetails } from '../interfaces/interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(talkies:IUserDetails[],searchText:string) {
    if(!talkies || searchText== ''){
      return talkies
    }
    const filteredTalkyEntries:IUserDetails[]=[]

      for( let user of talkies){
        if(user.userName.toLowerCase().includes(searchText.toLowerCase())){
          filteredTalkyEntries.push(user)
        }
      }

      return filteredTalkyEntries
  }

}
