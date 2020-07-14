import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginService } from './login.service';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userFirstName: string;
  userLastName: string;
  email: string;
  password: string;
  componentViewLogin : boolean = true;
  connectionSuccess :boolean = true;

  loginErrorMessage: string = null;
  subscribeErrorMessage: string = null;

  loginForm: FormGroup;
  subscribeForm: FormGroup;
  
  constructor(private loginService: LoginService,
              private usersService: UsersService,
              private route: Router,
              private fb: FormBuilder) { }

  onSignUp(){
    console.log(this.email, this.password, "login component");
    this.loginService.signUp(this.email, this.password);
    this.loginService.saveUserToDatabase(this.userFirstName, this.userLastName);

    this.route.navigate(['/profile']);
  }

  toggleView(){
    this.componentViewLogin=!this.componentViewLogin;
  }

  onSubmitSubscribe(form){

    this.subscribeErrorMessage = null;
    this.loginService.signUp(this.subscribeForm.controls.email.value, this.subscribeForm.controls.password.value).then(value=>{
      if (this.subscribeErrorMessage===null){
        this.loginService.saveUserToDatabase(this.subscribeForm.controls.firstname.value, this.subscribeForm.controls.lastname.value);
        this.route.navigate(['/profile']); 
      }
    }).catch(err=>{
      switch (err.code){
        case "auth/email-already-in-use":{
          this.subscribeErrorMessage = "Aveti deja un cont!"
          break;
        }
        default:{
          this.subscribeErrorMessage = "Inregistrarea a esuat!"
          break;
        }          
      }
      console.log(err.code);

    });
    

  }

  onSubmitLogin(form){
    console.log("entered");
    this.loginErrorMessage = null;
    this.loginService.signIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then(value=>{      
      if (this.loginErrorMessage===null){
      this.route.navigate(['/profile']);      
    }}).catch(err=>{
      console.log(err.code);
      switch (err.code){
        case "auth/wrong-password":{
          this.loginErrorMessage = "Parola incorecta!"
          break;
        }
        case "auth/user-not-found":{
          this.loginErrorMessage = "Nu s-a gasit adresa de email!"
          break;
        }
        default:{
          this.loginErrorMessage = "Autentificarea a esuat!"
          break;
        }          
      }   
      console.log(this.loginErrorMessage); 
    });
  }

  ngOnInit(): void {

    this.loginForm=this.fb.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(25)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })

    this.subscribeForm = this.fb.group({
      firstname: [null, [Validators.required, Validators.maxLength(15)]],
      lastname: [null, [Validators.required, Validators.maxLength(15)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(25)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

}
