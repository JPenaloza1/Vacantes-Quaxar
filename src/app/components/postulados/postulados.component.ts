import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { PostulantesService } from 'src/app/services/postulantes.service';

@Component({
  selector: 'app-postulados',
  templateUrl: './postulados.component.html',
  styleUrls: ['./postulados.component.css']
})

export class PostuladosComponent implements OnInit {
  
  postulados : any[]   = [];
  loading    : boolean = false;

  constructor(
    private _postuladosService : PostulantesService,
    private toast : NgToastService 
  ){}

  ngOnInit():void { this.getVacantes() }

  getVacantes(){
    this.loading=true;

    this._postuladosService.getPostulante().subscribe( data => {
      this.postulados = [];
      
      data.forEach( ( element:any ) => {
        this.postulados.push({
          id : element.payload.doc.id,
          ... element.payload.doc.data()
        })
      });

      this.loading=false;

    })
  }

  deleteVacante( id:string ){
    this.loading=true;
    
    this._postuladosService.deletePostulante( id ).then( () => {
      this.toast.success({
        summary  : "Postulación eliminada con exito" ,
        duration : 5000
      });

    }).catch( error =>{
      this.toast.error({
        summary  : "Ha ocurrido un error" ,
        duration : 5000
      });

    }).finally(()=>{
      this.loading=false;
    });
  }

}
