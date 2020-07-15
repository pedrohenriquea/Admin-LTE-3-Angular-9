import { AuthService } from './../../../../../auth/services/auth.service';
import { UsuarioResponse } from './../../../../../auth/models/usuario-response.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  usuarioLogado: UsuarioResponse;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getUsuario();
  }

}
