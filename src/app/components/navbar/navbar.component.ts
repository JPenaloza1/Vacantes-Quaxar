import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth'

import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  dataUser:any;
  auth=true;
  constructor(
    private afAuth:AngularFireAuth,
    private router:Router
  ){
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn.next(true);
      } else {
        // not logged in
        this.loggedIn.next(false);
      } 
    });
  }
  
  ngOnInit():void {
    
  }
  logOut(){
    this.afAuth.signOut().then(()=>{
      this.router.navigate(['/'])
    })
  }
  public isLoggedIn(): boolean {
    return !!this.afAuth.currentUser;
  }
}
