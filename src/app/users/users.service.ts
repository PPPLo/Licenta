import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db:AngularFireDatabase ) { }
  
  saveUser(user: firebase.User, firstName:String, lastName:String)
  {
    this.db.object('/users/' + user.uid).update({name:user.displayName, email:user.email, firstname:firstName, lastname:lastName})
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
}
