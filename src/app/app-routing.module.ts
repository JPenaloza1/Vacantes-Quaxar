import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVacanteComponent } from './components/create-vacante/create-vacante.component';
import { ListVacanteComponent } from './components/list-vacante/list-vacante.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { RegisterComponent } from './components/register/register.component';
import { PostuladosComponent } from './components/postulados/postulados.component';
import { InfoVacanteComponent } from './components/info-vacante/info-vacante.component';
const routes: Routes = [

  {path: '', component:MainComponent},
  {path: 'filter/:key/:value', component:MainComponent},
  {path: 'login', component:LoginComponent},
  {path: 'list', component:ListVacanteComponent},
  {path: 'create', component:CreateVacanteComponent},
  {path: 'edit/:id', component:CreateVacanteComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'recover-password',component:RecoverPasswordComponent},
  {path:'postulados',component:PostuladosComponent},
  {path:'info/:id',component:InfoVacanteComponent},
  {path: '**',redirectTo:'',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
