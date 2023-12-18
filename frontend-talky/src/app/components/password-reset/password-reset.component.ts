import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashmessagesService } from 'src/app/services/flashmessages.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent  implements OnInit{

  resetForm!:FormGroup


  constructor(private formBuilder:FormBuilder,private userSvc:UsersService,private flashSvc:FlashmessagesService,private route:Router){}

  ngOnInit(): void {
    this.resetForm=this.formBuilder.group({
      resetToken:['',[Validators.required]],
      newPassword:['',[Validators.required]],
      confirmPassword:['',[Validators.required]]
    })
  }

  submit(){
    // console.log(this.resetForm.value.newPassword===this.resetForm.value.confirmPassword)
    // delete this.resetForm.value.confirmPassword
    // console.log(this.resetForm.value)

    if(this.resetForm.valid){
      if(this.resetForm.value.newPassword===this.resetForm.value.confirmPassword){
        delete this.resetForm.value.confirmPassword
        this.userSvc.resetPassword(this.resetForm.value).subscribe(
         (res:any)=>{
            console.log(res);
            this.flashSvc.pushMessage({
              type:'success',
              message: ` ${res.message} , you can now login using your new password`
            })
            this.route.navigate(['login'])
            
            
          },
          (err:any)=>{
            this.flashSvc.pushMessage({
              type:'error',
              message:'password mismatch'
            })
          }
          
        )

      }
    
    }
    else{
      this.flashSvc.pushMessage({
        type:'error',
        message:'the form is either invalid or has empty values'
      })
    }
  }

}
