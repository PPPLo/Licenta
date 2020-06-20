import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../login/login.service';
import { UsersService } from '../users/users.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate {

  constructor(private db:AngularFireDatabase,
              private login:LoginService,
              private userService:UsersService,
              private route:Router
               ) { }
  canActivate():Observable<boolean>{
    return this.login.getCurrentUserDb().pipe(map(user=>{
      if (!user) return false;
      if (user.isAdmin) {
        return true;       
      }
      this.route.navigate(['/login']);
      return false;
    }))
  }
}
