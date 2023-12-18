import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashmessagesService } from 'src/app/services/flashmessages.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  // email:string=""
  resetForm!:FormGroup

constructor(private userSvc:UsersService, private formBuilder:FormBuilder,private flashSvc:FlashmessagesService,private route:Router){}

ngOnInit(): void {
  this.resetForm=this.formBuilder.group({
    email:['',[Validators.required,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]]
  })
  
}

  reset(){
  console.log(this.resetForm.value);
  this.userSvc.forgotPassword(this.resetForm.value.email).subscribe(
    (res:any)=>{
      console.log(this.resetForm.value.email)
      console.log(res);
      this.flashSvc.pushMessage({
        type:'success',
        message:res.message,
      })

      this.resetForm.value.email =''
      this.route.navigate(['appreset'])
      
     
      
    },
    (err:any)=>{
      this.flashSvc.pushMessage({
        type:'error',
        message:"email input cannot be empty"
      })
    }
  )

  }

}
