import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Firebase
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from "@angular/fire/compat/storage";

import { CreateVacanteComponent } from './components/create-vacante/create-vacante.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ListVacanteComponent } from './components/list-vacante/list-vacante.component';
import { environment } from 'src/environments/environment';
import { NgToastModule } from 'ng-angular-popup';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { InfoVacanteComponent } from './components/info-vacante/info-vacante.component';
import { PostuladosComponent } from './components/postulados/postulados.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateVacanteComponent,
    LoginComponent,
    MainComponent,
    NavbarComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    ListVacanteComponent,
    SpinnerComponent,
    InfoVacanteComponent,
    PostuladosComponent
  ],
  imports: [
    NgToastModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule, // required animations module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
