import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})

export class RecoverPasswordComponent {
  
  recoverUser  : FormGroup;
  loading      : boolean = false;
  
  constructor(
    private fb     : FormBuilder,
    private afAuth : AngularFireAuth,
    private router : Router,
    private toast  : NgToastService 
  ){
    this.recoverUser = this.fb.group({
      email : [ '' , Validators.required ]
    });
  }

  recover() {
    this.loading = true;
    const email = this.recoverUser.value.email;

    this.afAuth.sendPasswordResetEmail( email ).then( user => {
      this.router.navigate( ['login'] );
      this.toast.success({ 
        summary  : "Verifique su correo para recuperar la contraseña" , 
        duration : 3000 
      });

    } ).catch( (error) => {
        let message = this.firebaseError(error.code);
        this.toast.error({
          summary  : message ,
          duration : 3000
        });

    } ).finally(() => {
      this.loading = false;
    });
  }

  firebaseError( code:string ){
    switch ( code ) {
      case 'auth/user-not-found':
        return "El usuario no existe"
      case 'auth/invalid-email':
          return "El correo no es valido"
      case 'auth/missing-email':
          return "El correo es obligatorio"
      default:
        return 'Error desconocido'
    }
  }
}
