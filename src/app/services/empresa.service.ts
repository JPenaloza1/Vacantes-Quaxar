import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private firestore:AngularFirestore) {
    
   }
   add(empresa: {email:string,nombre:string}): Promise<any>{
    return this.firestore.collection('empresas').add(empresa);
  }

  get(email:string):any{
    this.firestore.collection("vacante", ref => ref.where("email","==",email )).snapshotChanges().subscribe(data =>{
      data.forEach((element:any) => {
          return element.payload.doc.data()['email']
      });
    })
  }
  
}