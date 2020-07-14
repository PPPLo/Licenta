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

  errorMessage: string = null;

  loginForm: FormGroup;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  constructor(private loginService: LoginService,
              private usersService: UsersService,
              private route: Router,
              private fb: FormBuilder) { }

  onLogin() {
    console.log("login");
    this.loginService.signIn(this.email, this.password);
    this.connectionSuccess = this.loginService.getLoginResults();
    console.log(this.connectionSuccess);
    
  }

  onSignUp(){
    console.log(this.email, this.password, "login component");
    this.loginService.signUp(this.email, this.password);
    this.loginService.saveUserToDatabase(this.userFirstName, this.userLastName);

    this.route.navigate(['/profile']);
  }

  toggleView(){
    this.componentViewLogin=!this.componentViewLogin;
  }

  onSubmitLogin(form){
    console.log("entered");
    this.errorMessage = null;
    this.loginService.signIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then(value=>{      
      if (this.errorMessage===null){
      this.route.navigate(['/profile']);      
    }}).catch(err=>{
      console.log(err.code);
      switch (err.code){
        case "auth/wrong-password":{
          this.errorMessage = "Parola incorecta!"
          break;
        }
        case "auth/user-not-found":{
          this.errorMessage = "Nu s-a gasit adresa de email!"
          break;
        }
        default:{
          this.errorMessage = "Autentificarea a esuat!"
          break;
        }          
      }   
      console.log(this.errorMessage); 
    });
  }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength]],
      password: [null, [Validators.required, Validators.minLength]]
    })

  }

}
