import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import { VacanteService } from 'src/app/services/vacante.service';

@Component({
  selector: 'app-create-vacante',
  templateUrl: './create-vacante.component.html',
  styleUrls: ['./create-vacante.component.css']
})

export class CreateVacanteComponent {
  
  createVacante  : FormGroup;
  id             : string | null;
  titulo         : string = "Crear";
  loading        : boolean=false;
  
  constructor(
    private fb:FormBuilder,
    private aRoute:ActivatedRoute,
    private router:Router,
    private _vacanteService :VacanteService,
    private toast:NgToastService 
    ) {
      this.createVacante = this.fb.group({
        area        : [ '' , Validators.required ],
        puesto      : [ '' , Validators.required ],
        salario     : [ '' , Validators.required ],
        horario     : [ '' , Validators.required ],
        empresa     : [ '' , Validators.required ],
        direccion   : [ '' , Validators.required ],
        actividades : [ '' , Validators.required ]
      });
      
      this.id = this.aRoute.snapshot.paramMap.get('id');

      if(this.id !== null){
        this.editVacante();
      }
  }

  submitVacante() {
    this.loading = true;
    if(this.id === null){
      this.addVacante();
    }else{
      this.changeVacante( this.id );
    }
  }

  changeVacante( id:string ) {
    const vacante = {
      area        : this.createVacante.value.area,
      puesto      : this.createVacante.value.puesto,
      salario     : this.createVacante.value.salario,
      actividades : this.createVacante.value.actividades,
      horario     : this.createVacante.value.horario,
      direccion   : this.createVacante.value.direccion,
      empresa     : this.createVacante.value.empresa,
    }

    this._vacanteService.updateVacante( id , vacante ).then( () => {
      this.toast.success({
        summary  : "Se ha actualizado con exito" ,
        duration : 3000
      });
      this.router.navigate( ['/list'] );

    }).catch(error=>{
      this.toast.error({
        summary  : "Ha ocurrido un error" ,
        duration : 5000
      });

    }).finally( () => {
      this.loading = false;
    });
  }
  
  addVacante() {
    if (this.createVacante.status === 'VALID'){
      const vacante = {
        area        : this.createVacante.value.area,
        puesto      : this.createVacante.value.puesto,
        salario     : this.createVacante.value.salario,
        actividades : this.createVacante.value.actividades,
        horario     : this.createVacante.value.horario,
        direccion   : this.createVacante.value.direccion,
        empresa     : this.createVacante.value.empresa,
        fecha       : new Date()
      }

      this._vacanteService.addVacante(vacante).then(()=>{
        this.router.navigate( ['/list'] );
        this.toast.success({
          summary  : "Vacante añadida correctamente" ,
          duration : 3000
        });

      }).catch(error => {
        this.toast.error({
          summary  : "Ha ocurrido un error" ,
          duration : 3000
        });
        console.log( error );

      }).finally( () => {
        this.loading=false;
      })
      
    }else{
      this.toast.error({
        summary  : "Necesita llenar todos los campos" ,
        duration : 3000
      });
      this.loading = false;
    }
  }

  
  editVacante(){
    if( this.id !== null ){
      this.titulo ="Editar";
      this._vacanteService.getVacant( this.id ).subscribe( data => {
        let datos = data.payload.data();
        this.createVacante.setValue({
          area        : datos['area'],
          puesto      : datos['puesto'],
          salario     : datos['salario'],
          empresa     : datos['empresa'],
          actividades : datos['actividades'],
          direccion   : datos['direccion'],
          horario     : datos['horario'],
        });
      });
    }
  }

}
