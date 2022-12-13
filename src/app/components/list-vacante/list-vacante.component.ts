import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { VacanteService } from 'src/app/services/vacante.service';

@Component({
  selector: 'app-list-vacante',
  templateUrl: './list-vacante.component.html',
  styleUrls: ['./list-vacante.component.css']
})

export class ListVacanteComponent implements OnInit{
  
  vacantes : any[]   = [];
  loading  : boolean = false;
  
  constructor( 
    private _vacanteService: VacanteService, 
    private toast:NgToastService 
  ) {}
  
  ngOnInit():void{
    this.getVacantes();
  }

  getVacantes(){
    this.loading = true;

    this._vacanteService.getVacante().subscribe( data => {
      this.vacantes = [];
      
      data.forEach( ( element:any ) => {
        this.vacantes.push({
          id : element.payload.doc.id,
          ... element.payload.doc.data()
        })
      });

      this.loading = false;
    });
  }

  deleteVacante( id:string ){
    this.loading = true;

    this._vacanteService.deleteVacante( id ).then( () => {
      this.toast.success({
        summary  : "Vacante eliminada con exito" , 
        duration : 3000
      });

    }).catch( error =>{
      this.toast.error({
        summary  : "Ha ocurrido un error" ,
        duration : 3000
      });

    }).finally( () => {
      this.loading = false;
    });
  }
}
