import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashmessagesService } from 'src/app/services/flashmessages.service';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm!:FormGroup

  constructor (private formBuilder:FormBuilder,private loginSvc:SigninService, private flashMsg:FlashmessagesService){}


  ngOnInit(){
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      password:['',[Validators.required]]
    })

  }

  onSubmit(){

    if(this.loginForm.valid){
      let UserData=this.loginForm.value
      console.log(this.loginForm.value)
      // delete UserData.confirmPassword
      this.loginSvc.logIn(UserData)

     
      
      
    }
  else{
   console.log("invalid form");
   this.flashMsg.pushMessage({
    type:'error',
    message:'cannot log in since the form is invalid or has no input'
  })

  
  }
  }
}
