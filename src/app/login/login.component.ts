import { Component } from '@angular/core';
import { AutentificarService } from '../autentificar.service';
import { Router } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userCode: string='';
  error: string = '';
  listarEstu: any[] = [];
  estudiante: string = '';
  isAdmin: boolean = false;
  constructor(private authService: AutentificarService, private router:Router, ) {}
    
  ngOnInit(): void {
    this.mostrarEstudiantes();
    this.isAdmin = this.userCode === '800000001';
     
}
  mostrarEstudiantes(){
    this.authService.mostrarDatos().subscribe(listarEstu => {
      this.listarEstu = Object.values(listarEstu);
    });
  }

  onSubmit() {
    this.login();
  }
  login() {
    if (this.userCode === '800000001') {
      console.log('Inicio de sesión exitoso como administrador');
      //  this.router.navigate(['/administrador']);
      this.router.navigate(['/user-list']);

       return;
    }
   
    this.authService.validateUserCode(this.userCode).subscribe(valid => {
       if (valid) {
         this.authService.setUserCode(this.userCode);
         this.router.navigate(['/user-list']);
         console.log('Inicio de sesión exitoso'); 
       } else {
         this.error = 'Código de usuario incorrecto';
       }
    });
   }

}