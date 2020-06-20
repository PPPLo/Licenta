import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private login: LoginService,
              private route:Router) { }

  ngOnInit(): void {
  }

  onSignOut(){
    this.login.signOut();
    this.route.navigate(['/welcome']);
  }

}
