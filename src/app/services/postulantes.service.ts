import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostulantesService {

  constructor(private firestore:AngularFirestore) { 
    
  }
  addPostulante(postulacion: any): Promise<any>{
    return this.firestore.collection('postulantes').add(postulacion);
  }
  getPostulante(): Observable<any> {
    return this.firestore.collection('postulantes').snapshotChanges()
  }
  deletePostulante(id:string):Promise<any>{
    return this.firestore.collection('postulantes').doc(id).delete();
  }
}
