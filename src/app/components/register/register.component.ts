import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth'

import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmpresaService } from 'src/app/services/empresa.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading:boolean = false;
  registerUser:FormGroup;
  constructor(
    private fb:FormBuilder,
    private afAuth:AngularFireAuth,
    private toast:NgToastService ,
    private router:Router,
    private _empresaService:EmpresaService
    ){
    this.registerUser = this.fb.group({
      business:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      repeatPassword:['',Validators.required]
    })
  }
  ngOnInit():void{

  }
  register(){

    this.loading = true;
    const business = this.registerUser.value.business;
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const repeatPassword = this.registerUser.value.repeatPassword;

    if(password !== repeatPassword){
      this.toast.error({summary:'No coinciden las contraseñas',duration:5000})
      return;
    }

    this.afAuth.createUserWithEmailAndPassword(email,password).then(user =>{
      this._empresaService.add({email:email,nombre:business})
      this.router.navigate(['/login'])
      this.toast.success({summary:'Usuario creado correctamente',duration:3000})
    }).catch((error) =>{
      let message = this.firebaseError(error.code)
      this.toast.error({summary:message,duration:5000})
    }).finally(()=>{
      this.loading=false;
    })
  }

  firebaseError(code:string){
    switch (code) {
      case 'auth/email-already-in-use':
        return "El usuario ya existe"
      case 'auth/weak-password':
        return "La contraseña debe ser minimo de 6 carácteres"
      case 'auth/missing-email':
        return "El correo es obligatorio"
      case 'auth/invalid-email':
        return "El correo no es valido"
      default:
        return 'Error desconocido'
    }
  }
}
