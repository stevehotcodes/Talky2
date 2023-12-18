import { Component } from '@angular/core';
import {Validators,FormGroup, FormBuilder} from '@angular/forms'
import { FlashmessagesService } from 'src/app/services/flashmessages.service';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm!:FormGroup

  constructor(private formBuiilder:FormBuilder,private signUpSvc:SignupService,private flashMsg:FlashmessagesService){}

  ngOnInit(){
    this.signupForm=this.formBuiilder.group({
      fullName:['',[Validators.required]],
      userName:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      password:['',[Validators.required, Validators.minLength(6)]],
      confirmPassword:['',[Validators.required,Validators.minLength(6)]]
    })
    
  }

  submit(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value)
      const newUserData=this.signupForm.value
      delete newUserData.confirmPassword
      console.log(newUserData)
      this.signUpSvc.registerUser(this.signupForm.value)
    }

    else{
      this.flashMsg.pushMessage({
        type:'error',
        message:'please provide the necessary details to create your account'
    })
    }


    }
   

}
