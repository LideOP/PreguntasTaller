import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
 })
export class SolicitudService {
  constructor(private db: AngularFireDatabase) {}
 
  enviarSolicitud(userCode: string) {
     return this.db.list('/').push({
       userCode: userCode,
       estado: 'pendiente' // Puedes usar 'pendiente', 'aceptada' o 'rechazada'
     });
  }
 }