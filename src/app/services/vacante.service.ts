import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacanteService {

  constructor(private firestore:AngularFirestore) { }
  addVacante(vacante: any): Promise<any>{
    return this.firestore.collection('vacante').add(vacante);
  }
  getVacante(): Observable<any> {
    return this.firestore.collection('vacante').snapshotChanges()
  }
  deleteVacante(id:string):Promise<any>{
    return this.firestore.collection('vacante').doc(id).delete();
  }
  getVacant(id:string):Observable<any>{
    return this.firestore.collection('vacante').doc(id).snapshotChanges();
  }
  updateVacante(id:string,data:any):Promise<any>{
    return this.firestore.collection('vacante').doc(id).update(data);
  }
  filterVacante(field:string,keyword:string):Observable<any>{
    return this.firestore.collection("vacante",ref =>ref.where(field,">=",keyword )).snapshotChanges()
  }
}
