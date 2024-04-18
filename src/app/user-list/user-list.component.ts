import { Component, OnInit  } from '@angular/core';
import { AutentificarService } from '../autentificar.service';
import { SolicitudService } from '../solicitud.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
  users : any[]=[];
  userName: string = '';
  userCode: string = '';
  isAdmin: boolean = true;

  // userData: any; 
 constructor(private authService:AutentificarService , private solicitudService: SolicitudService) {
 }
 ngOnInit(): void {
  this.userCode = this.authService.getUserCode();
  console.log('El código de usuario es: ', this.userCode);
  this.listarEstudiantes(); 
  this.mostrarUserName();
  // this.isAdmin = this.authService.getUserCode() === '800000001';

  this.authService.userCode$.subscribe(userCode => {
    if (userCode === '800000001') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  });

 }
 mostrarSolicitudes(){
  console.log('Mostrar solicitudes');
 }
  

 
 listarEstudiantes(){

  this.authService.mostrarDatos().subscribe(users => {
    this.users = Object.values(users);
  });
 }
 mostrarUserName(){
    // const userCode = this.authService.getUserCode(); // Obtén el userCode del servicio
    this.authService.getUserByCode(this.userCode).subscribe(user => {
      console.log(user);
      if (user.length > 0) {
        this.userName = user[0].UserName; // Asigna el nombre de usuario del primer usuario encontrado
        console.log(this.userName);
      } else {
        console.log('No se encontró ningún usuario con el userCode proporcionado');
      }
    });
  }

   preguntar() {
    this.solicitudService.enviarSolicitud(this.userCode).then(() => {
       console.log('Solicitud enviada al administrador');
       // Aquí puedes mostrar un mensaje al usuario indicando que la solicitud ha sido enviada
    }).catch(error => {
       console.error('Error al enviar la solicitud:', error);
    });
   }
  }

