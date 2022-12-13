import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PostulantesService } from 'src/app/services/postulantes.service';
import { VacanteService } from 'src/app/services/vacante.service';

@Component({
  selector: 'app-info-vacante',
  templateUrl: './info-vacante.component.html',
  styleUrls: ['./info-vacante.component.css']
})

export class InfoVacanteComponent {
  id: string | null;
  area:string="";
  puesto:string="";
  salario:string="";
  actividades:string="";
  direccion:string="";
  empresa:string="";
  horario:string="";
  file:any={};
  createPostulante:FormGroup;
  loading:boolean = false;

  constructor(
    private fb:FormBuilder,
    private aRoute:ActivatedRoute,
    private _vacanteService:VacanteService,
    private toast:NgToastService ,
    private _postulanteService:PostulantesService,
    private storage: AngularFireStorage 
    ) { 
    this.id = this.aRoute.snapshot.paramMap.get('id');
    if(this.id !== null){
      this._vacanteService.getVacant(this.id).subscribe(data =>{
        let datos = data.payload.data()
        this.area = datos['area'];
        this.puesto = datos['puesto'];
        this.salario = datos['salario'];
        this.actividades = datos['actividades'];
        this.direccion = datos['direccion'];
        this.empresa = datos['empresa'];
        this.horario = datos['horario'];
      })
    }
    this.createPostulante = this.fb.group({
      email: ['',[Validators.email,Validators.required]]
    })
  }
  addPostulante(){
    if (this.createPostulante.status === 'VALID'){
      this.loading = true;
      const filepath =  `cvs/${this.id}/${this.file.name}`;
      /*
      const fileRef = this.storage.ref(filepath)
      const urlFile = fileRef.getDownloadURL();
      */
      const postulacion = {
        email: this.createPostulante.value.email,
        vacante_id: this.id,
        puesto: this.puesto,
        cv: filepath
      }
      this.storage.upload(filepath,this.file).then(()=>{
        this._postulanteService.addPostulante(postulacion)
        .then(()=>{ this.toast.success({summary:"Te has postulado correctamente",duration:5000}) })
        .catch(error=>{this.promiseError(error)})
      })
      .catch(error=>{this.promiseError(error)})
      .finally(()=>{this.loading=false;})      
    
    }else{
      this.toast.error({summary:"No es un correo válido"})
    }
  }
  uploadFile($event:any){
    this.file = $event.target.files[0];
  }
  promiseError(error:any){
    this.toast.error({summary:"Ha ocurrido un error",duration:5000})
    console.log(error);
  }
  }
