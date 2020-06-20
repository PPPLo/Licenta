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

  constructor(private login:AngularFireAuth,
              private userService:UsersService,
              private router:Router) 
  {}

   signIn(email:string, password:string)
   {
      return this.login.signInWithEmailAndPassword(email, password);
   }
   signUp(email:string, password:string)
   {
     console.log("signup service reached");
     console.log(email);
     console.log(password);
      return this.login.createUserWithEmailAndPassword(email,password);
   }

   saveUserToDatabase(firstName: string, lastName:string){
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
    return this.login.authState.pipe(map(user=>{if(user) return true
                                                else
                                                {
                                                  this.router.navigate(['/login']);
                                                  return false;
                                                }}))
   }
}
