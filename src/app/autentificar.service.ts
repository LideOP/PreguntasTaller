import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Observable, BehaviorSubject  } from 'rxjs';




@Injectable({
  providedIn: 'root'
 })
 export class AutentificarService {
  private userCodeSubject = new BehaviorSubject<string | null>(null);
 userCode$ = this.userCodeSubject.asObservable();
 
  private userCode: string = '';
  constructor(private db:AngularFireDatabase) { }
    mostrarDatos(): Observable<any> {  
      return this.db.object('/').valueChanges();
    }
    
    login(userCode: string) {
      // Aquí deberías verificar el userCode con Firebase para determinar si es admin o estudiante
      // Por ahora, asumiremos que el userCode determina el tipo de usuario
      const isAdmin = userCode === '800000001';
      this.userCodeSubject.next(userCode);
      // Aquí podrías almacenar también el tipo de usuario (admin o estudiante) si es necesario
   }
  
   logout() {
      this.userCodeSubject.next(null);
   }





    validateUserCode(userCode: string): Observable<boolean> {
      return new Observable<boolean>(observer => {
        this.db.list<any>('/').valueChanges().subscribe(users => {
          const valid = users.some(user => user.UserCode === userCode);
          observer.next(valid);
        });
      });
    }

    getUserByCode(userCode: string): Observable<any> {
      return this.db.list<any>('/', ref => ref.orderByChild('UserCode').equalTo(userCode)).valueChanges();
    }
    setUserCode(userCode: string) {
      this.userCode = userCode;
    }
  
    getUserCode(): string {
      return this.userCode;
    }

    enviarSolicitud(userCode: string) {
      // Aquí asumimos que tienes una colección 'solicitudes' en tu base de datos
      // donde almacenarás las solicitudes pendientes
      return this.db.list('/solicitudes').push({
        userCode: userCode,
        estado: 'pendiente' // Puedes usar 'pendiente', 'aceptada' o 'rechazada'
      });
   }

}