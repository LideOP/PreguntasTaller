import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
 })
export class SolicitudService {
  constructor(private db: AngularFireDatabase) {}

  obtenerSolicitudes(): Observable<any> {
    return this.db.object('/solicitudes').valueChanges();
 }
 
  enviarSolicitud(userCode: string) {
     return this.db.list('/solicitudes').push({
       userCode: userCode,
       estado: 'pendiente' // Puedes usar 'pendiente', 'aceptada' o 'rechazada'
     });
  }

 }