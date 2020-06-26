import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, CanActivate } from '@angular/router';
 

@Injectable({
  providedIn: 'root'
})
export class UsersService implements CanActivate {

  constructor(private db:AngularFireDatabase,
               private login:AngularFireAuth,
               private router:Router ) { }
  
  saveUser(user: firebase.User, firstName:String, lastName:String)
  {
    console.log("user service reached");
    if (!user) return;
    console.log("user service change database reached");
    this.db.object('/users/' + user.uid).update({name:user.displayName, email:user.email, firstname:firstName, lastname:lastName});
  }

  getUserByuid(uid:string)
  {
  return  this.db.object('/users/'+uid)
               .snapshotChanges()
               .pipe(
                  map(user=>{
                    let objectUser:any=user.payload.val();
                    objectUser.id=user.payload.key;
                    return objectUser
                  })
               )
  }

  getUserById(id:string){
    return this.db.list('/users/'+id +'/deliveryInfo').snapshotChanges().pipe(map(
      products =>products.map(c => (
                          {                            
                            key: c.payload.key, ...c.payload.val() as {} 
                          }
                          ))))  ;
  }

  addDeliveryInformationToUser(loggedUser,deliveryInfo){
    if (!loggedUser) return;
      this.db.object('/users/' + loggedUser.id+'/deliveryInfo').update(deliveryInfo);
  }

  canActivate():Observable<boolean>
  {
   return this.login.authState.pipe(map(user=>{if(!user) return true
                                               else
                                               {
                                                 this.router.navigate(['/profile']);
                                                 console.log("can't activate login");
                                                 return false;
                                               }}))
  }
}
