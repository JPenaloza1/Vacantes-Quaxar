import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth'

import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  loginUser     :FormGroup;
  loading       :boolean=false;

  constructor(
    private fb:FormBuilder,
    private afAuth:AngularFireAuth,
    private toast:NgToastService ,
    private router:Router
  ){
    this.loginUser = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  ngOnInit():void {}

  login(){
    
    const email = this.loginUser.value.email;
    const password = this.loginUser.value.password;
    
    this.loading=true;
    
    this.afAuth.signInWithEmailAndPassword(email,password).then(user =>{
      this.router.navigate(['list'])
    }).catch((error) =>{
      let message = this.firebaseError(error.code)
      this.toast.error({summary:message,duration:5000})
    }).finally(()=>{
      this.loading=false;
    })
  }
  firebaseError(code:string){
    switch (code) {
      case 'auth/user-not-found':
        return "El usuario no existe"
      case 'auth/wrong-password':
        return "Contraseña incorrecta"
      case 'auth/invalid-email':
        return 'El correo no es valido'
      default:
        return 'Error desconocido'
    }
  }
}
