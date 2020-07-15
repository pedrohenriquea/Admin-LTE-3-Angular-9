import { UsuarioResponse } from './../models/usuario-response.model';
import { environment } from './../../../environments/environment';
import { UsuarioRequest } from '../models/usuario-request.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioCadastroRequest } from '../models/usuario-cadadastro-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario: UsuarioRequest): boolean{
    return usuario.login === 'admin' && usuario.senha === 'admin';
  } 

  logout(){
    localStorage.clear();
  }

  cadastrarUsuario(usuarioCadastro: UsuarioCadastroRequest){
    return this.http.post<any>(`${environment.api_url}/auth/cadastro`, usuarioCadastro);
  }

  getUsuario(): UsuarioResponse{
    return localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')) : null;
  }

  setUsuario(usuarioResponse: UsuarioResponse){
    localStorage.setItem('usuario', JSON.stringify(usuarioResponse));
  }

  check(): boolean {
    return true;
  }
}
 