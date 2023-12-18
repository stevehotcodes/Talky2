import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent  implements OnInit{

  resetForm!:FormGroup


  constructor(private formBuilder:FormBuilder,private userSvc:UsersService){}

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
    console.log(this.resetForm.value)

    if(this.resetForm.valid){
      if(this.resetForm.value.newPassword===this.resetForm.value.confirmPassword){
        delete this.resetForm.value.confirmPassword
        this,this.userSvc.resetPassword(this.resetForm.value).subscribe(
          res=>{
            console.log(res);
            
          }
        )

      }
    }
  }

}
