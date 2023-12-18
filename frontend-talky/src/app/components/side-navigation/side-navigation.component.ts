import { Component, ElementRef, Renderer2 } from '@angular/core';
import { PostCreateComponent } from '../post-create/post-create.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent {
  // [x: string]: any;
  mini:boolean=true;


  constructor(private elementRef:ElementRef,private renderer: Renderer2,private matDialog:MatDialog){}
  

  // toggleSideBar() {
  //   console.log('hovering in sidebar');
  //   // const side_bar_el=document.querySelector("side-navbar")  as HTMLDivElement
  //   const sideBarEl = this.elementRef.nativeElement.querySelector('.side-navbar') as HTMLDivElement
  //   const anchorEl1=this.elementRef.nativeElement.querySelector('.links1') as HTMLAnchorElement
  //   const anchorEl2=this.elementRef.nativeElement.querySelector('.links2') as HTMLAnchorElement
  //   const anchorEl3=this.elementRef.nativeElement.querySelector('.links3') as HTMLAnchorElement
  //   const anchorEl4=this.elementRef.nativeElement.querySelector('.links4') as HTMLAnchorElement
      
  //   if (this.mini) {
  //     console.log("opening sidebar");
  //     this.renderer.setStyle(anchorEl1,'display','block')
  //     this.renderer.setStyle(anchorEl2,'display','block')
  //     this.renderer.setStyle(anchorEl3,'display','block')
  //     this.renderer.setStyle(anchorEl4,'display','block')

    
  //     this.renderer.setStyle(sideBarEl, 'width', '200px');
  //     this.mini = false;
      
  //     // this.mini = false;
  //   } else {
  //     console.log("closing sidebar");
  //     this.renderer.setStyle(anchorEl1,'display','none')
  //     this.renderer.setStyle(anchorEl2,'display','none')
  //     this.renderer.setStyle(anchorEl3,'display','none')
  //     this.renderer.setStyle(anchorEl4,'display','none')
      
  //     this.renderer.setStyle(sideBarEl, 'width', '50px');
    
  //     this.mini = true;
  //   }
  // }


  openDialog(){
    this.matDialog.open(PostCreateComponent,{
      width:'700px',
      
    });
    
}
}
