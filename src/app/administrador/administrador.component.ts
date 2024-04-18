import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

// Define la interfaz Solicitud aquí
interface Solicitud {
 userCode: string;
 estado: string;
 // Agrega aquí cualquier otra propiedad que tus objetos de solicitud puedan tener
}

@Component({
 selector: 'app-administrador',
 templateUrl: './administrador.component.html',
 styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {
 solicitudesPendientes: Solicitud[] = [];

 constructor(private db: AngularFireDatabase) {}

 ngOnInit(): void {

 }

}