import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VacanteService } from 'src/app/services/vacante.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  
  vacantes : any[] = [];
  loading  :boolean = false;
  search   : FormGroup;
  key      :string | null;
  value    :string | null;
 
  constructor(
    private fb:FormBuilder,
    private _vacanteService: VacanteService,
    private aRoute:ActivatedRoute,
  )
  {
    this.search = this.fb.group({
      key   : [ '' , Validators.required ],
      value : [ '' , Validators.required ]
    });
    this.key   = this.aRoute.snapshot.paramMap.get('key');
    this.value = this.aRoute.snapshot.paramMap.get('value');
      if( this.key !== null && this.value !== null ){
        this.filterVacante();
      }else{
        this.getVacantes()
      }
    
  }
  
  getVacantes() {
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
    })
  }

  filterVacante() {
    this.loading = true;

    if( this.key === null || this.value === null ){
      return
    }

    this._vacanteService.filterVacante( this.key , this.value ).subscribe( data => {
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
  
  searchVacante(){
    const key   :string = this.search.value.key;
    const value :string = this.search.value.value;
    window.location.href=`/filter/${ key }/${ value }`;
  }

}
