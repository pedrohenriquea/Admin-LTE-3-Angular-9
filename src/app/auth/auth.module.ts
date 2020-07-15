import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, CadastroComponent, AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
