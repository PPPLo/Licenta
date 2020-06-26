import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { UsersService } from '../users/users.service';
import { switchMap, map } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {

  loginStatus:boolean = true;

  constructor(private login:AngularFireAuth,
              private userService:UsersService,
              private router:Router) 
  {}

   signIn(email:string, password:string)
   {
      return this.login.signInWithEmailAndPassword(email, password).then(value => {
        this.loginStatus = true;
      })
      .catch(err => {
        this.loginStatus = false;
        console.log('Something went wrong on login:',err.message);
      });
   }

   signUp(email:string, password:string)
   {
     console.log("signup service reached");
     console.log(email);
     console.log(password);
     return this.login.createUserWithEmailAndPassword(email,password);
   }

   saveUserToDatabase(firstName: string, lastName:string){
    console.log("save user database reached reached");
    this.login.authState.subscribe(user=>{this.userService.saveUser(user, firstName, lastName)});
   }
   signOut(){
     return this.login.signOut();
   }

   getCurrentUserDb()
   {
     return this.login.authState.pipe(switchMap(user=>{
                         try{
                          return   this.userService.getUserByuid(user.uid)
                         }
                         catch(error){
                           console.log(error);
                         }
                       }),
                       map(user=>{return user;
                       })
                      )
   }

   getCurrentUser()
   {
     return  this.login.authState;
   }

   canActivate():Observable<boolean>
   {
     console.log("can activate");
    return this.login.authState.pipe(map(user=>{if(user) return true
                                                else
                                                {
                                                  this.router.navigate(['/login']);
                                                  console.log("can't activate login");
                                                  return false;
                                                }}))
   }
   getLoginResults (): boolean{
     return this.loginStatus;
   }
}
