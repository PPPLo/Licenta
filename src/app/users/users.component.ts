import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  currentUserName: string;
  userObject: any;
  user:any;
  sub: Subscription;

  constructor(private login: LoginService,
              private route:Router) { }

  ngOnInit(): void {
    this.sub=this.login.getCurrentUser()
    .pipe(
      switchMap(user=>{
        if(!user) return 'e';
          return  this.login.getCurrentUserDb();
      }),
      map(user=>user)
    )
    .subscribe(user=>{
      if(user!='e') {this.user=user;}
      else
      this.user=null;
      
    },erreur=> console.log)
  
  }

  onSignOut(){
    this.login.signOut();
    this.route.navigate(['/welcome']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
