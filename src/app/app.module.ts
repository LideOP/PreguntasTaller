import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat'; // Importa AngularFireModule

import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


@NgModule({
 declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
 ],
 imports: [
    FormsModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }