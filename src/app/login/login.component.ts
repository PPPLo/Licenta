import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginService } from './login.service';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  
  constructor(private loginService: LoginService,
              private usersService: UsersService,
              private route: Router) { }

  onLogin() {
    console.log("login");
    this.loginService.signIn(this.email, this.password);
    this.connectionSuccess = this.loginService.getLoginResults();
    console.log(this.connectionSuccess);
    this.route.navigate(['/profile']);
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

  ngOnInit(): void {
  }

}
